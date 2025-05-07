console.log("Loaded secret:", process.env.SHOPIFY_API_SECRET);
import crypto from "crypto";
import { NextRequest } from "next/server";

const SHOPIFY_HMAC_HEADER = "x-shopify-hmac-sha256";

export function verifyShopifyWebhook(req: NextRequest, rawBody: string): boolean {
  const hmacHeader = req.headers.get(SHOPIFY_HMAC_HEADER);
  const secret = process.env.SHOPIFY_API_SECRET!; // או כתוב את הסוד ידנית פה לבדיקה

  if (!hmacHeader || !secret) return false;

  const hash = crypto
    .createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest("base64");

  return crypto.timingSafeEqual(Buffer.from(hmacHeader, "utf8"), Buffer.from(hash, "utf8"));
}
