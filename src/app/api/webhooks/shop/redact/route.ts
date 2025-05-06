// src/app/api/webhooks/shop/redact/route.ts

import { NextRequest, NextResponse } from "next/server";
import { verifyShopifyWebhook } from "@/app/lib/verifyShopifyWebhook";
import { supabaseServer } from "@/app/lib/supabaseServerClient";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  if (!verifyShopifyWebhook(req, rawBody)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const shopDomain = payload.shop_domain;

  if (!shopDomain) {
    return NextResponse.json({ error: "Missing shop_domain" }, { status: 400 });
  }

  // מחיקת כל נתוני המשתמשים והפרויקטים של החנות
  const deleteProfiles = supabaseServer
    .from("profiles")
    .delete()
    .ilike("shopify_store_domain", shopDomain);

  const deleteProjects = supabaseServer
    .from("projects")
    .delete()
    .ilike("shopify_store_domain", shopDomain);

  const [profilesResult, projectsResult] = await Promise.all([deleteProfiles, deleteProjects]);

  if (profilesResult.error || projectsResult.error) {
    return NextResponse.json({
      error: profilesResult.error?.message || projectsResult.error?.message,
    }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
