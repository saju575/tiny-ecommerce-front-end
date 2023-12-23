import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "../layout/root.layout";
import LoginPage from "../pages/login/login.page";
import ProductsPage from "../pages/products/products.page";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<ProductsPage />} />
      </Route>
    </>
  )
);
