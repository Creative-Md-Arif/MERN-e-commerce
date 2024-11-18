import { useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery,
} from "@redux/api/categoryApiSlice";
import AdminMenu from "./AdminMenu";
import Modal from "../../components/Modal";
import CategoryForm from "../../components/CategoryForm";
import { toast } from "react-toastify";

const CategoryList = () => {
  const { data: categories, refetch } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory, { isLoading: creating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: deleting }] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
        refetch(); // Refresh categories after creating
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating category failed, try again.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!updatingName) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await updateCategory({
        categoryId: selectedCategory._id,
        updatedCategory: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        setSelectedCategory(null);
        setUpdatingName("");
        setModalVisible(false);
        refetch(); // Refresh categories after updating
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        setSelectedCategory(null);
        setModalVisible(false);
        refetch(); // Refresh categories after deleting
      }
    } catch (error) {
      console.error(error);
      toast.error("Category deletion failed. Try again.");
    }
  };

  return (
    <div>
      <AdminMenu  />
      <div
        className="flex flex-col justify-center md:flex-row min-h-screen bg-gradient-to-r from-gray-900 to-black text-gray-200 
    shadow-xl pr-3 pl-[80px] sm:pl-[85px] lg:pl-[120px] 2xl:pl-0"
      >
        <div className="md:w-3/4 p-5 space-y-6">
          <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold text-start md:text-center">
            Manage Categories
          </h1>

          {/* Category Form */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:shadow-2xl">
            <CategoryForm
              value={name}
              setValue={setName}
              handleSubmit={handleCreateCategory}
              buttonText={creating ? "Creating..." : "Submit"}
              loading={creating}
            />
          </div>

          {/* Divider */}
          <hr className="border-gray-700" />

          {/* Category List */}
          <div className="flex flex-wrap gap-4">
            {categories?.map((category) => (
              <div key={category._id}>
                <button
                  className="bg-gray-800 border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 transition-transform transform hover:bg-pink-500 hover:text-white hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                  onClick={() => {
                    setModalVisible(true);
                    setSelectedCategory(category);
                    setUpdatingName(category.name);
                  }}
                >
                  {category.name}
                </button>
              </div>
            ))}
          </div>

          {/* Modal for Update/Delete */}
          <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-black">
              <CategoryForm
                value={updatingName}
                setValue={(value) => setUpdatingName(value)}
                handleSubmit={handleUpdateCategory}
                buttonText={updating ? "Updating..." : "Update"}
                loading={updating}
                handleDelete={handleDeleteCategory}
                deleteLoading={deleting}
              />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
