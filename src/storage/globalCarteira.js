import { create } from 'zustand'
import { immer } from "zustand/middleware/immer";

export const useGlobalCarteira = create(immer(set => ({
    dados: {
        dataCarteira: {}, 
    },
    loaders: {},
    dispatch: {
        setDataCarteira: (payload) => set(state => {
            state.dados.dataCarteira = payload
        }),
    }
})))