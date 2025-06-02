import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import SlideToggle from "../toggle/SlideToggle";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const ITEMS_PER_PAGE = 10;

const ListCategory = () => {
  const tableRef = useRef(null);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isEditingid, setIsEditingid] = useState(null);
  const [name, setName] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://banquet-seven.vercel.app/api/user/vegmenu");
      const data = Array.isArray(response.data.vegMenu) ? response.data.vegMenu : [];
      setUserData(data);
      setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
    } catch (error) {
      toast.error("Failed to load categories");
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleToggleStatus = (id, currentStatus) => {
    const updatedStatus = !currentStatus;
    const updatedData = userData.map((item) =>
      item._id === id ? { ...item, status: updatedStatus } : item
    );
    setUserData(updatedData);
    toast.success("Status updated");
  };

  const handleDelete = (id) => {
    const updatedData = userData.filter((item) => item._id !== id);
    setUserData(updatedData);
    setTotalPages(Math.ceil(updatedData.length / ITEMS_PER_PAGE));
    toast.success("Category deleted successfully");
  };

  const handleEdit = (item) => {
    setIsEditingid(item._id);
    setName(item.CategoryName);
  };

  const handleSaveEdit = async (id) => {
    try {
      await axios.post('http://localhost:4000/api/user/updatecategorynameinveg', {
        id,
        newCategory: name,
      });
      setUserData(userData.map((item) =>
        item._id === id ? { ...item, CategoryName: name } : item
      ));
      setIsEditingid(null);
      toast.success("Category updated successfully");
    } catch (error) {
      toast.error("Failed to update category");
      console.error(error.message);
    }
  };

  const handleDeleteModal = (product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (productToDelete === "delete-all") {
      try {
        await axios.delete('https://banquet-seven.vercel.app/api/user/vegmenu/delete-all');
        setUserData([]);
        setTotalPages(1);
        toast.success("All categories deleted");
      } catch (error) {
        toast.error("Failed to delete all categories");
        console.error(error.message);
      }
    } else {
      try {
        await axios.delete(`https://banquet-seven.vercel.app/api/user/vegmenu/${productToDelete._id}`);
        handleDelete(productToDelete._id);
      } catch (error) {
        toast.error("Failed to delete category");
        console.error(error.message);
      }
    }
    setDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = userData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  console.log("Paginated Data:", paginatedData);
  // console.log(paginatedData[1].cateogry);
  // console.log(paginatedData);

  const renderPagination = () => (
    <nav className="mt-12 flex justify-center">
      <ul className="join">
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 disabled:opacity-50"
          >
            Previous
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li key={page}>
            <button
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 mx-1 ${currentPage === page ? "bg-gray-400 text-white" : ""}`}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-black text-white disabled:opacity-50"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );

  return (
    <>
      <Toaster />
      
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        {!loading ? (
          paginatedData.length > 0 ? (
            <table ref={tableRef} className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-6">Category Name</th>
                  <th className="py-3 px-6">Action</th>
                  <th className="py-3 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {paginatedData.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4">
                      <div className="font-semibold">
                        {isEditingid === item._id ? (
                          <>
                            <input
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="border px-2 py-1 rounded"
                            />
                            <button
                              onClick={() => handleSaveEdit(item._id)}
                              className="btn btn-success text-white ml-2 btn-xs"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setIsEditingid(null)}
                              className="btn btn-warning text-white ml-2 btn-xs"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <div className="font-bold">{item.category}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        className="btn btn-info text-white ml-2 btn-xs"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteModal(item)}
                        className="btn btn-error text-white ml-2 btn-xs"
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <SlideToggle
                        isOn={item.status}
                        onToggle={() => handleToggleStatus(item._id, item.status)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-3 flex justify-center">
              <p className="font-semibold">No Data Available!</p>
            </div>
          )
        ) : (
          <div className="flex justify-center mt-12">
            <ColorRing
              visible={true}
              height="80"
              width="80"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
        )}
      </div>

      {renderPagination()}

      {isDeleteModalOpen && productToDelete && (
        <div className="fixed z-50 inset-0 flex items-center justify-center">
          <div className="fixed inset-0 bg-gray-500 opacity-75" />
          <div className="bg-white rounded-lg shadow-xl z-10 p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900">Delete Confirmation</h3>
            <p className="mt-2">Are you sure you want to delete this item?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md mr-2"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-white border border-gray-300 px-4 py-2 rounded-md"
              >
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListCategory;