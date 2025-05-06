// 🗂️ קובץ: src/app/components/ShopifyPartnerForm.tsx

import { useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ShopifyPartnerForm() {
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("You must be logged in to save your credentials.");
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from("shopify_partners")
      .upsert({
        user_id: user.id,
        client_id: clientId,
        client_secret: clientSecret,
      });

    if (error) {
      setMessage("Error saving credentials: " + error.message);
    } else {
      setMessage("Credentials saved successfully.");
    }

    setLoading(false);
  };

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardContent className="space-y-4">
        <h2 className="text-xl font-bold">Connect your Shopify Partner account</h2>
        <Input
          placeholder="Client ID"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
        />
        <Input
          placeholder="Client Secret"
          value={clientSecret}
          onChange={(e) => setClientSecret(e.target.value)}
          type="password"
        />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save Credentials"}
        </Button>
        {message && <p className="text-sm text-gray-600">{message}</p>}
      </CardContent>
    </Card>
  );
}
