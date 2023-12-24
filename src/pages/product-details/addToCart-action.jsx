import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { useMutation } from "react-query";
import * as Yup from "yup";
import { UserContext, actionTypes } from "../../providers/user.provider";
import cn from "../../utils/cn";
import { postData } from "../../utils/lib/postData";

const schema = Yup.object().shape({
  size: Yup.string().required(),
  color: Yup.string().required(),
  productId: Yup.string().required(),
  quantity: Yup.number().integer().min(1).required(),
  title: Yup.string().required(),
  imageUrl: Yup.string().required(),
  // .required("Number is required"),
});

const AddToCart = ({ product, imageUrl }) => {
  const { dispatch, state } = useContext(UserContext);
  const { mutateAsync } = useMutation({
    mutationFn: (data) => postData("/cart/set-cart", data),
  });
  const form = useFormik({
    enableReinitialize: true,
    validationSchema: schema,
    initialValues: {
      productId: product._id || "",
      size: "",
      color: product.color[0] || "",
      quantity: "",
      imageUrl: imageUrl || "",
      title: product.title || "",
    },
    onSubmit: async (values) => {
      dispatch({ type: actionTypes.ADD_TO_CART, payload: values });
    },
  });

  useEffect(() => {
    const send = async () => {
      await mutateAsync({ cart: state.user.cart });
    };
    send();
  }, [state.user.cart, mutateAsync]);
  return (
    <form onSubmit={form.handleSubmit} className="flex flex-col space-y-7">
      <div>
        <select
          name="size"
          value={form.values.size}
          onChange={form.handleChange}
          className="p-3 w-44 border"
        >
          <option value="" disabled>
            Select Size
          </option>
          {product?.size.map((s, index) => (
            <option key={index} value={s} className="uppercase">
              {s}
            </option>
          ))}
        </select>
        {/* <span className="absi">
          <FaChevronDown />
        </span> */}
      </div>
      <div className="flex space-x-4">
        {product.color.map((c, index) => (
          <button
            key={index}
            type="button"
            className={cn(
              "border border-dark w-8 h-8 rounded-full  focus:outline-none",
              c === form.values.color && "border-[3px] border-blue-800"
            )}
            style={{ background: `${c}` }}
            onClick={() => {
              form.setFieldValue("color", c);
            }}
          ></button>
        ))}
      </div>
      <div className="flex space-x-4">
        <input
          name="quantity"
          type="number"
          placeholder="1"
          className="border border-dark w-20 p-2"
          onChange={form.handleChange}
          value={form.values.quantity}
        />
        <button type="submit" className={cn("btn")}>
          Add To Cart
        </button>
      </div>
    </form>
  );
};

export default AddToCart;
