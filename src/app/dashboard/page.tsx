// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "lib/supabaseClient"

interface Project {
  id: string;
  name: string;
  description: string;
}

export default function DashboardHome() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const {
        data,
        error
      } = await supabase.from("projects").select("id, name, description");

      if (error) {
        console.error("שגיאה בטעינת הפרויקטים:", error.message);
      } else {
        setProjects(data || []);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">הפרויקטים שלך</h1>
        <a href="/new-project/project-name" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          + צור אפליקציה חדשה
        </a>
      </div>
  
      {loading ? (
        <p>טוען פרויקטים...</p>
      ) : projects.length === 0 ? (
        <p>אין לך עדיין פרויקטים 🧐</p>
      ) : (
        <ul className="space-y-2">
          {projects.map((project) => (
            <li
              key={project.id}
              className="border p-3 rounded shadow hover:bg-gray-100 cursor-pointer"
              onClick={() => console.log("בחרת פרויקט:", project.id)}
            >
              <h3 className="font-bold">{project.name}</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );  
}
