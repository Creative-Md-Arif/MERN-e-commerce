import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import React, { Suspense, lazy } from "react";
import Loader from "./components/Loader";

// Lazy Loading Components
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Profile = lazy(() => import("./pages/User/Profile"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
const AdminRoute = lazy(() => import("./pages/Admin/AdminRoute"));
const UserList = lazy(() => import("./pages/Admin/UserList"));
const CategoryList = lazy(() => import("./pages/Admin/CategoryList"));
const ProductList = lazy(() => import("./pages/Admin/ProductList"));
const ProductUpdate = lazy(() => import("./pages/Admin/ProductUpdate"));
const AllProducts = lazy(() => import("./pages/Admin/AllProducts"));
const Home = lazy(() => import("./pages/Home"));
const Favorites = lazy(() => import("./pages/Products/Favorites"));
const ProductDetails = lazy(() => import("./pages/Products/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const Shop = lazy(() => import("./pages/Shop"));
const Shipping = lazy(() => import("./pages/Orders/Shipping"));
const PlaceOrder = lazy(() => import("./pages/Orders/PlaceOrder"));
const Order = lazy(() => import("./pages/Orders/Order"));
const UserOrder = lazy(() => import("./pages/User/UserOrder"));
const OrderList = lazy(() => import("./pages/Admin/OrderList"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route
        path="/login"
        element={
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense fallback={<Loader />}>
            <Register />
          </Suspense>
        }
      />
      <Route
        index={true}
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/favorite"
        element={
          <Suspense fallback={<Loader />}>
            <Favorites />
          </Suspense>
        }
      />
      <Route
        path="/product/:id"
        element={
          <Suspense fallback={<Loader />}>
            <ProductDetails />
          </Suspense>
        }
      />
      <Route
        path="/cart"
        element={
          <Suspense fallback={<Loader />}>
            <Cart />
          </Suspense>
        }
      />
      <Route
        path="/shop"
        element={
          <Suspense fallback={<Loader />}>
            <Shop />
          </Suspense>
        }
      />
      <Route
        path="/user-orders"
        element={
          <Suspense fallback={<Loader />}>
            <UserOrder />
          </Suspense>
        }
      />

      {/* Private Routes */}
      <Route
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            <PrivateRoute />
          </Suspense>
        }
      >
        <Route
          path="/profile"
          element={
            <Suspense fallback={<Loader />}>
              <Profile />
            </Suspense>
          }
        />
        <Route
          path="/shipping"
          element={
            <Suspense fallback={<Loader />}>
              <Shipping />
            </Suspense>
          }
        />
        <Route
          path="/placeorder"
          element={
            <Suspense fallback={<Loader />}>
              <PlaceOrder />
            </Suspense>
          }
        />
        <Route
          path="/order/:id"
          element={
            <Suspense fallback={<Loader />}>
              <Order />
            </Suspense>
          }
        />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <Suspense fallback={<Loader />}>
            <AdminRoute />
          </Suspense>
        }
      >
        <Route
          path="userlist"
          element={
            <Suspense fallback={<Loader />}>
              <UserList />
            </Suspense>
          }
        />
        <Route
          path="categorylist"
          element={
            <Suspense fallback={<Loader />}>
              <CategoryList />
            </Suspense>
          }
        />
        <Route
          path="productlist"
          element={
            <Suspense fallback={<Loader />}>
              <ProductList />
            </Suspense>
          }
        />
        <Route
          path="allproductslist"
          element={
            <Suspense fallback={<Loader />}>
              <AllProducts />
            </Suspense>
          }
        />
        <Route
          path="orderlist"
          element={
            <Suspense fallback={<Loader />}>
              <OrderList />
            </Suspense>
          }
        />
        <Route
          path="product/update/:_id"
          element={
            <Suspense fallback={<Loader />}>
              <ProductUpdate />
            </Suspense>
          }
        />
        <Route
          path="dashboard"
          element={
            <Suspense fallback={<Loader />}>
              <AdminDashboard />
            </Suspense>
          }
        />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
