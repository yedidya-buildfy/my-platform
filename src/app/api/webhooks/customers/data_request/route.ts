// src/app/api/webhooks/customers/data_request/route.ts

import { NextRequest, NextResponse } from "next/server";
import { verifyShopifyWebhook } from "@/app/lib/verifyShopifyWebhook";
import { supabaseServer } from "@/app/lib/supabaseServerClient";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  if (!verifyShopifyWebhook(req, rawBody)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const customerEmail = payload.customer?.email;

  if (!customerEmail) {
    return NextResponse.json({ error: "Missing customer email" }, { status: 400 });
  }

  // משתמשים כבר ב־supabaseServer שהבאנו מה־import למעלה
  const { data, error } = await supabaseServer
    .from("profiles")
    .select("*")
    .ilike("email", customerEmail);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
}
