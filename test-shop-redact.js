// test-shop-redact.js

const axios = require("axios");
const crypto = require("crypto");

const body = {
  shop_domain: "test-shop.myshopify.com", // ← ודא שזה אותו דומיין כמו בטבלת profiles וב־projects
};

const secret = process.env.SHOPIFY_WEBHOOK_SECRET || "1111111111111111111111111111"; // ← ודא שזה הסוד כמו בהגדרות שלך
const rawBody = JSON.stringify(body);

const hmac = crypto
  .createHmac("sha256", secret)
  .update(rawBody, "utf8")
  .digest("base64");

axios
  .post("http://localhost:3003/api/webhooks/shop/redact", rawBody, {
    headers: {
      "X-Shopify-Hmac-Sha256": hmac,
      "Content-Type": "application/json",
    },
  })
  .then((res) => {
    console.log("✅ Response:", res.status, res.data);
  })
  .catch((err) => {
    console.error("❌ Error:", err.response?.status, err.response?.data);
  });
