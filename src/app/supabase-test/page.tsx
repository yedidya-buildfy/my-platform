'use client';

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function SupabaseTestPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("test_data").select("*");
      if (error) {
        console.error("שגיאה:", error.message);
      } else {
        setData(data);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>בדיקת חיבור ל-Supabase</h1>
      {loading ? <p>טוען...</p> : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </main>
  );
}
