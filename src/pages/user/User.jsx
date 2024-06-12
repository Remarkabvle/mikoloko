import Products from "../../components/products/Products";
import useFetch from "../../hooks/useFetch";

const User = () => {
  let { data, loading, error } = useFetch("/products");
  console.log(data);
  return (
    <div className="User">
      <h2>User</h2>
      <Products data={data} />
    </div>
  );
};

export default User;
