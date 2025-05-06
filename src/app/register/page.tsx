'use client';

import { useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // יצירת המשתמש ב-Supabase Auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError || !data.user) {
      setError(signUpError?.message || "Registration failed");
      return;
    }

    const userId = data.user.id;

    // יצירת שורת פרופיל בטבלת profiles
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: userId,
        full_name: fullName,
      },
    ]);

    if (profileError) {
      setError("Failed to create user profile: " + profileError.message);
      return;
    }

    // מעבר לדשבורד (או לכל דף אחר)
    router.push("/dashboard");
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>הרשמה לפלטפורמה</h1>
      <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
        <input type="text" placeholder="שם מלא" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        <input type="email" placeholder="אימייל" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="סיסמה" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">הרשם</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </main>
  );
}
