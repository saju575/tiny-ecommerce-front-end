import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Spinner from "../components/ui/spinner/spinner.ui.component";
import { UserContext } from "../providers/user.provider";

const GustRoute = ({ children }) => {
  const { state } = useContext(UserContext);
  const location = useLocation();

  if (state.loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }
  if (!state.loading && state.user) {
    return <Navigate to={location.state?.from || "/"} replace />;
  }
  if (!state.loading && !state.user) {
    return children;
  }
};

export default GustRoute;
