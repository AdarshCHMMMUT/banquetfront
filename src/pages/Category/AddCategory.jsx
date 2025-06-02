import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddCategory = () => {
  const navigate = useNavigate();
  const [CategoryName, setCategoryName] = useState("");
  const [VegNonVeg, setVegNonVeg] = useState(null);
  const [loading, setLoading] = useState(false);

  const addCategory = () => {
    setLoading(true);
    const missingFields = [];
    if (!CategoryName) missingFields.push("Category");
    if (!VegNonVeg) missingFields.push("VegNonVeg");

    if (missingFields.length > 0) {
      const missingFieldsMsg = `Please input all the following fields: ${missingFields.join(", ")}`;
      toast.error(missingFieldsMsg);
      setLoading(false);
      return;
    }

const data = {
  CategoryName,
  VegNonVeg
};

    try {
      axios
        .post(`http://localhost:5000/api/create`, data)
        .then((res) => {
          if (res.data) {
            toast.success("Category Added Successfully!");
            setLoading(false);
            setTimeout(() => {
              navigate("/listcategory"); // Changed to /listcategory
            }, 600);
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response?.data?.message || "Error adding Category");
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex justify-end">
        <Link to={"/listcategory"} className="btn btn-neutral">
          Go Back
        </Link>
      </div>
      <div className="grid md:grid-cols-4 gap-4">
        <div className="form-control">
          <label htmlFor="">Category Name</label>
          <input
            type="text"
            className="input input-bordered"
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category"
          />
        </div>
        <div className="form-control">
  <label htmlFor="color-select">Veg / Non-veg</label>
  <select
    id="color-select"
    defaultValue="Pick a color"
    className="select input-bordered"
     onChange={(e) => setVegNonVeg(e.target.value)}
     placeholder="Veg / Non-veg"
  >
    
    <option>Veg</option>
    <option>Non-Veg</option>
    
  </select>
</div>
        
      </div>
      <div className="mt-4 flex justify-center">
        <button
          disabled={loading}
          onClick={addCategory}
          className="btn btn-info text-white"
        >
          Add Category
        </button>
      </div>
    </>
  );
};

export default AddCategory;