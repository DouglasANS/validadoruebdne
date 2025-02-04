import { create } from 'zustand'
import { immer } from "zustand/middleware/immer";

export const useAllUsersStorage = create(immer(set => ({
    dados: {
        allUsers: [],
        userExclude: undefined,
        userEdit: undefined,
    },
    loaders: {},
    dispatch: {
        setAllUsers: (payload) => set(state => {
            state.dados.allUsers = payload
        }),
        setUserExclude: (payload) => set(state => {
            state.dados.userExclude = payload
        }),
        setUserEdit: (payload) => set(state => {
            state.dados.userEdit = payload
        }),
    }
})))