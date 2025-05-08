import React, { useState } from 'react';

interface ProjectsModalProps {
  open: boolean;
  onClose: () => void;
}

export function ProjectsModal({ open, onClose }: ProjectsModalProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleCreate() {
    // TODO: Add project creation logic
    setShowAdd(false);
    setName('');
    setDescription('');
    onClose();
  }

  return (
    <>
      {!showAdd ? (
        <div>
          <h2 className="text-lg font-bold mb-4">Your Projects</h2>
          {/* Placeholder for project list */}
          <div className="mb-6 text-gray-500">(Project list goes here)</div>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => setShowAdd(true)}
          >
            + Add Project
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-bold mb-4">Add New Project</h2>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleCreate();
            }}
            className="space-y-4"
          >
            <div>
              <label className="block mb-1 font-medium">Project Name</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                className="w-full border rounded px-3 py-2"
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setShowAdd(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
} 