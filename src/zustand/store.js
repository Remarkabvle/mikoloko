import { create } from 'zustand'

const useStore = create((set) => ({
  bears: 8,
  lions: 0,
  // ====== bears ========
  inc: () => set((state) => ({ bears: state.bears + 1 })),
  reset: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
  // ====== lions ========
  incLion: (payload)=> set((state) => ({ lions: state.lions + payload }))

}))

export default useStore