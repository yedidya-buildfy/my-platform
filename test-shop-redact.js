// test-shop-redact.js
import fetch from "node-fetch";
import crypto from "crypto";

const url = "http://localhost:3003/api/webhooks/shop/redact"; // שנה לפי הצורך

const payload = {
  shop_domain: "example-shop.myshopify.com"
};

const secret = "55b9eac15b147b114cc723529082500a"; // שים את ה־Shopify Webhook Secret שלך

const body = JSON.stringify(payload);
const hmac = crypto
  .createHmac("sha256", secret)
  .update(body, "utf8")
  .digest("base64");

const headers = {
  "Content-Type": "application/json",
  "X-Shopify-Hmac-Sha256": hmac,
};

fetch(url, {
  method: "POST",
  headers,
  body,
})
  .then((res) => res.json().then(data => ({ status: res.status, data })))
  .then(console.log)
  .catch(console.error);
