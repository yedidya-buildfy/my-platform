// app/dashboard/project/[projectId]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/app/lib/supabaseClient";

export default function ProjectEditorPage() {
  const { projectId } = useParams();
  const [code, setCode] = useState<string>("");
  const [view, setView] = useState<"code" | "preview">("code");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestCode = async () => {
      const { data, error } = await supabase
        .from("project_versions")
        .select("code")
        .eq("project_id", projectId)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error("שגיאה בטעינת הקוד:", error.message);
      } else {
        setCode(data?.code || "");
      }
      setLoading(false);
    };

    if (projectId) fetchLatestCode();
  }, [projectId]);

  return (
    <div className="flex h-full">
      {/* צ׳אט עם AI */}
      <aside className="w-1/4 border-r bg-white p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">🧠 שיחה עם AI</h2>
        <div className="text-sm text-gray-600">כאן תוכל לשוחח עם הסוכן האינטליגנטי 👇</div>
        {/* בעתיד נטמיע את ההיסטוריה והשליחה לכאן */}
      </aside>

      {/* אזור עבודה - Editor / Preview */}
      <main className="flex-1 bg-gray-50 p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">עריכת פרויקט</h1>
          <button
            className="text-sm px-3 py-1 border rounded hover:bg-gray-200"
            onClick={() => setView(view === "code" ? "preview" : "code")}
          >
            החלף ל-{view === "code" ? "תצוגה" : "קוד"}
          </button>
        </div>

        {loading ? (
          <p>טוען קוד...</p>
        ) : view === "code" ? (
          <textarea
            className="w-full h-[75vh] p-2 font-mono border rounded"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        ) : (
          <iframe
            src="https://your-demo-shop.myshopify.com"
            className="w-full h-[75vh] border"
          />
        )}
      </main>
    </div>
  );
}
