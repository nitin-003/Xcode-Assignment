import { useEffect, useState } from "react";

export default function EditFormModal({ visible, onClose, listing, onSave }){
  const [form, setForm] = useState({ title: "", description: "" });

  useEffect(() => {
    if(visible && listing){
      setForm({
        title: listing.title || "",
        description: listing.description || "",
      });
    }
  }, [visible, listing]);
 
  if(!visible) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(listing.id, form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="p-6 rounded-md w-full max-w-md shadow-xl">
        <h2 className="text-xl font-bold mb-4">Edit Listing</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Title</label>
            <input
              name="title"
              type="text"
              className="w-full border p-2 rounded"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              className="w-full border p-2 rounded"
              rows={4}
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 rounded cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



