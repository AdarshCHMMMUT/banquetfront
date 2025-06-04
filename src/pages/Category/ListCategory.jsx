import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import SlideToggle from "../toggle/SlideToggle";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const ITEMS_PER_PAGE = 10;

const ListCategory = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isEditingId, setIsEditingId] = useState(null);
  const [name, setName] = useState("");
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [newItemName, setNewItemName] = useState("");
  const [newItemImage, setNewItemImage] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryItems, setNewCategoryItems] = useState([]);
  const [newItemInput, setNewItemInput] = useState("");
  const [newItemImageInput, setNewItemImageInput] = useState("");
  const [menuType, setMenuType] = useState("Veg");
  const [editingItem, setEditingItem] = useState(null);
  const [editItemName, setEditItemName] = useState("");
  const [editItemImage, setEditItemImage] = useState("");



  // fetch category
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const endpoint =
        menuType === "Veg"
          ? "https://banquet-seven.vercel.app/api/user/vegmenu"
          : "https://banquet-seven.vercel.app/api/user/nonvegmenu";
      const response = await axios.get(endpoint);
      const dataKey = menuType === "Veg" ? "vegMenu" : "nonvegMenu";
      const data = Array.isArray(response.data[dataKey]) ? response.data[dataKey] : [];
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
  }, [menuType]);



  // maintain status
  const handleToggleStatus = (id, currentStatus) => {
    const updatedStatus = !currentStatus;
    const updatedData = userData.map((item) =>
      item._id === id ? { ...item, status: updatedStatus } : item
    );
    setUserData(updatedData);
    toast.success("Status updated");
  };

  // delete category
  const handleDelete = (id) => {
    const updatedData = userData.filter((item) => item._id !== id);
    setUserData(updatedData);
    setTotalPages(Math.ceil(updatedData.length / ITEMS_PER_PAGE));
    toast.success("Category deleted successfully");
  };

  // handle edit category
  const handleEdit = (item) => {
    setIsEditingId(item._id);
    setName(item.category);
  };

  const handleSaveEdit = async (id) => {   //edit catgory name
    try {
      const endpoint =
        menuType === "Veg"
          ? "https://banquet-seven.vercel.app/api/user/updatecategorynameinveg"
          : "https://banquet-seven.vercel.app/api/user/updatecategorynameinveg";
      await axios.post(endpoint, {
        id,
        newCategory: name,
      });
      setUserData(
        userData.map((item) =>
          item._id === id ? { ...item, category: name } : item
        )
      );
      setIsEditingId(null);
      toast.success("Category updated successfully");
    } catch (error) {
      toast.error("Failed to update category");
      console.error(error.message);
    }
  };


  // handle add item to category
  const handleAddItemToCategory = async (category) => {
    if (!newItemName.trim() || !newItemImage.trim()) {
      toast.error("Item name and image are required");
      return;
    }

    try {
      const endpoint =
        menuType === "Veg"
          ? "https://banquet-seven.vercel.app/api/user/addvegmenu"
          : "https://banquet-seven.vercel.app/api/user/addnonvegmenu";
      const response = await axios.post(endpoint, {
        category,
        name: newItemName,
        image: newItemImage,
      });

      if (response.data.success) {
        setUserData(
          userData.map((cat) =>
            cat.category === category
              ? {
                ...cat,
                items: [...cat.items, { name: newItemName, image: newItemImage }],
              }
              : cat
          )
        );
        setNewItemName("");
        setNewItemImage("");
        toast.success("Item added successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to add item");
      console.error(error.message);
    }
  };




  // handle add new category
  const handleAddNewCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }
    if (newCategoryItems.length === 0) {
      toast.error("At least one item is required for the new category");
      return;
    }

    try {
      const endpoint =
        menuType === "Veg"
          ? "https://banquet-seven.vercel.app/api/user/addvegmenu"
          : "https://banquet-seven.vercel.app/api/user/addnonvegmenu";

      const firstItem = newCategoryItems[0];
      const response = await axios.post(endpoint, {
        category: newCategoryName,
        name: firstItem.name,
        image: firstItem.image,
      });

      if (response.data.success) {
        for (let i = 1; i < newCategoryItems.length; i++) {
          const item = newCategoryItems[i];
          await axios.post(endpoint, {
            category: newCategoryName,
            name: item.name,
            image: item.image,
          });
        }

        const newCategory = {
          _id: `temp-${Date.now()}`,
          category: newCategoryName,
          items: newCategoryItems,
          status: true,
        };

        setUserData([...userData, newCategory]);
        setTotalPages(Math.ceil((userData.length + 1) / ITEMS_PER_PAGE));
        setNewCategoryName("");
        setNewCategoryItems([]);
        toast.success("Category added successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to add category");
      console.error(error.message);
    }
  };





  // add item to specific category
  const handleAddItemToNewCategory = () => {
    if (!newItemInput.trim() || !newItemImageInput.trim()) {
      toast.error("Item name and image are required");
      return;
    }
    setNewCategoryItems([...newCategoryItems, { name: newItemInput, image: newItemImageInput }]);
    setNewItemInput("");
    setNewItemImageInput("");
  };







  // functions for editing name
  const handleEditItem = (categoryIndex, itemIndex, item) => {
    setEditingItem({ categoryIndex, itemIndex });
    setEditItemName(item.name);
    setEditItemImage(item.image);
  };

  const handleSaveEditItem = async (category, name) => {
    if (!editItemName.trim() || !editItemImage.trim()) {
      toast.error("Item name and image are required");
      return;
    }

    try {
      const endpoint =
        menuType === "Veg"
          ? "https://banquet-seven.vercel.app/api/user/editvegmenuitemname"
          : "https://banquet-seven.vercel.app/api/user/editnonvegmenuitemname";
      const response = await axios.post(endpoint, {
        category,
        name: name,
        newItemName: editItemName,
        newItemImage: editItemImage,
      });

      if (response.data.success) {
        const updatedData = userData.map((cat) => {
          if (cat.category === category) {
            const updatedItems = cat.items.map((item, itemIndex) =>
              itemIndex === editingItem.itemIndex
                ? { ...item, name: editItemName, image: editItemImage }
                : item
            );
            return { ...cat, items: updatedItems };
          }
          return cat;
        });
        setUserData(updatedData);
        setEditingItem(null);
        setEditItemName("");
        setEditItemImage("");
        toast.success("Item updated successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update item");
      console.error(error.message);
    }
  };

  const handleCancelEditItem = () => {
    setEditingItem(null);
    setEditItemName("");
    setEditItemImage("");
  };


  // deleteing category



  const handleDeleteModal = (product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (productToDelete === "delete-all") {
      try {
        const endpoint =
          menuType === "Veg"
            ? "https://banquet-seven.vercel.app/api/user/vegmenu/delete-all"
            : "https://banquet-seven.vercel.app/api/user/nonvegmenu/delete-all";
        await axios.delete(endpoint);
        setUserData([]);
        setTotalPages(1);
        toast.success("All categories deleted");
      } catch (error) {
        toast.error("Failed to delete all categories");
        console.error(error.message);
      }
    } else {
      try {
        const endpoint =
          menuType === "Veg"
            ? `https://banquet-seven.vercel.app/api/user/deletevegcategory`
            : `https://banquet-seven.vercel.app/api/user/deletenonvegcategory`;

        await axios.delete(endpoint, {
          data: {
            id: productToDelete._id,
          },
        });

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












  /// handiling pagination

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = userData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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

  const handleDeleteItem = async (itemId, category) => {
    try {
      const endpoint =
        menuType === "Veg"
          ? "https://banquet-seven.vercel.app/api/user/deletevegmenuitem"
          : "https://banquet-seven.vercel.app/api/user/deletenonvegmenuitemname";

      await axios.post(endpoint, {
        category,
        itemId,
      });

      const updatedData = userData.map((cat) => {
        if (cat.category === category) {
          return {
            ...cat,
            items: cat.items.filter((item) => item._id !== itemId),
          };
        }
        return cat;
      });

      setUserData(updatedData);
      toast.success("Item deleted successfully");
    } catch (error) {
      toast.error("Failed to delete item");
      console.error(error.message);
    }
  }



  return (
    <>
      <Toaster />

      {/* Toggle between Veg and Non-Veg */}
      <div className="mt-12 p-4 shadow-sm border rounded-lg">
        <label className="text-sm font-medium text-gray-700 mb-1">Menu Type</label>
        <select
          value={menuType}
          onChange={(e) => setMenuType(e.target.value)}
          className="bg-white text-center text-gray-700 focus:text-black border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>
      </div>

      {/* Form to Add New Category with Items */}
      <div className="mt-4 p-4 shadow-sm border rounded-lg">
        <h3 className="text-lg font-medium mb-4">Add New Category</h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Category Name</label>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category name"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Add Items</label>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newItemInput}
                  onChange={(e) => setNewItemInput(e.target.value)}
                  className="border border-gray-300 rounded-md py-2 px-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter item name"
                />
                <input
                  type="text"
                  value={newItemImageInput}
                  onChange={(e) => setNewItemImageInput(e.target.value)}
                  className="border border-gray-300 rounded-md py-2 px-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter image URL"
                />
                <button
                  onClick={handleAddItemToNewCategory}
                  className="btn btn-primary text-white px-4 py-2"
                >
                  Add Item
                </button>
              </div>
              {newCategoryItems.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-700">Items:</p>
                  <ul className="list-disc pl-5">
                    {newCategoryItems.map((item, index) => (
                      <li key={index} className="text-gray-600">
                        {item.name} - {item.image}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={handleAddNewCategory}
            className="btn btn-success text-white mt-2"
          >
            Save Category
          </button>
        </div>
      </div>

      {/* Categories List */}
      <div className="mt-4 shadow-sm border rounded-lg overflow-x-auto">
        {!loading ? (
          paginatedData.length > 0 ? (
            <div className="divide-y">
              {paginatedData.map((item, categoryIndex) => (
                <div key={item._id} className="p-4">
                  <div className="flex flex-wrap justify-between items-center">
                    <div className="flex-1">
                      {isEditingId === item._id ? (
                        <div className=" items-center gap-2" id="edit-category">
                          <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border px-2 py-1 rounded"
                          />
                          <button
                            onClick={() => handleSaveEdit(item._id)}
                            className="btn btn-success text-white btn-xs"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setIsEditingId(null)}
                            className="btn btn-warning text-white btn-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div
                          className="font-bold text-gray-700 cursor-pointer"
                          onClick={() =>
                            setExpandedCategory(
                              expandedCategory === categoryIndex ? null : categoryIndex
                            )
                          }
                        >
                          {item.category}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        className="btn btn-info text-white btn-xs"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteModal(item)}
                        className="btn btn-error text-white btn-xs"
                      >
                        Delete
                      </button>
                      <SlideToggle
                        isOn={item.status}
                        onToggle={() => handleToggleStatus(item._id, item.status)}
                      />
                    </div>
                  </div>
                  {expandedCategory === categoryIndex && (
                    <div className="mt-4 pl-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {item.items.map((subItem, subIndex) => (
                          <div
                            key={`${subItem.name}-${subIndex}`}
                            className="border rounded-xl p-4"
                          >
                            {editingItem &&
                              editingItem.categoryIndex === categoryIndex &&
                              editingItem.itemIndex === subIndex ? (
                              <div className="flex flex-col gap-2" id="category-edit-item">
                                <div className="flex flex-wrap items-center gap-2">
                                  <input
                                    type="text"
                                    value={editItemName}
                                    onChange={(e) => setEditItemName(e.target.value)}
                                    className="border border-gray-300 rounded-md py-2 px-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter item name"
                                  />
                                  <input
                                    type="text"
                                    value={editItemImage}
                                    onChange={(e) => setEditItemImage(e.target.value)}
                                    className="border border-gray-300 rounded-md py-2 px-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter image URL"
                                  />
                                  <button
                                    onClick={() =>
                                      handleDeleteItem(item.items[subIndex]._id, item.category)
                                    }
                                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
                                  >
                                    Delete
                                  </button>

                                </div>

                                <div className="flex gap-2">
                                  <button
                                    onClick={() =>
                                      handleSaveEditItem(item.category, item.items[subIndex].name)
                                    }
                                    className="btn btn-success text-white btn-xs"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={handleCancelEditItem}
                                    className="btn btn-warning text-white btn-xs"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>


                            ) : (
                              <div
                                className="flex items-center space-x-4 cursor-pointer"
                                onClick={() => handleEditItem(categoryIndex, subIndex, subItem)}
                              >
                                {subItem.image && (
                                  <img
                                    src={subItem.image.trim()}
                                    alt={subItem.name}
                                    className="w-12 h-12 object-cover rounded"
                                    onError={(e) => {
                                      e.target.style.display = "none";
                                    }}
                                  />
                                )}
                                <span className="font-medium">{subItem.name}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 flex flex-col gap-2">
                        <div className="flex gap-2 overflow-hidden">
                          <input
                            type="text"
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                            className="border border-gray-300 rounded-md py-2 px-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter new item name"
                          />
                          <input
                            type="text"
                            value={newItemImage}
                            onChange={(e) => setNewItemImage(e.target.value)}
                            className="border border-gray-300 rounded-md py-2 px-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter image URL"
                          />
                          <button
                            onClick={() => handleAddItemToCategory(item.category)}
                            className="btn btn-primary text-white px-4 py-2"
                          >
                            Add Item
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
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