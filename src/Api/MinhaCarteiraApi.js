import axios from "axios";

const local = 'http://localhost:3002'
const host = 'https://backendfunemg-backfune.alehbv.easypanel.host'

export const currentServer = host

export const LoginUserMinhaCarteira = async ({cpf,senha}) =>
    axios.post(`${currentServer}/api/loginueb`, {cpf,senha},)

