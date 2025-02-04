import { create } from 'zustand'
import { immer } from "zustand/middleware/immer";

export const useUserStorage = create(immer(set => ({
    user: [],
    selectedCurso: {},
    isMatriculado: false,
    cursos: [],
    cursosEstudante: [],
    selectedAula: {},
    loaders: {},
    isLogged: false,
    tipoUSer: 'ESTUDANTE',
    dispatch: {
        setUser: (payload) => set(state => {
            state.user = payload
        }),
        setCursos: (payload) => set(state => {
            state.cursos = payload
        }),
        setCursosEstudante: (payload) => set(state => {
            state.cursosEstudante = payload
        }),
        setIsMatriculado: (payload) => set(state => {
            state.isMatriculado = payload
        }),
        setSelectedCurso: (payload) => set(state => {
            state.selectedCurso = payload
        }),
        setSelectedAula: (payload) => set(state => {
            state.selectedAula = payload
        }),
        setIsLogged: (payload) => set(state => {
            state.isLogged = payload
        }),
        setTipoEstudante: (payload) => set(state => {
            state.isLogged = payload
        }),
    }
})))
