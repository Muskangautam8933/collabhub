import { useState } from "react";

// -------------------- CREATE PROJECT FORM ---------------------
interface CreateProjectFormProps {
  onClose: () => void;
  onSubmit: (project: { name: string; description: string | null; teamLimit: number }) => void;
}

export default function CreateProjectForm({ onClose, onSubmit }: CreateProjectFormProps) {
  const [formData, setFormData] = useState<{name: string; description: string; teamLimit: number}>({ name: "", description: "", teamLimit: 6 });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((d) => ({
      ...d,
      [name]: name === "teamLimit" ? Number(value) : value,
    } as any));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    setSubmitting(true);

    try {
      const newProject = {
        name: formData.name,
        description: formData.description || null,
        teamLimit: Math.max(1, formData.teamLimit),
      };

      await onSubmit(newProject);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 text-black p-6 rounded-lg w-full max-w-md border border-gray-700"
      >
        <h2 className="text-xl font-semibold mb-4">Create New Project</h2>

        <label className="block mb-2 text-sm">
          Name
          <input
            type="text"
            name="name"
            className="mt-1 w-full px-3 py-2 rounded-md  border border-black outline-none"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label className="block mb-4 text-sm">
          Description
          <textarea
            name="description"
            className="mt-1 w-full px-3 py-2 rounded-md  border border-black outline-none resize-none"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        <label className="block mb-4 text-sm">
          Team Limit
          <input
            type="number"
            name="teamLimit"
            min={1}
            className="mt-1 w-full px-3 py-2 rounded-md  border border-black outline-none"
            value={formData.teamLimit}
            onChange={handleChange}
          />
        </label>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm bg-white text-black rounded-md hover:bg-black hover:text-white"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-white hover:text-black hover:border-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Creating…" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
