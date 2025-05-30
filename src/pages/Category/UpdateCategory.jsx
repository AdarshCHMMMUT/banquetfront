import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const staticCategoryData = [
  {
    _id: "1",
    alt: "Category 1",
    url: "https://example.com/images/category1.jpg",
    status: true,
  },
  {
    _id: "2",
    alt: "Category 2",
    url: "https://example.com/images/category2.jpg",
    status: false,
  },
  {
    _id: "3",
    alt: "Category 3",
    url: "https://example.com/images/category3.jpg",
    status: true,
  },
];

const UpdateCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [alt, setAlt] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserDetail();
  }, [id]);

  const fetchUserDetail = () => {
    try {
      const category = staticCategoryData.find((item) => item._id === id);
      if (category) {
        setAlt(category.alt);
        setExistingImage(category.url);
      } else {
        toast.error("Category not found");
        navigate("/listcategory");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching category");
    }
  };

  const EditUser = () => {
    setLoading(true);
    const missingFields = [];
    if (!alt) missingFields.push("Alt");

    if (missingFields.length > 0) {
      const missingFieldsMsg = `Please input all the following fields: ${missingFields.join(", ")}`;
      toast.error(missingFieldsMsg);
      setLoading(false);
      return;
    }

    try {
      // Simulate updating the category (in a real app, update staticCategoryData or persist to storage)
      const updatedCategory = {
        _id: id,
        alt,
        url: image ? URL.createObjectURL(image) : existingImage, // Use new image or keep existing
        status: staticCategoryData.find((item) => item._id === id).status,
      };
      console.log("Updated category:", updatedCategory); // For debugging
      toast.success("Image updated successfully!");
      setLoading(false);
      setTimeout(() => {
        navigate("/listcategory");
      }, 600);
    } catch (error) {
      console.error(error);
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
          <label htmlFor="">Alt</label>
          <input
            type="text"
            className="input input-bordered"
            onChange={(e) => setAlt(e.target.value)}
            placeholder="Name"
            value={alt}
          />
        </div>
        <div className="form-control">
          <label htmlFor="">Image</label>
          <input
            type="file"
            accept="image/*"
            className="input input-bordered"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="form-control">
          {image ? (
            <img src={URL.createObjectURL(image)} width={250} alt="Preview" />
          ) : (
            existingImage && (
              <img src={existingImage} width={250} alt="Current" />
            )
          )}
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          disabled={loading}
          onClick={EditUser}
          className="btn btn-info text-white"
        >
          {loading ? "Updating..." : "Edit Image"}
        </button>
      </div>
    </>
  );
};

export default UpdateCategory;