import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (userInfo) {
      navigate("/shipping");
    } else {
      navigate("/login?redirect=/shipping");
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="container flex justify-around items-start flex-wrap mx-auto mt-8">
            {cartItems.length === 0 ? (
              <div>
                Your cart is empty <Link to="/shop">Go To Shop</Link>
              </div>
            ) : (
              <>
                <div className="flex flex-col w-[80%]">
                  <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-enter mb-[1rem] pb-2"
                    >
                      <div className="w-[5rem] h-[5rem]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>

                      <div className="flex-1 ml-4">
                        <Link
                          to={`/product/${item._id}`}
                          className="text-pink-500"
                        >
                          {item.name}
                        </Link>

                        <div className="mt-2 text-white">{item.brand}</div>
                        <div className="mt-2 text-white font-bold">
                          $ {item.price}
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 p-4 rounded-lg shadow-lg ">
                        {/* Minus Button */}
                        <button
                          className="p-2 w-10 h-10 border rounded-full text-white bg-gray-800 hover:bg-gray-700 shadow-lg hover:shadow-xl transform transition duration-300"
                          onClick={() =>
                            item.qty > 1 && addToCartHandler(item, item.qty - 1)
                          }
                        >
                          -
                        </button>

                        {/* Display Quantity */}
                        <div className="w-12 text-center text-white text-lg font-bold border rounded-full bg-gray-900 shadow-md p-2">
                          {item.qty}
                        </div>

                        {/* Plus Button */}
                        <button
                          className="p-2 w-10 h-10 border rounded-full text-white bg-gray-800 hover:bg-gray-700 shadow-lg hover:shadow-xl transform transition duration-300"
                          onClick={() => addToCartHandler(item, item.qty + 1)}
                        >
                          +
                        </button>
                      </div>

                      <div>
                        <button
                          className="text-red-500 mr-[5rem]"
                          onClick={() => removeFromCartHandler(item._id)}
                        >
                          <FaTrash className="ml-[1rem] mt-[.5rem]" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="mt-8 w-[40rem]">
                    <div className="p-4 rounded-lg">
                      <h2 className="text-xl font-semibold mb-2">
                        Items (
                        {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                      </h2>

                      <div className="text-2xl font-bold">
                        ${" "}
                        {cartItems
                          .reduce((acc, item) => acc + item.qty * item.price, 0)
                          .toFixed(2)}
                      </div>

                      <button
                        className="bg-pink-500 mt-4 py-2 px-4 rounded-full text-lg w-full"
                        disabled={cartItems.length === 0}
                        onClick={checkoutHandler}
                      >
                        Proceed To Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
