'use client';

import { useState } from "react";
import { supabase } from "@/app/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard"); // ברירת מחדל
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("אנא הזן אימייל כדי לאפס סיסמה.");
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://buildfy-apps.com/update-password"
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("נשלח מייל לאיפוס סיסמה.");
    }
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>התחברות</h1>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
        <input type="email" placeholder="אימייל" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="סיסמה" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">התחבר</button>
        <button type="button" onClick={handleForgotPassword}>שכחתי סיסמה</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
      </form>
    </main>
  );
}
