 import { Link } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/getAllCategory");
      const data = response.data;
      setUserData(data);
      setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
    } catch (error) {
      toast.error("Failed to load categories");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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

  const handleDeleteModal = (product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete === "delete-all") {
      setUserData([]);
      setTotalPages(1);
      toast.success("All categories deleted");
    } else {
      handleDelete(productToDelete._id);
    }
    setDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      fetchCategories();
    } else {
      const filtered = userData.filter((item) =>
        item.CategoryName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setUserData(filtered);
      setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
    }
  }, [searchQuery, fetchCategories, userData]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDownloadCSV = () => {
    const table = tableRef.current;
    if (!table) return;
    const rows = Array.from(table.querySelectorAll("tr"));
    const csv = rows
      .map((row) =>
        Array.from(row.querySelectorAll("th, td"))
          .map((cell) => `"${cell.innerText.replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Category-Detail.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
      <div className="flex justify-between items-center">
        <button onClick={handleDownloadCSV} className="btn btn-success text-white">
          Download CSV
        </button>
        <Link to="/addcategory" className="btn text-white bg-gradient-to-r from-[#5e0d14] to-[#991e1e]">
          + Add Category
        </Link>
      </div>

      <div className="form-control relative top-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search By Category Name"
          className="input input-bordered w-full border-gray-300 rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-[#991e1e]"
        />
        {searchQuery && (
          <span
            onClick={() => {
              setSearchQuery("");
              fetchCategories();
            }}
            className="cursor-pointer bg-red-600 text-white px-2 py-1 rounded-full absolute right-3 top-1/2 -translate-y-1/2"
          >
            x
          </span>
        )}
      </div>

      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        {!loading ? (
          userData.length > 0 ? (
            <table ref={tableRef} className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                <tr>
                  <th className="py-3 px-6">Category Name</th>
                  <th className="py-3 px-6">Action</th>
                  <th className="py-3 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {userData.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4">
                      <div className="font-bold">{item.CategoryName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/updatecategory/${item._id}`} className="btn btn-info text-white ml-2 btn-xs">
                        Edit
                      </Link>
                      <button onClick={() => handleDeleteModal(item)} className="btn btn-error text-white ml-2 btn-xs">
                        Delete
                      </button>
                    </td>
                    <td>
                      <SlideToggle isOn={item.status} onToggle={() => handleToggleStatus(item._id, item.status)} />
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
            <ColorRing visible={true} height="80" width="80" colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]} />
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
              <button onClick={confirmDelete} className="bg-red-600 text-white px-4 py-2 rounded-md mr-2">
                Yes, Delete
              </button>
              <button onClick={cancelDelete} className="bg-white border border-gray-300 px-4 py-2 rounded-md">
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