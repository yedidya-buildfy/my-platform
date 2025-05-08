import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ProjectsModal } from '@/components/ProjectsModal';
import { IntegrationsModal } from '@/components/IntegrationsModal';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My Platform',
  description: 'AI-powered code editor for Shopify app development',
};

// Reusable Modal component
function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  // Close on ESC
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  // Close on click outside
  const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  if (!open) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleBackdropClick}>
      <div className="bg-white dark:bg-gray-900 rounded-lg p-8 min-w-[300px] min-h-[200px] shadow-xl relative">
        {children}
      </div>
    </div>,
    typeof window !== 'undefined' ? document.body : ({} as HTMLElement)
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeModal, setActiveModal] = useState<null | 'projects' | 'integrations' | 'settings'>(null);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <div className="flex h-screen w-screen">
            <Sidebar active={activeModal} onSelect={setActiveModal} />
            <div className="flex-1 relative">
              <ProjectsModal open={activeModal === 'projects'} onClose={() => setActiveModal(null)} />
              <IntegrationsModal open={activeModal === 'integrations'} onClose={() => setActiveModal(null)} />
              <Modal open={activeModal === 'settings'} onClose={() => setActiveModal(null)}>
                <h2 className="text-lg font-bold mb-4">Settings Modal (placeholder)</h2>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setActiveModal(null)}>Close</button>
              </Modal>
              {/* Main content (Editor + AI Assistant) */}
              <div className={activeModal ? 'pointer-events-none blur-sm select-none' : ''}>
                {children}
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
