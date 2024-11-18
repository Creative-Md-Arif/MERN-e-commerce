import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "@redux/api/productApiSlice";
import SmallProduct from "./SmallProduct ";
import Loader from "../../components/Loader";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();

  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex flex-col lg:flex-row ">
      {/* Tabs Section */}
      <section className="lg:w-1/4 p-4 space-y-2 border-r border-gray-700">
        {["Write Your Review", "All Reviews", "Related Products"].map(
          (tab, index) => (
            <div
              key={index}
              className={`cursor-pointer text-lg py-2 px-4 rounded transition duration-200 ${
                activeTab === index + 1
                  ? "font-bold bg-yellow-300 text-gray-900"
                  : "hover:bg-gray-700 text-gray-300"
              }`}
              onClick={() => handleTabClick(index + 1)}
            >
              {tab}
            </div>
          )
        )}
      </section>

      {/* Tab Content Section */}
      <section className="lg:w-3/4 p-4">
        {/* Write Your Review */}
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <div className="my-4">
                  <label
                    htmlFor="rating"
                    className="block text-xl mb-2 text-white"
                  >
                    Rating
                  </label>
                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 border rounded-lg w-full lg:w-2/3 text-gray-900"
                  >
                    <option value="">Select</option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Exceptional</option>
                  </select>
                </div>

                <div className="my-4">
                  <label
                    htmlFor="comment"
                    className="block text-xl mb-2 text-white"
                  >
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    rows="3"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border rounded-lg w-full lg:w-2/3 text-gray-900"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition duration-300"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p>
                Please{" "}
                <Link to="/login" className="text-yellow-400 underline">
                  sign in
                </Link>{" "}
                to write a review
              </p>
            )}
          </div>
        )}

        {/* All Reviews */}
        {activeTab === 2 && (
          <div className="mt-4 space-y-6">
            {product.reviews.length === 0 ? (
              <p className="text-gray-400">No Reviews</p>
            ) : (
              product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-gray-800 p-4 rounded-lg shadow-md transition hover:shadow-lg"
                >
                  <div className="flex justify-between text-gray-300 ">
                    <strong className="ml-5">{review.name}</strong>
                    <span>{review.createdAt.substring(0, 10)}</span>
                  </div>
                  <p className="ml-5 text-gray-300">{review.comment}</p>
                  <Ratings value={review.rating} />
                </div>
              ))
            )}
          </div>
        )}

        {/* Related Products */}
        {activeTab === 3 && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {!data ? (
              <Loader />
            ) : (
              data.map((product) => (
                <div key={product._id}>
                  <SmallProduct product={product} className="transition" />
                </div>
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;
