import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorite/favoriteSlice";
import Product from "./Product";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <div className="pb-5 bg-gray-900">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-gray-900 min-h-screen  text-white w-full">
          <div className="max-w-screen-2xl mx-auto ">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-xl md:text-2xl font-bold text-center mb-8 text-white shadow-lg p-2">
                FAVORITE PRODUCTS
              </h1>
            </div>

            <div className="pl-[80px] sm:pl-[85px] lg:pl-[120px] pr-3 2xl:pl-0 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-3">
              {favorites.map((product) => (
                <div key={product._id} className=" ">
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
