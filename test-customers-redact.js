// test-customers-redact.js

const axios = require("axios");
const crypto = require("crypto");

const body = {
  shop_domain: "test-shop.myshopify.com", // <== שים כאן את הדומיין ששמת ב-Supabase
  customer: {
    email: "nn@gmail.com", // <== שים כאן את האימייל ששמת ב-Supabase
  },
};

const secret ='55b9eac15b147b114cc723529082500a' || "your_test_secret"; // ודא שהסוד נכון
const rawBody = JSON.stringify(body);
const hmac = crypto
  .createHmac("sha256", secret)
  .update(rawBody, "utf8")
  .digest("base64");

axios
  .post("http://localhost:3003/api/webhooks/customers/redact", rawBody, {
    headers: {
      "X-Shopify-Hmac-Sha256": hmac,
      "Content-Type": "application/json",
    },
  })
  .then((res) => {
    console.log("Response:", res.status, res.data);
  })
  .catch((err) => {
    console.error("Error:", err.response?.status, err.response?.data);
  });
