import { useState } from "react"
import { supabase } from "@/app/lib/supabaseClient"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ShopifyPartnerForm() {
  const [clientId, setClientId] = useState("")
  const [clientSecret, setClientSecret] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setMessage("You must be logged in to save your credentials.")
      setLoading(false)
      return
    }

    const { error } = await supabase.from("shopify_partners").upsert({
      user_id: user.id,
      client_id: clientId,
      client_secret: clientSecret,
    })

    if (error) {
      setMessage("Failed to save credentials. Please try again.")
    } else {
      setMessage("Credentials saved successfully!")
    }
    setLoading(false)
  }

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Client ID"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          />
          <Input
            placeholder="Client Secret"
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
          {message && <p className="text-sm text-center text-red-500">{message}</p>}
        </form>
      </CardContent>
    </Card>
  )
}
