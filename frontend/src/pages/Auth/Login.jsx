import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch,  } from "react-redux";
import { useLoginMutation } from "@redux/api/usersApiSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();


  const submitHandler = async (e) => {
    e.preventDefault();

    // Validate email and password
    if (!email) {
      toast.error("Email is required.", { autoClose: 2000 });
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.", { autoClose: 2000 });
    } else if (!password) {
      toast.error("Password is required.", { autoClose: 2000 });
    } else if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.", {
        autoClose: 2000,
      });
    } else {
      try {
        // Attempt login if validation passes
        const res = await login({ email, password }).unwrap();
        // console.log(res);

        // Show success message
        toast.success("Login successful!", { autoClose: 1500 });

        // Dispatch credentials if login is successful
        dispatch(setCredentials({ ...res }));

       navigate("/");
      } catch (err) {
        // Check if the error is due to incorrect password
        if (err?.data?.message === "Incorrect password") {
          toast.error("Incorrect password. Please try again.", {
            autoClose: 2000,
          });
        } else if (err?.data?.message) {
          toast.error(err.data.message, { autoClose: 2000 });
        } else if (err.error) {
          toast.error(err.error, { autoClose: 2000 });
        } else {
          toast.error("Login failed. Please try again.", { autoClose: 2000 });
        }
      }
    }
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900 w-full h-screen pr-3 pl-[80px] sm:pl-[85px] flex items-center">
        <div className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 sm:w-[400px]">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form
                onSubmit={submitHandler}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>

                <button
                  disabled={isLoading}
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>
              </form>
              <div className="mt-4">
                <p className="text-white">
                  New Customer?{" "}
                  <Link
                    to="/register"
                    
                    className="text-pink-500 hover:underline"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
