import { useQuery } from "react-query";
import ErrorMessage from "../../components/ui/errorMessage/error-message.ui.component";
import Spinner from "../../components/ui/spinner/spinner.ui.component";
import { getData } from "../../utils/lib/getData";
import ProductCard from "./product-card";
const ProductsPage = () => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => getData("/products"),
    queryKey: ["products"],
  });
  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products?.payload?.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
        {isLoading && (
          <div className="flex justify-center items-center py-4">
            <Spinner />
          </div>
        )}

        {!isLoading && products?.payload?.length === 0 && (
          <div className="flex justify-center items-center py-4">
            <ErrorMessage msg="No data found" />
          </div>
        )}
        {isError && (
          <div className="flex justify-center items-center py-4">
            <ErrorMessage msg={error.message} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
