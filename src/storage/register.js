import { create } from 'zustand'
import { immer } from "zustand/middleware/immer";

export const useRegisterStorage = create(immer(set => ({
    imagemRegister: null,
    dispatch: {
        setImagemRegister: (payload) => set(state => {
            state.imagemRegister = payload
        }),
    }
})))
