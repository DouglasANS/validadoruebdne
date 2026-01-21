import axios from "axios";

const local = 'http://localhost:3002'
const host = 'https://backendfunemg-backfune.alehbv.easypanel.host'

export const currentServer = host

export const LoginUserMinhaCarteira = async ({cpf,senha}) =>
    axios.post(`${currentServer}/api/loginueb`, {cpf,senha},)

export const getImagemByUserId = async ({ id }) =>
    axios.get(`${currentServer}/api/imagem/${id}`)


export const getInfoAlunoByCpf = async ({ cpf }) =>
    axios.get(`${currentServer}/api/getUserByCPF/${cpf}`)