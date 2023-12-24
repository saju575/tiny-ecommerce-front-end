import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { title, imageUrl, _id } = product || {};
  return (
    <div className="bg-white w-72 h-96 shadow-md rounded m-3">
      <div className="h-3/4 w-full">
        <img
          className="w-full h-full object-cover rounded-t"
          src={imageUrl[0]}
          alt={title}
        />
      </div>
      <div className="w-full h-1/4 p-3 flex flex-col space-y-2">
        <Link
          to={`/products/${_id}`}
          className=" hover:text-yellow-600 text-gray-700"
        >
          <span className="text-lg font-semibold uppercase tracking-wide ">
            {title}
          </span>
        </Link>
        <Link to={`/products/${_id}`} className="btn">
          Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
