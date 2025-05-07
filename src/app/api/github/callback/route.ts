import { NextRequest, NextResponse } from "next/server"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function GET(req: NextRequest) {
  const supabase = createServerComponentClient({ cookies })
  const code = req.nextUrl.searchParams.get("code")

  if (!code) return NextResponse.redirect("/new-project")

  // שלב 1: המרת code ל-access_token
  const res = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID!,
      client_secret: process.env.GITHUB_CLIENT_SECRET!,
      code,
    }),
  })

  const data = await res.json()

  if (!data.access_token) return NextResponse.redirect("/new-project")

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) return NextResponse.redirect("/new-project")

  // שלב 2: שמירה בטבלת profiles
  await supabase.from("profiles").update({
    github_token: data.access_token,
  }).eq("id", user.id)

  return NextResponse.redirect("/new-project") // אפשר לעבור לשלב הבא בהמשך
}
