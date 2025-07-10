import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EditFormModal from "@/components/EditFormModel.jsx";

export default function Dashboard(){
  const router = useRouter();
  const [listings, setListings] = useState([]);
  const [editingListing, setEditingListing] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
      router.push("/");
    } 
    else{
      fetchListings();
    }
  }, []);

  const fetchListings = async () => {
    try{
      const res = await fetch("/api/listings");
      const data = await res.json();
      setListings(data);
    } 
    catch (err){
      console.error("Error fetching listings:", err);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try{
      const res = await fetch(`/api/listings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if(res.ok){
        const updated = await res.json();
        setListings((prev) =>
          prev.map((l) => (l.id === updated.id ? updated : l))
        );
      } 
      else{
        console.error("Failed to update listing status.");
      }
    } 
    catch (err){
      console.error("Error updating status:", err);
    }
  };

  const handleSaveEdit = async (id, updatedData) => {
    try{
      const res = await fetch(`/api/listings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if(res.ok){
        const updated = await res.json();
        setListings((prev) =>
          prev.map((l) => (l.id === updated.id ? updated : l))
        );
      } 
      else{
        console.error("Failed to save edited listing.");
      }
    } 
    catch(err){
      console.error("Error saving edit:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-500 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Car Listings Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            router.push("/");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Logout
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-500">
          <thead className="bg-gray-500">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr key={listing.id} className="text-center border-t">
                <td className="p-2 border">{listing.id}</td>
                <td className="p-2 border">{listing.title}</td>
                <td className="p-2 border capitalize">{listing.status}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => updateStatus(listing.id, "approved")}
                    className="text-green-600 hover:underline cursor-pointer"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => updateStatus(listing.id, "rejected")}
                    className="text-red-600 hover:underline cursor-pointer"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => {
                      setEditingListing(listing);
                      setShowModal(true);
                    }}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {listings.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No listings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <EditFormModal
        visible={showModal}
        listing={editingListing}
        onClose={() => setShowModal(false)}
        onSave={handleSaveEdit}
      />
    </div>
  );
}



