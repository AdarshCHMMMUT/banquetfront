import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const Limits = () => {
  const [limitsData, setLimitsData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  // Fetch all limits data on component mount
  useEffect(() => {
    async function fetchLimits() {
      try {
        const response = await fetch("https://banquet-seven.vercel.app/api/user/getlimits");
        if (!response.ok) throw new Error("Failed to fetch limits");
        const data = await response.json();
        console.log(data);
        if (data.success) {
          setLimitsData(data.data);
        } else {
          throw new Error("API returned success: false");
        }
      } catch (error) {
        console.error("Error fetching limits:", error);
        setLimitsData([]);
      }
    }
    fetchLimits();
  }, []);
  console.log(limitsData);
  // Handle edit button click
  const handleEdit = (limit) => {
    setEditingId(limit._id);
    setFormData({ ratePlan: limit.ratePlan, vegNonVeg: limit.vegNonVeg, limits: { ...limit.limits } });
  };

  // Handle input change for limits
  const handleLimitChange = (category, value) => {
    setFormData((prev) => ({
      ...prev,
      limits: {
        ...prev.limits,
        [category]: parseInt(value) || 0,
      },
    }));
  };

  // Handle form submission to update the limit
  const handleSubmit = async (e, id) => {
    e.preventDefault();
    // console.log(formData.limits);
    // console.log(id);
    try {
      const response = await axios.post("https://banquet-seven.vercel.app/api/user/updatelimits", {  
        id,
        limits: formData.limits,
      });
      if (response.data.success) {
        // Update the local state with the updated data
        setLimitsData((prev) =>
          prev.map((limit) =>
            limit._id === id ? { ...limit, limits: formData.limits } : limit
          )
        );
        setEditingId(null); // Exit edit mode
        toast.success("Limits updated successfully!");
      } else {
        throw new Error("API returned success: false");
      }
    } catch (error) {
      console.error("Error updating limits:", error);
      toast.error("Failed to update limits");
    }
  };

  // Handle cancel edit
  const handleCancel = () => {
    setEditingId(null);
    setFormData({});
  };

 return (
  <div className="p-6 max-w-6xl mx-auto">
    <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Selection Limits</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {limitsData.map((limit) => (
        <div key={limit._id} className="border border-gray-200 rounded-xl p-4 shadow-md bg-white">
          {editingId === limit._id ? (
            // Edit mode
            <form onSubmit={(e) => handleSubmit(e, limit._id)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Rate Plan</label>
                <input
                  type="text"
                  value={formData.ratePlan}
                  readOnly
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Veg/Non-Veg</label>
                <input
                  type="text"
                  value={formData.vegNonVeg}
                  readOnly
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-700">Limits</h3>
                {Object.entries(formData.limits).map(([category, value]) => (
                  <div key={category} className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700 w-32">{category}</label>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => handleLimitChange(category, e.target.value)}
                      className="block w-24 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      min="0"
                    />
                  </div>
                ))}
              </div>
              <div className="flex space-x-3 pt-2">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#7a0c0c] to-[#c0392b] text-white px-4 py-2 rounded-md hover:opacity-90"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            // View mode
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {limit.ratePlan} ({limit.vegNonVeg})
                </h2>
              </div>

              <table className="min-w-full border text-sm border-gray-200 rounded-md overflow-hidden">
                <thead className="bg-[#f9fafb] text-gray-700">
                  <tr>
                    <th className="text-left px-3 py-2 border-b border-gray-200">Category</th>
                    <th className="text-left px-3 py-2 border-b border-gray-200">Limit</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(limit.limits).map(([category, value]) => (
                    <tr key={category} className="even:bg-gray-50">
                      <td className="px-3 py-1 border-b border-gray-100 text-gray-700">{category}</td>
                      <td className="px-3 py-1 border-b border-gray-100 text-gray-900 font-medium">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                onClick={() => handleEdit(limit)}
                className="bg-gradient-to-r from-[#7a0c0c] to-[#c0392b] text-white px-4 py-2 rounded-md hover:opacity-90"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

};

export default Limits;