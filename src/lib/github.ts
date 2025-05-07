import { supabase } from "lib/supabaseClient"

/**
 * מחזירה את שם המשתמש (login) של חשבון GitHub שמחובר למשתמש הנוכחי.
 * מחזירה null אם אין טוקן, או אם יש שגיאה.
 */
export async function getGitHubUsername(): Promise<string | null> {
  // שלב 1: קבלת המשתמש המחובר
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) return null

  // שלב 2: שליפת ה-token מטבלת profiles לפי user.id
  const { data, error } = await supabase
    .from("profiles")
    .select("github_token")
    .eq("id", user.id)
    .single()

  const token = data?.github_token
  if (!token || error) return null

  // שלב 3: שליחת בקשת GET ל־GitHub API לקבלת פרטי המשתמש
  const res = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
  })

  if (!res.ok) return null

  const json = await res.json()
  return json?.login ?? null
}
