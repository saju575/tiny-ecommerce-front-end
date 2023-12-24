import ReactDOM from "react-dom/client"; // Import ReactDOM from react-dom/client (not recommended, use ReactDOM.render instead)
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom"; // Import RouterProvider for routing

import "./index.css"; // Import global CSS styles
import { UserProvider } from "./providers/user.provider.jsx";
import { router } from "./router/Router.jsx"; // Import the router configuration

const queryClient = new QueryClient();

// Render the app into the root element
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </QueryClientProvider>
);
