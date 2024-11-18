import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useProfileMutation } from "@redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Profile = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUserName(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    // Show SweetAlert2 confirmation popup
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update your profile?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (result.isConfirmed) {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
      } else {
        try {
          const res = await updateProfile({
            _id: userInfo._id,
            username,
            email,
            password,
          }).unwrap();
          dispatch(setCredentials({ ...res }));
          toast.success("Profile updated successfully");
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    }
  };

  return (
    <div className="py-5 bg-gradient-to-r from-gray-900 via-gray-800 to-black shadow-xl min-h-screen flex items-center">
      <div className="w-full flex items-center justify-center pr-3 pl-[80px] sm:pl-[85px] lg:pl-[120px] 2xl:pl-0">
        <div className="w-full lg:w-1/2 bg-gray-800 p-6 rounded-lg shadow-2xl">
          <h2 className="text-xl text-start sm:text-2xl md:text-3xl font-semibold mb-4 md:text-center text-white">
            Update Profile
          </h2>
          <form onSubmit={submitHandler}>
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter name"
                className="form-input p-4 rounded-lg w-full border-2 border-transparent bg-gray-700 text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500 transition duration-200"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter email"
                className="form-input p-4 rounded-lg w-full border-2 border-transparent bg-gray-700 text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500 transition duration-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="form-input p-4 rounded-lg w-full border-2 border-transparent bg-gray-700 text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500 transition duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                className="form-input p-4 rounded-lg w-full border-2 border-transparent bg-gray-700 text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500 transition duration-200"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-pink-500 text-white py-2 px-2 sm:px-6 text-xs sm:text-xl rounded-lg hover:bg-pink-600 focus:outline-none transition duration-200 transform hover:scale-105"
              >
                Update
              </button>

              <Link
                to="/user-orders"
                className="bg-pink-600 text-white py-2 px-2 sm:px-6 text-xs sm:text-xl rounded-lg hover:bg-pink-700 focus:outline-none transition duration-200 transform hover:scale-105"
              >
                My Orders
              </Link>
            </div>
            {loadingUpdateProfile && (
              <div className="text-white">Loading...</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
