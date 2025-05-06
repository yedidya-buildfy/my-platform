// src/app/api/webhooks/customers/redact/route.ts

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
  const customerEmail = payload.customer?.email;

  if (!shopDomain || !customerEmail) {
    return NextResponse.json({ error: "Missing shop_domain or customer email" }, { status: 400 });
  }

  const { error } = await supabaseServer
    .from("profiles")
    .delete()
    .ilike("email", customerEmail)
    .ilike("shopify_store_domain", shopDomain);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
