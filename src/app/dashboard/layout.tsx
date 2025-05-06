// app/dashboard/layout.tsx
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar (chat with AI) */}
      <aside className="w-1/4 border-r bg-white p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">🧠 AI Assistant</h2>
        {/* כאן נטען את ההיסטוריה של הפרומפטים בעתיד */}
        <div className="text-sm text-gray-600">התחל שיחה עם הסוכן...</div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col">
        {/* Toggle Area: Code / Preview */}
        <div className="flex-1 bg-gray-50 p-4">
          {children} {/* הקוד או הפריוויו יופיעו כאן */}
        </div>
      </main>

      {/* Right Hover Menu - נסגר כברירת מחדל, ייפתח עם עכבר בעתיד */}
      <div className="absolute top-0 right-0 h-full w-0 hover:w-64 transition-all bg-white border-l shadow-md overflow-hidden z-50">
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">⚙️ תפריט</h3>
          <ul className="space-y-2 text-sm">
            <li>🔁 החלף פרויקט</li>
            <li>💳 רכישת נקודות</li>
            <li>⚠️ דוח באגים</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
