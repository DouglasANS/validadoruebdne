import { create } from 'zustand'
import { immer } from "zustand/middleware/immer";

export const useCursosStorage = create(immer(set => ({
    dados: {
        cursosTotais: [],
        cursosDoEstudante: [],
        selectedCurso: [],
        isMatriculado: false,
        selectedAula: [],
    },
    loaders: {},
    dispatch: {
        setCursosTotais: (payload) => set(state => {
            state.dados.cursosTotais = payload
        }),
        setCursosDoEstudante: (payload) => set(state => {
            state.dados.cursosDoEstudante = payload
        }),
        setSelectedCurso: (payload) => set(state => {
            state.dados.selectedCurso = payload
        }),
        setIsMatriculado: (payload) => set(state => {
            state.dados.isMatriculado = payload
        }),
        setSelectedAula: (payload) => set(state => {
            state.dados.selectedAula = payload
        }),
    }
})))