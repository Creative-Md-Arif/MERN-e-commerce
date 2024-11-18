import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "@redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "@redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!image) return toast.error("Image is required.");
    if (!name || name.trim() === "") return toast.error("Name is required.");
    if (!price || isNaN(price) || price <= 0)
      return toast.error("Valid price is required.");
    if (!quantity || isNaN(quantity) || quantity < 0)
      return toast.error("Valid quantity is required.");
    if (!brand || brand.trim() === "") return toast.error("Brand is required.");
    if (!description || description.trim() === "")
      return toast.error("Description is required.");
    if (stock === "" || isNaN(stock) || stock < 0)
      return toast.error("Valid stock count is required.");
    if (!category || category.trim() === "")
      return toast.error("Category is required.");

    try {
      setLoading(true); // Set loading to true
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product creation failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Product creation failed. Try Again.");
    } finally {
      setLoading(false); // Set loading to false after the process
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    setLoading(true); // Set loading to true before upload

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
      setImageUrl(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    } finally {
      setLoading(false); // Set loading to false after upload
    }
  };

  return (
    <div className="p-5 min-h-screen h-full bg-[#121212] shadow-xl shadow-[#000000a0] transition-all duration-300 pl-[80px] sm:pl-[85px] lg:pl-[120px] 2xl:pl-0">
      <div>
        <div className="flex flex-col justify-center md:flex-row gap-6 h-full">
          <AdminMenu />
          <div className="md:w-3/4 p-5 bg-[#1e1e1e] rounded-lg shadow-lg shadow-[#00000080] transition duration-300 hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-5 border-b border-gray-700 pb-3">
              Create Product
            </h2>

            {imageUrl && (
              <div className="text-center mb-5">
                <img
                  src={imageUrl}
                  alt="product"
                  className="block mx-auto max-h-[200px] h-[200px] w-auto rounded-lg border border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 object-contain"
                />
              </div>
            )}

            <div className="mb-5">
              <label className="border border-gray-600 bg-[#2c2c2c] text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11 hover:bg-[#3a3a3a] transition-all duration-300">
                {loading ? "Uploading..." : image ? image.name : "Upload Image"}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={uploadFileHandler}
                  className={!image ? "hidden" : "text-white w-40"}
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  className="p-4 w-full border border-gray-700 rounded-lg bg-[#101011] text-white outline-none focus:ring-2 focus:ring-pink-600 transition-all duration-300"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="price" className="text-gray-300">
                  Price
                </label>
                <input
                  min="0"
                  inputMode="numeric"
                  type="number"
                  className="p-4 w-full border border-gray-700 rounded-lg bg-[#101011] text-white outline-none focus:ring-2 focus:ring-pink-600 transition-all duration-300"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={{ appearance: "textfield" }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="quantity" className="text-gray-300">
                  Quantity
                </label>
                <input
                  min="0"
                  inputMode="numeric"
                  type="number"
                  className="p-4 w-full border border-gray-700 rounded-lg bg-[#101011] text-white outline-none focus:ring-2 focus:ring-pink-600 transition-all duration-300"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  style={{ appearance: "textfield" }}
                />
              </div>

              <div>
                <label htmlFor="brand" className="text-gray-300">
                  Brand
                </label>
                <input
                  type="text"
                  className="p-4 w-full border border-gray-700 rounded-lg bg-[#101011] text-white outline-none focus:ring-2 focus:ring-pink-600 transition-all duration-300"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="text-gray-300">
                Description
              </label>
              <textarea
                className="p-4 w-full border border-gray-700 rounded-lg bg-[#101011] text-white outline-none focus:ring-2 focus:ring-pink-600 transition-all duration-300"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="stock" className="text-gray-300">
                  Count In Stock
                </label>
                <input
                  type="text"
                  className="p-4 w-full border border-gray-700 rounded-lg bg-[#101011] text-white outline-none focus:ring-2 focus:ring-pink-600 transition-all duration-300"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="category" className="text-gray-300">
                  Category
                </label>
                <select
                  className="p-4 w-full border border-gray-700 rounded-lg bg-[#101011] text-white outline-none focus:ring-2 focus:ring-pink-600 transition-all duration-300"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Choose Category</option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading} // Disable button while loading
              className={`py-4 px-10 mt-5 rounded-lg text-lg font-bold ${
                loading ? "bg-gray-500" : "bg-pink-600 hover:bg-pink-700"
              } text-white shadow-md ${
                loading ? "" : "shadow-pink-700 hover:shadow-xl"
              } transition-all duration-300 flex items-center justify-center`}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C6.268 0 2 4.268 2 9s4.268 9 9 9v-4a5 5 0 01-5-5z"
                  ></path>
                </svg>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
