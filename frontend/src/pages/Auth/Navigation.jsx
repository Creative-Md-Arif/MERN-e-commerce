import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import {
  FaTachometerAlt,
  FaBox,
  FaListAlt,
  FaClipboardList,
  FaUsers,
  FaUser,
  FaUserCircle,
  FaSignOutAlt,
  FaAngleUp,
  FaAngleDown,
} from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "@redux/api/usersApiSlice";
import FavoritesCount from "../Products/FavoritesCount";
import { logout } from "@redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [tabOpen, setTabOpen] = useState(false);

  const toggleTab = () => {
    setTabOpen(!tabOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen transition-all duration-300 ease-in-out bg-black text-white p-4 w-16 lg:w-20 xl:w-24 flex flex-col justify-between z-50 hover:w-60 group`}
    >
      <div className="flex flex-col space-y-6 mt-8">
        <Link
          to="/"
          className="flex items-center hover:text-blue-500 transition-all duration-300 ease-in-out"
        >
          <AiOutlineHome className="flex-none" size={26} />
          <span className="ml-4 opacity-0 group-hover:opacity-100 transform transition-all duration-300 ease-in-out group-hover:translate-x-2 text-sm font-semibold">
            Home
          </span>
        </Link>
        <Link
          to="/shop"
          className="flex items-center hover:text-green-500 transition-all duration-300 ease-in-out"
        >
          <AiOutlineShopping className="flex-none" size={26} />
          <span className="ml-4 opacity-0 group-hover:opacity-100 transform transition-all duration-300 ease-in-out group-hover:translate-x-2 text-sm font-semibold">
            Shop
          </span>
        </Link>
        <Link
          to="/cart"
          className="flex items-center hover:text-yellow-500 transition-all duration-300 ease-in-out"
        >
          <div className="relative flex">
            <AiOutlineShoppingCart className="flex-none" size={26} />
            <span className="ml-4 opacity-0 group-hover:opacity-100 transform transition-all duration-300 ease-in-out group-hover:translate-x-2 text-sm font-semibold">
              Cart
            </span>
            <div className="absolute -top-2 left-5">
              <span className="text-sm font-semibold">
                {cartItems.length > 0 && (<span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>)}
              </span>
            </div>
          </div>
        </Link>
        <div>
          <Link
            to="/favorite"
            className="flex items-center hover:text-red-500 transition-all duration-300 ease-in-out"
          >
            <div className="relative flex">
              <FaHeart className="flex-none" size={26} />

              <span className="ml-4 opacity-0 group-hover:opacity-100 transform transition-all duration-300 ease-in-out group-hover:translate-x-2 text-sm font-semibold">
                Favorites
              </span>
              <div className="absolute -top-[42px] left-2 ">
                <FavoritesCount />
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="relative group">
        <button
          onClick={toggleTab}
          className="flex items-center gap-2 hover:text-purple-500 transition-all duration-300 ease-in-out"
        >
          {userInfo ? (
            <div className="flex items-center ">
              <FaUser className="flex-none" size={26} />
              <span className="ml-4 opacity-0 group-hover:opacity-100 transform transition-all duration-300 ease-in-out group-hover:translate-x-2 text-sm font-semibold flex">
                {userInfo?.username}
                {userInfo && (
                  <div className="ml-1 flex items-center">
                    {tabOpen ? (
                      <FaAngleUp className="text-white" size={16} />
                    ) : (
                      <FaAngleDown className="text-white" size={16} />
                    )}
                  </div>
                )}
              </span>
            </div>
          ) : (
            <></>
          )}
        </button>

        {tabOpen && userInfo && (
          <div className="space-y-2 text-white rounded-b-md shadow-lg mt-1 py-2">
            {userInfo.isAdmin && (
              <div className="flex flex-col space-y-6 mb-8">
                <Link
                  to="/admin/dashboard"
                  className="flex items-center hover:text-lime-300 transition-all duration-300 ease-in-out"
                >
                  <FaTachometerAlt className="flex-none" size={26} />
                  <span className="ml-4 opacity-0 group-hover:opacity-100 transform transition-all duration-300 ease-in-out group-hover:translate-x-2 text-sm font-semibold">
                    DeshBorad
                  </span>
                </Link>

                <Link
                  to="/admin/productlist"
                  className="flex items-center hover:text-orange-500 transition-all duration-300 ease-in-out"
                >
                  <FaBox className="flex-none" size={26} />
                  <span className="ml-4 opacity-0 group-hover:opacity-100 transform transition-all duration-300 ease-in-out group-hover:translate-x-2 text-sm font-semibold">
                    Products
                  </span>
                </Link>

                <Link
                  to="/admin/categorylist"
                  className="flex items-center hover:text-yellow-500 transition-all duration-300 ease-in-out"
                >
                  <FaListAlt className="flex-none" size={26} />
                  <span className="ml-4 opacity-0 group-hover:opacity-100 transform transition-all duration-300 ease-in-out group-hover:translate-x-2 text-sm font-semibold">
                    Category
                  </span>
                </Link>

                <Link
                  to="/admin/orderlist"
                  className="flex items-center hover:text-teal-500 transition-all duration-300 ease-in-out"
                >
                  <FaClipboardList className="flex-none" size={26} />
                  <span className="ml-4 opacity-0 group-hover:opacity-100 transform transition-all duration-300 ease-in-out group-hover:translate-x-2 text-sm font-semibold">
                    Orders
                  </span>
                </Link>

                <Link
                  to="/admin/userlist"
                  className="flex items-center hover:text-pink-500 transition-all duration-300 ease-in-out"
                >
                  <FaUsers className="flex-none" size={26} />
                  <span className="ml-4 opacity-0 group-hover:opacity-100 transform transition-all duration-300 ease-in-out group-hover:translate-x-2 text-sm font-semibold">
                    Users
                  </span>
                </Link>
              </div>
            )}

            <Link
              to="/profile"
              className="flex items-center hover:text-emerald-500 transition-all duration-300 ease-in-out"
            >
              <FaUserCircle className="flex-none " size={26} />
              <span className="ml-4 opacity-0 group-hover:opacity-100 transform transition-all duration-300 ease-in-out group-hover:translate-x-2 text-sm font-semibold">
                Profile
              </span>
            </Link>
            <button
              onClick={logoutHandler}
              className="flex items-center hover:text-fuchsia-400 transition-all duration-300 ease-in-out"
            >
              <FaSignOutAlt className="flex-none" size={26} />
              <span className="ml-4 opacity-0 group-hover:opacity-100 transform transition-all duration-300 ease-in-out group-hover:translate-x-2 text-sm font-semibold">
                Logout
              </span>
            </button>
          </div>
        )}
      </div>

      {!userInfo && (
        <ul className="flex flex-col space-y-6 mb-8">
          <li>
            <Link
              to="/login"
              className="flex items-center hover:text-purple-500 transition-all duration-300 ease-in-out"
            >
              <AiOutlineLogin className="flex-none" size={26} />
              <span className="ml-4 opacity-0 group-hover:opacity-100 transform transition-all duration-300 ease-in-out group-hover:translate-x-2 text-sm font-semibold">
                Login
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="flex items-center hover:text-pink-500 transition-all duration-300 ease-in-out"
            >
              <AiOutlineUserAdd className="flex-none" size={26} />
              <span className="ml-4 opacity-0 group-hover:opacity-100 transform transition-all duration-300 ease-in-out group-hover:translate-x-2 text-sm font-semibold">
                Register
              </span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navigation;
