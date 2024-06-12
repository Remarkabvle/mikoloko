import { create } from "zustand";

const productStore = create((set) => ({
    products: [],
    fetchProducts : async()=> {
        let response = await fetch("https://dummyjson.com/products")
        let data = await response.json()
        set({products: data})
    }
}))

export default productStore