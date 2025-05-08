'use client';

import { useState } from 'react';
import { CodeMirrorEditor } from '@/components/editor/CodeMirrorEditor';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function EditorPage() {
  const [code, setCode] = useState('// Start coding here...\n');

  return (
    <div className="h-screen flex flex-col">
      <header className="border-b p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Code Editor</h1>
        <ThemeToggle />
      </header>
      <main className="flex-1 p-4">
        <div className="h-full border rounded-lg overflow-hidden">
          <CodeMirrorEditor
            value={code}
            onChange={setCode}
            className="h-full"
          />
        </div>
      </main>
    </div>
  );
} 