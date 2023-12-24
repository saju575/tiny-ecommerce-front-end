import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../layout/root.layout";
import ActivateUserAccount from "../pages/activate-user/activate-user.page";
import LoginPage from "../pages/login/login.page";
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
      </Route>
    </>
  )
);
