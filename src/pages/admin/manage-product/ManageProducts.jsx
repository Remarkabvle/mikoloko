import useFetch from "../../../hooks/useFetch";
import Products from "../../../components/products/Products";

const ManageProducts = () => {
  let { data, loading, error } = useFetch("/products");

  return (
    <div>
      <h2>ManageProducts</h2>
      <Products isAdmin={true} data={data} />
    </div>
  );
};

export default ManageProducts;
