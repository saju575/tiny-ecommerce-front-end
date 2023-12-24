import { useFormik } from "formik";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaLock, FaUser } from "react-icons/fa";
import { HiPencil } from "react-icons/hi2";
import { Link } from "react-router-dom";

import { useMutation } from "react-query";
import * as Yup from "yup";
import SuccessMessage from "../../components/ui/successMessage/success-message.ui.component";
import { postData } from "../../utils/lib/postData";

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email"),
  password: Yup.string().required("Please enter your password").min(6),
});

const SignupPage = () => {
  const [show, setShow] = useState(false);

  const { mutateAsync, isSuccess, isLoading, isError, error } = useMutation({
    mutationFn: (data) => postData("/users/process-registration", data),
  });

  // formik
  const formik = useFormik({
    initialValues: { email: "", password: "", name: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password, name }) => {
      await mutateAsync({ email, password, name });
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
                Sign up
              </div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col justify-center space-y-2">
                  <div className="relative">
                    <HiPencil className="absolute w-5 h-5 ml-2 top-3" />

                    <input
                      name="name"
                      type="text"
                      className="w-full p-3 border-b-2 pl-9 placeholder:text-black outline-0"
                      placeholder="Name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {errors.name && touched.name && (
                      <span className="text-red pt-2 block">{errors.name}</span>
                    )}
                  </div>
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
                <div className="flex space-x-2">
                  <p>Already have an account?</p>{" "}
                  <Link className="underline text-blue-500" to={"/login"}>
                    Login
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
                    disabled={isLoading}
                  >
                    SIGNUP
                  </button>
                </div>
                <br />
                {isError && error && (
                  <div className="mt-4 text-red text-sm text-center">
                    {error.message}
                  </div>
                )}
                {isSuccess && (
                  <SuccessMessage
                    message={`Go to your ${formik.values.email} to activate account`}
                  />
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
