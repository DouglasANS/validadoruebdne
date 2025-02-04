import { create } from 'zustand'
import { immer } from "zustand/middleware/immer";

export const useFomaularioStorage = create(immer(set => ({
    dados: {
        userDataCadastro: {},
        openNotify: false,
        defaultUserData: [
            { id: 'nome', label: 'Nome', defaultValue: '' },
            { id: 'instituicao', label: 'Instituição', defaultValue: 'FUNEMG', width: '240px', margin: '0 20px 0 0 ' },
            { id: 'curso', label: 'Curso', defaultValue: '', width: '240px' },
            { id: 'cpf', label: 'CPF', defaultValue: '', width: '240px', margin: '0 20px 0 0 ' },
            { id: 'ensino', label: 'Nível de Ensino', defaultValue: '', width: '240px' },
            { id: 'rg', label: 'RG', defaultValue: '', width: '240px', margin: '0 20px 0 0 '},
            { id: 'dataNascimento', label: 'Data de nascimento', defaultValue: '', width: '240px'},
            { id: 'cod', label: 'CÓD. Uso', defaultValue: '3AZ', width: '240px', margin: '0 20px 0 0 '},
            { id: 'validade', label: 'Validade', defaultValue: '31/03/2026', width: '240px'},
            { id: 'linkQr', label: 'Link QR Code', defaultValue: '' },
            { id: 'link', label: 'Link Certificado', defaultValue: '' },
        ],
        userData: {
            "nome": "",
            "instituicao": "FUNEMG",
            "curso": "",
            "cpf": "",
            "ensino": "",
            "rg": "",
            "dataNascimento": "",
            "cod": "",
            "validade": "31/03/2026",
            "linkQr": "",
            "link": ""
        },
        device: "Pc",
        randomCod: '',
        currentImagem: '',
        selectedCarteira: 1,
    },
    loaders: {},
    dispatch: {
        setDefaultUserData: (payload) => set(state => {
            state.dados.defaultUserData = payload
        }),
        setUserDataCadastro: (payload) => set(state => {
            state.dados.userDataCadastro = payload
        }),
        setUserData: (payload) => set(state => {
            state.dados.userData = payload
        }),
        setDevice: (payload) => set(state => {
            state.dados.device = payload
        }),
        setRandomCod: (payload) => set(state => {
            state.dados.randomCod = payload
        }),
        setCurrentImagem: (payload) => set(state => {
            state.dados.currentImagem = payload
        }),
        setSelectedCarteira: (payload) => set(state => {
            state.dados.selectedCarteira = payload
        }),
        setOpenNotify: (payload) => set(state => {
            state.dados.openNotify = payload
        }),
    }
})))
