import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../layout/root.layout";
import ActivateUserAccount from "../pages/activate-user/activate-user.page";
import CartPage from "../pages/cart/cart.page";
import LoginPage from "../pages/login/login.page";
import ProductDetailsPage from "../pages/product-details/product-details.page";
import ProductsPage from "../pages/products/products.page";
import SignupPage from "../pages/signup/signup.page";
import GustRoute from "./gust.route";
import PrivateRoute from "./private.route";

// Create the router
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Login route */}
      <Route
        path="/login"
        element={
          <GustRoute>
            <LoginPage />
          </GustRoute>
        }
      />

      {/* Signup route */}
      <Route
        path="/signup"
        element={
          <GustRoute>
            <SignupPage />
          </GustRoute>
        }
      />

      {/* Account verification route */}
      <Route
        path="/account-verify/:id/:token"
        element={<ActivateUserAccount />}
      />

      {/* Root route */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <RootLayout />
          </PrivateRoute>
        }
      >
        {/* Products route */}
        <Route path="/" element={<ProductsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
      </Route>
    </>
  )
);
