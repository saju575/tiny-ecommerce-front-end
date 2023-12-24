import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import cn from "../../utils/cn";
import { getData } from "../../utils/lib/getData";
import AddToCart from "./addToCart-action";
import styles from "./product-details.module.css";

const ProductDetailsPage = () => {
  const [imgUrl, setImgUrl] = useState("");
  const { id } = useParams();

  const { data: product } = useQuery({
    queryFn: () => getData(`/products/${id}`),
    queryKey: ["product", { id }],
    onSuccess: (data) => {
      setImgUrl(data.payload.imageUrl[0]);
    },
  });

  return (
    <div className="overflow-x-hidden">
      <section className={cn("px-2", styles.productDetail)}>
        <div
          className={cn(
            "container mx-auto flex md:flex-row flex-col gap-4 space-x-3",
            styles.details
          )}
        >
          <div className={cn("w-full  md:w-1/2", styles.left)}>
            <div className="flex justify-center items-center bg-[#f6f2f1] mb-5">
              <div className={cn(styles.main)}>
                <img src={imgUrl} alt="product" />
              </div>
            </div>
            <div className={cn(styles.thumbnails)}>
              {product?.payload?.imageUrl?.map((img, index) => (
                <div key={index} className={cn(styles.thumbnail)}>
                  <img
                    src={img}
                    alt="product img"
                    onClick={() => setImgUrl(img)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className={cn("w-full  md:w-1/2", styles.right)}>
            <h1>{product?.payload?.title}</h1>

            {product?.payload && (
              <AddToCart product={product.payload} imageUrl={imgUrl} />
            )}
            {/* <form action="">
              <div>
                <select name="" id="">
                  <option value="Selected Size" selected disabled>
                    Select Size
                  </option>
                  <option value="32">32</option>
                  <option value="42">42</option>
                  <option value="52">52</option>
                  <option value="62">62</option>
                </select>
                <span>
                  <FaChevronDown />
                </span>
              </div>
            </form> */}

            {/* <form action="" className={cn(styles.form)}>
              <input type="number" placeholder="1" className="border" />
              <a href="cart.html" className={cn(styles.addCart)}>
                Add To Cart
              </a>
            </form> */}
            <h3>Product Detail</h3>
            {/* <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et
              quidem voluptatibus est obcaecati modi minus.
            </p> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailsPage;
