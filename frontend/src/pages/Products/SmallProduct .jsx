import { Link } from "react-router-dom";
import React, { useState } from "react";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to truncate the product name after 4 words
  const truncateName = (name) => {
    const words = name.split(" ");
    if (words.length > 4 && !isExpanded) {
      return words.slice(0, 4).join(" ") + "...";
    }
    return name;
  };

  return (
    <div className="py-5">
      <div className="p-2 sm:p-4 transition-all transform hover:bg-gray-900 rounded-lg bg-gray-800 shadow-md hover:shadow-2xl hover:scale-102 hover:transition-all duration-300">
        <div className="bg-gray-800 p-2 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition">
          <div  className="relative rounded-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full object-cover h-[15rem] transition-all duration-300 ease-in-out transform hover:scale-110"
            />

            <HeartIcon product={product} />
          </div>

          <div className="text-white mt-2">
            <Link to={`/product/${product._id}`}>
              <h2 className="flex flex-col md:flex-row justify-between md:items-center">
                <div className="text-lg text-[14px] xl:text-lg font-semibold">
                  {truncateName(product.name)}
                </div>
              </h2>
            </Link>
            {/* Show "See More" or "See Less" button based on the expansion state */}
            {product.name.split(" ").length > 4 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-pink-400 text-xs hover:underline mb-2"
              >
                {isExpanded ? "See Less" : "See More"}
              </button>
            )}
            <div>
              <span className="bg-pink-500 text-white text-xs font-medium px-3 py-1 rounded-lg w-fit">
                BDT {product.price}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;
