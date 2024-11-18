import React from "react";
import { FaSpinner } from "react-icons/fa6";

const Loader = () => {
  return (
    <div className=" text-orange-600 text-5xl h-screen w-full bg-gray-900 flex flex-col justify-center items-center">
      <FaSpinner className="animate-spin" />
      <p className="text-lg  font-medium tracking-wide mt-1 text-white">Loading...</p>
    </div>
  );
};

export default Loader;