import { useFormik } from "formik";
import { useContext, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaLock, FaUser } from "react-icons/fa";
import { useMutation } from "react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext, actionTypes } from "../../providers/user.provider";
import { postData } from "../../utils/lib/postData";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email"),
  password: Yup.string().required("Please enter your password").min(6),
});

const LoginPage = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useContext(UserContext);

  const from = location.state?.from?.pathname || "/";

  /* 
    react query
  */

  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: (data) => postData("/user/auth/login", data),
    onSuccess: async (data) => {
      dispatch({ type: actionTypes.SET_USER, payload: data.payload });

      navigate(from, { replace: true });
    },
  });

  // formik
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      try {
        await mutateAsync({ email, password });
      } catch (error) {
        // console.log(error)
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="container mx-auto">
      <div className="mx-auto mt-20 md:w-[90%] lg:w-4/6">
        <div className="grid-cols-2 shadow-2xl md:grid">
          <div className="bg-[#00a8ff] h-[576px] relative hidden md:block"></div>
          <div className="flex flex-col justify-between h-[576px] ">
            <div className="p-10 md:mt-20">
              <div className="text-2xl font-medium text-center uppercase sm:p-5">
                Login
              </div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col justify-center space-y-2">
                  <div className="relative">
                    <FaUser className="absolute w-5 h-5 ml-2 top-3" />

                    <input
                      name="email"
                      type="text"
                      className="w-full p-3 border-b-2 pl-9 placeholder:text-black outline-0"
                      placeholder="Email Address"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {errors.email && touched.email && (
                      <span className="text-red pt-2 block">
                        {errors.email}
                      </span>
                    )}
                  </div>
                  <div className="mb-3">
                    <div className="relative border-b-2">
                      <FaLock className="absolute w-5 h-5 ml-2 top-3" />

                      <input
                        type={!show ? "password" : "text"}
                        className="w-full p-3 px-9 placeholder:text-black outline-0"
                        placeholder="Password"
                        name="password"
                        id="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                      />

                      {!show ? (
                        <AiOutlineEyeInvisible
                          className="absolute bottom-3 right-2 z-1 cursor-pointer"
                          size={20}
                          onClick={() => setShow(true)}
                        />
                      ) : (
                        <AiOutlineEye
                          className="absolute bottom-3 right-2 z-1 cursor-pointer"
                          size={20}
                          onClick={() => setShow(false)}
                        />
                      )}
                    </div>
                    {errors.password && touched.password && (
                      <span className="text-red pt-2 block">
                        {errors.password}
                      </span>
                    )}
                  </div>
                </div>
                <br />
                {isError && error && (
                  <div className="mt-4 text-red text-sm text-center">
                    {error.message}
                  </div>
                )}
                <br />
                <div className="flex space-x-2">
                  <p>Don&apos;t have any account?</p>{" "}
                  <Link className="underline text-blue-500" to={"/signup"}>
                    Signup
                  </Link>
                </div>
                <br />
                <div className="flex items-center justify-between">
                  <div className="text-[#00a8ff]"></div>
                  <button
                    type="submit"
                    className={`p-2 px-4 text-white bg-[#00a8ff] rounded-3xl ${
                      isLoading ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                    disabled={isLoading ? true : false}
                  >
                    LOGIN
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
