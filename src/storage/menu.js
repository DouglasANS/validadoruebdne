import { create } from 'zustand'
import { immer } from "zustand/middleware/immer";

export const useMenuStorage = create(immer(set => ({
    dados: {
        selectedMenu: 'Painel'
    },
    loaders: {},
    dispatch: {
        setSelectedMenu: (payload) => set(state => {
            state.dados.selectedMenu = payload
        }),
    }
})))