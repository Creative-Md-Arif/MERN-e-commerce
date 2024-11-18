import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "@redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "@redux/api/categoryApiSlice";
import { toast } from "react-toastify";

const ProductUpdate = () => {
  const params = useParams();
  const { data: productData  } = useGetProductByIdQuery(params._id);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(productData?.description || "");
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const navigate = useNavigate();
  const { data: categories = [] } = useFetchCategoriesQuery();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    setUploadLoading(true);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success("Image uploaded successfully");
      setImage(res.image);
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setUploadLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Input validation
    if (!image) {
      toast.error("Please upload an image.");
      return;
    }
    if (!name || name.trim().length < 3) {
      toast.error("Name should be at least 3 characters long.");
      return;
    }
    if (!description || description.trim().length < 10) {
      toast.error("Description should be at least 10 characters long.");
      return;
    }
    if (!price || isNaN(price) || Number(price) <= 0) {
      toast.error("Please enter a valid price.");
      return;
    }
    if (!category) {
      toast.error("Please select a category.");
      return;
    }
    if (!quantity || isNaN(quantity) || Number(quantity) <= 0) {
      toast.error("Please enter a valid quantity.");
      return;
    }
    if (!brand || brand.trim().length < 2) {
      toast.error("Brand should be at least 2 characters long.");
      return;
    }
    if (!stock || isNaN(stock) || Number(stock) < 0) {
      toast.error("Please enter a valid stock count.");
      return;
    }
  
    setUpdateLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);
  
      const data = await updateProduct({ productId: params._id, formData });
  
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`Product successfully updated`);
        navigate("/admin/allproductslist");
        window.location.reload(); // Refresh to update the list
      }
    } catch (err) {
      toast.error("Product update failed. Try again.");
    } finally {
      setUpdateLoading(false);
    }
  };
  

  const handleDelete = async () => {
    let answer = window.confirm("Are you sure you want to delete this product?");
    if (!answer) return;

    setDeleteLoading(true);
    try {
      const { data } = await deleteProduct(params._id);
      toast.success(`"${data.name}" is deleted`);
      navigate("/admin/allproductslist");
      window.location.reload(); // Refresh to update the list
    } catch (err) {
      toast.error("Delete failed. Try again.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="p-5 min-h-screen h-full bg-[#121212] shadow-xl shadow-[#000000a0] transition-all duration-300 pr-3 pl-[80px] sm:pl-[85px] lg:pl-[120px] 2xl:pl-0">
      <div>
        <div className="flex flex-col justify-center md:flex-row gap-6 h-full">
          <AdminMenu />
          <div className="md:w-3/4 p-5 bg-[#1e1e1e] rounded-lg shadow-lg shadow-[#00000080] transition duration-300 hover:shadow-2xl">
            <div className="text-[20px] md:text-2xl font-bold text-white mb-5 border-b border-gray-700 pb-3">
              Update / Delete Product
            </div>

            {image && (
              <div className="text-center mb-4">
                <img
                  src={image}
                  alt="product"
                  className="block mx-auto max-h-[200px] h-[200px] w-auto rounded-lg border border-gray-700 shadow-md hover:shadow-lg transition-all duration-300 object-contain"
                />
              </div>
            )}

            <div className="mb-5">
              <label className="border border-gray-600 bg-[#2c2c2c] text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11 hover:bg-[#3a3a3a] transition-all duration-300">
                {uploadLoading ? "Uploading..." : "Upload Image"}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={uploadFileHandler}
                  className="hidden"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="text-white">
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
                <label htmlFor="price" className="text-white">
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
                <label htmlFor="brand" className="text-white">
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
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="stock" className="text-white">
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
                  {categories.map((c) => (
                    <option key={c._id} value={c._id} selected={category === c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                className="p-2 sm:p-4 text-xs md:text-xl w-full text-center font-bold text-white rounded-lg bg-[#5c5c5c] hover:bg-pink-600 shadow-lg shadow-pink-500/40 transition-all duration-300"
                onClick={handleSubmit}
              >
                {updateLoading ? "Updating..." : "Update Product"}
              </button>

              <button
                className="p-2 sm:p-4 text-xs md:text-xl w-full text-center font-bold text-white rounded-lg bg-red-700 hover:bg-red-600 shadow-lg shadow-red-500/40 transition-all duration-300"
                onClick={handleDelete}
              >
                {deleteLoading ? "Deleting..." : "Delete Product"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
