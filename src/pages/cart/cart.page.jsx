import { useContext, useEffect } from "react";
import { useMutation } from "react-query";
import { UserContext, actionTypes } from "../../providers/user.provider";
import cn from "../../utils/cn";
import { postData } from "../../utils/lib/postData";
import styles from "./cart.module.css";

const CartPage = () => {
  const { dispatch, state } = useContext(UserContext);

  const removeItem = ({ productId, color, size }) => {
    dispatch({
      type: actionTypes.REMOVE_FROM_CART,
      payload: { productId, color, size },
    });
  };
  const { mutateAsync } = useMutation({
    mutationFn: (data) => postData("/cart/set-cart", data),
  });

  useEffect(() => {
    const send = async () => {
      await mutateAsync({ cart: state.user.cart });
    };
    send();
  }, [state.user.cart, mutateAsync]);
  return (
    <div className={cn("container", styles.cart)}>
      <table className={cn(styles.table)}>
        <tr>
          <th>Product</th>
          <th>Quntity</th>
          <th>Subtotal</th>
        </tr>
        {state.user.cart.map((item, index) => {
          return (
            <tr key={index}>
              <td>
                <div className={cn(styles.cart_info)}>
                  <img src={item.imageUrl} alt="" />
                  <div className="flex flex-col justify-center">
                    <p>{item.title}</p>
                    <span>Size: {item.size}</span>
                    <span className="flex items-center space-x-2">
                      <span className="text-lg">Color:</span>
                      <div
                        className="ml-3 border w-4 h-4 rounded-full"
                        style={{ background: `${item.color}` }}
                      />
                    </span>
                    <br />
                    <span
                      className="text-red cursor-pointer"
                      onClick={() =>
                        removeItem({
                          productId: item.productId,
                          color: item.color,
                          size: item.size,
                        })
                      }
                    >
                      remove
                    </span>
                  </div>
                </div>
              </td>
              <td>
                <input type="number" value={item.quantity} min="1" readOnly />
              </td>
              <td>$50.00</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default CartPage;
