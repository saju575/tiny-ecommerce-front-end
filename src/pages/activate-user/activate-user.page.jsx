import { FaCheckCircle } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../components/ui/spinner/spinner.ui.component";
import axios from "../../utils/axiosInstance";
const ActivateUserAccount = () => {
  const { id, token } = useParams();

  const { isLoading, isSuccess, isError } = useQuery({
    queryKey: ["activate-admin", { id, token }],
    queryFn: async () => {
      try {
        const url = `/users/activate-user/${id}/${token}`;
        const res = await axios.get(url);
        return res.data;
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    },
  });

  const renderLoading = () => {
    return <Spinner />;
  };

  const renderSuccess = () => {
    return (
      <div className="flex flex-col gap-4 justify-center">
        <FaCheckCircle className={"w-40 h-40 text-sky-400"} />
        <h1 className="text-center">Email verified successfully</h1>
        <div className="flex justify-center">
          <Link to="/login">
            <span className="bg-[#244c63ad] px-4 text-white cursor-pointer  py-2 border uppercase">
              Login
            </span>
          </Link>
        </div>
      </div>
    );
  };

  const renderError = () => {
    return <h1>404 Not Found</h1>;
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {isLoading && renderLoading()}

      {isSuccess && renderSuccess()}

      {isError && renderError()}
    </div>
  );
};

export default ActivateUserAccount;
