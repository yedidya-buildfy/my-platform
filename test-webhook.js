const crypto = require("crypto");
const fetch = require("node-fetch");

const webhookUrl = "http://localhost:3002/api/webhooks/customers/data_request";
const secret = "55b9eac15b147b114cc723529082500a"; // שים פה את הסוד מהשופיפיי פרטנר
const payload = {
  customer: {
    email: "test@example.com"
  }
};

const rawBody = JSON.stringify(payload);

// צור חתימה בדיוק כמו ש-Shopify עושה
const hmac = crypto
  .createHmac("sha256", secret)
  .update(rawBody, "utf8")
  .digest("base64");

(async () => {
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Hmac-Sha256": hmac
    },
    body: rawBody
  });

  const text = await res.text();
  console.log("Status:", res.status);
  console.log("Response:", text);
})();
