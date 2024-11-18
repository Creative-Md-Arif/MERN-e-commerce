import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/Auth/Navigation";
import Loader from "./components/Loader";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 2000); // 2 seconds
    return () => clearTimeout(timer); // Cleanup timer
  }, [""]);

  if (loading) {
    return (
      <div className="loading-screen">
         <Loader/>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="">
        <Outlet />
      </main>
    </>
  );
}

export default App;
