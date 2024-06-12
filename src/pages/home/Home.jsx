import Products from "../../components/products/Products";
import useFetch from "../../hooks/useFetch";

const Home = () => {
  let { data, loading, error } = useFetch("/products");
  console.log(data);
  return (
    <div className="home">
      <h2>Home</h2>
      <Products data={data} />
    </div>
  );
};
export default Home;
