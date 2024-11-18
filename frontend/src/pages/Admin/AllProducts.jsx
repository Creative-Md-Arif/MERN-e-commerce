import { Link } from "react-router-dom";
import moment from "moment";
import {useAllProductsQuery} from "@redux/api/productApiSlice"
import AdminMenu from "./AdminMenu";

const AllProducts = () => {
  const { data: products, isLoading, isError ,   } = useAllProductsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <div className="flex items-center justify-center w-full p-5 min-h-screen h-full  bg-[#121212] shadow-xl shadow-[#000000a0] transition-all duration-300">
      <div className="">
        <div className="flex flex-col md:flex-row ">
          {/* Products Section */}
          <div className="p-3">
            <div className="ml-[2rem] text-2xl font-bold h-12 text-pink-500">
              All Products ({products.length})
            </div>
            <div className=" flex flex-col items-center justify-center">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/admin/product/update/${product._id}`}
                  className="block mb-6 overflow-hidden rounded-lg transform transition duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/50 bg-gray-800 p-4"
                >
                  <div className="flex">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-[10rem] h-[10rem] object-cover rounded-lg shadow-md transition-transform duration-300 ease-out hover:scale-105"
                    />
                    <div className="ml-4 flex flex-col justify-around text-left">
                      <div className="flex justify-between">
                        <h5 className="text-xl font-semibold mb-2 text-pink-400 w-52">
                          {product?.name}
                        </h5>
                        <p className="text-gray-400 text-xs">
                          {moment(product.createdAt).format("MMMM Do YYYY")}
                        </p>
                      </div>
                      <p className="text-gray-400 xl:w-[30rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
                        {product?.description?.substring(0, 160)}...
                      </p>
                      <div className="flex justify-between items-center">
                        <Link
                          to={`/admin/product/update/${product._id}`}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-600 to-pink-800 rounded-lg hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-pink-700 transition duration-300 ease-in-out"
                        >
                          Update Product
                          <svg
                            className="w-4 h-4 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </Link>
                        <p className="text-lg font-semibold text-pink-400">
                          BDT {product?.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          {/* Admin Menu */}
          <div>
            <AdminMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
