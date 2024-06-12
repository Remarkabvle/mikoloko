import React, { useState } from "react";
import axios from "../../../api";
import "./create.scss";

let initialState = {
  nomi: "",
  narxi: "",
};

const CreateProduct = () => {
  const [newProduct, setNewProduct] = useState(initialState);

  const handleCreate = (e) => {
    e.preventDefault();
    axios
      .post("/products", newProduct)
      .then((res) => {
        console.log(res);
        setNewProduct(initialState); 
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="form-container">
      <h2>CreateProduct</h2>
      <form onSubmit={handleCreate} action="">
        <input
          type="text"
          value={newProduct.nomi}
          onChange={(e) =>
            setNewProduct((prev) => ({ ...prev, nomi: e.target.value }))
          }
          placeholder="Product Name"
        />
        <input
          value={newProduct.narxi}
          type="number"
          onChange={(e) =>
            setNewProduct((prev) => ({
              ...prev,
              narxi: +e.target.value,
            }))
          }
          placeholder="Price"
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default CreateProduct;
