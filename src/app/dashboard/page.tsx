"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { getGitHubUsername } from "@/lib/github";

interface Project {
  id: string;
  name: string;
  description: string;
}

interface ConnectionStatus {
  supabase: boolean;
  github: boolean;
  githubUsername?: string;
}

export default function DashboardHome() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [connections, setConnections] = useState<ConnectionStatus>({
    supabase: false,
    github: false
  });

  useEffect(() => {
    const checkConnections = async () => {
      try {
        // Check Supabase connection
        const { data, error } = await supabase.from("projects").select("id, name, description");
        
        // Check GitHub connection
        const githubUsername = await getGitHubUsername();

        setConnections({
          supabase: !error,
          github: !!githubUsername,
          githubUsername
        });

        if (!error) {
          setProjects(data || []);
        }
      } catch (err) {
        console.error("Error checking connections:", err);
      } finally {
        setLoading(false);
      }
    };

    checkConnections();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-6 space-y-4">
        <h2 className="text-xl font-semibold">Connection Status</h2>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${connections.supabase ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span>Supabase: {connections.supabase ? 'Connected' : 'Not Connected'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${connections.github ? 'bg-green-500' : 'bg-red-500'}`}></span>
            <span>GitHub: {connections.github ? `Connected (${connections.githubUsername})` : 'Not Connected'}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Your Projects</h1>
        <a href="/new-project/project-name" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          + Create New App
        </a>
      </div>
  
      {loading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p>No projects yet 🧐</p>
      ) : (
        <ul className="space-y-2">
          {projects.map((project) => (
            <li
              key={project.id}
              className="border p-3 rounded shadow hover:bg-gray-100 cursor-pointer"
              onClick={() => console.log("Selected project:", project.id)}
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