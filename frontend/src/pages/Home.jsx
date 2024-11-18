import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "@redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <div className="bg-gray-900 min-h-screen h-full">
      <div className=" max-w-screen-2xl mx-auto">
        {!keyword ? <Header /> : null}
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant="danger">
            {isError?.data.message || isError.error}
          </Message>
        ) : (
          <>
            <div className="flex justify-between items-center pl-[80px] sm:pl-[90px] lg:pl-[120px] pr-3 2xl:pl-0">
              <h1 className="mt-[10rem] text-white text-xl font-bold lg:text-[3rem]">
                Special Products
              </h1>

              <Link
                to="/shop"
                className="bg-pink-600 font-bold rounded-md py-1 px-3 text-white mt-[10rem]"
              >
                Shop
              </Link>
            </div>

            <div>
              <div className="pl-[80px] sm:pl-[85px] lg:pl-[120px] pr-3 2xl:pl-0 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-1 md:gap-3 py-5 w-full">
                {data.products.map((product) => (
                  <div key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
