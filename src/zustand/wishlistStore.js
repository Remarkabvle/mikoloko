import { create } from "zustand";

const wishlistStore = create((set) => ({
   wishlist: [],
   toggle: (payload)=> set((state) => {
    let index = state.wishlist.findIndex(el => el.id === payload.id)
    if(index < 0){
        return { wishlist: [...state.wishlist, payload] }
    }else{
        return {wishlist: state.wishlist.filter(el => el.id !== payload.id)}
    }
   })
}))

export default wishlistStore