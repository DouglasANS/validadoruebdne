import { create } from 'zustand'
import { immer } from "zustand/middleware/immer";

export const useStorageValidarCarteira = create(immer(set => ({
    currentUser: {},
    loaders: {},
    dispatch: {
        setCurrentUser: (payload) => set(state => {
            state.currentUser = payload
        }),
    }
})))