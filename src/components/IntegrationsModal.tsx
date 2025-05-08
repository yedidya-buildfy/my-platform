import React, { useState } from 'react';

interface IntegrationsModalProps {
  open: boolean;
  onClose: () => void;
}

export function IntegrationsModal({ open, onClose }: IntegrationsModalProps) {
  const [selected, setSelected] = useState<null | 'github' | 'shopify'>(null);

  return (
    <>
      {!selected ? (
        <div>
          <h2 className="text-lg font-bold mb-4">Integrations</h2>
          <div className="flex flex-col gap-4 mb-6">
            <button
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-blue-600 transition"
              onClick={() => setSelected('github')}
            >
              GitHub Integration
            </button>
            <button
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-blue-600 transition"
              onClick={() => setSelected('shopify')}
            >
              Shopify Integration
            </button>
          </div>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={onClose}>Close</button>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-bold mb-4">
            {selected === 'github' ? 'GitHub Integration' : 'Shopify Integration'}
          </h2>
          <div className="mb-6 text-gray-500">({selected} connection screen placeholder)</div>
          <button className="mt-4 px-4 py-2 bg-gray-200 rounded" onClick={() => setSelected(null)}>
            Back
          </button>
        </div>
      )}
    </>
  );
} 