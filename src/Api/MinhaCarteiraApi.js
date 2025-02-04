import axios from "axios";
export const LoginUserMinhaCarteira = async ({cpf,senha}) =>
    axios.post(`https://srv495671.hstgr.cloud:8080/usuario/login2`, {cpf,senha},)

