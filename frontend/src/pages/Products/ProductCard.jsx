import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";
import { useState } from "react";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully");
  };

  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle function to expand or collapse the text
  const toggleName = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md hover:shadow-2xl hover:scale-102 hover:transition-all duration-300">
      <div className="p-5">
        <section className="relative overflow-hidden ">
          <div className="">
            <Link to={`/product/${p._id}`}>
              <span className="absolute bottom-3 right-3 bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                {p?.brand}
              </span>
              <img
                className="cursor-pointer w-full "
                src={p.image}
                alt={p.name}
                style={{ height: "20rem", objectFit: "cover" }}
              />
            </Link>
          </div>
          <HeartIcon product={p} />
        </section>

        <div className="p-5">
          <div>
            <h5 className="text-xl font-semibold text-white mb-2">
              {isExpanded ? p?.name : `${p?.name.substring(0, 40)}...`}
              <button className="text-pink-500 text-sm" onClick={toggleName}>
                {isExpanded ? "See Less" : "See More"}
              </button>
            </h5>
            <p className=" font-semibold text-pink-500">
              {p?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "BDT",
              })}
            </p>
          </div>
          <p className="mb-3 font-normal text-[#CFCFCF]">
            {p?.description?.substring(0, 60)} ...
          </p>
          <section className="flex justify-between items-center">
            <Link
              to={`/product/${p._id}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
            >
              Read More
              <svg
                className="w-3.5 h-3.5 ml-2"
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

            <button
              className="p-2 rounded-full"
              onClick={() => addToCartHandler(p, 1)}
            >
              <AiOutlineShoppingCart size={25} />
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
