import axios from "axios";

/* const getHost=(host)=>{
    const hostname = window.location.hostname
    if(hostname.includes('http://localhost:3000/')){
        return 'http://localhost:8080/'
    } 
} */

export const LoginUser = async (params) =>
    axios.post(`https://srv495671.hstgr.cloud:8080/usuario/login`, params,)

export const CadastrarUser = async (params) =>
    axios.post(`https://srv495671.hstgr.cloud:8080/aluno/cadastro`, params, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })
export const CadastrarEstudante = async (params) =>
    axios.post(`https://srv495671.hstgr.cloud:8080/estudante/cadastro`, params,)

export const getAllescolaridade = async (params) =>
    axios.get(`https://srv495671.hstgr.cloud:8080/aluno/escolaridade/all`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })

export const getInfoAluno = async ({ email }) =>
    axios.get(`https://srv495671.hstgr.cloud:8080/aluno/validacao/${email}`)

export const getAllCursos = async (params) =>
    axios.get(`https://srv495671.hstgr.cloud:8080/curso/`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })

export const getAllCursosEstudante = async (params) =>
    axios.get(`https://srv495671.hstgr.cloud:8080/estudante/cursos/info`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })


export const MatricularCurso = async ({ userId, cursoId }) =>
    fetch(`https://srv495671.hstgr.cloud:8080/estudante/${userId}/curso/${cursoId}/matricular`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json' // Se estiver enviando dados no corpo da requisição
        },
        // Se estiver enviando dados no corpo da requisição, adicione a propriedade body:
        // body: JSON.stringify({ /* dados que você deseja enviar */ })
    })

    export const desmatricularCurso = async ({ userId, cursoId }) =>
    fetch(`https://srv495671.hstgr.cloud:8080/estudante/${userId}/curso/${cursoId}/desmatricular`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json' // Se estiver enviando dados no corpo da requisição
        },
        // Se estiver enviando dados no corpo da requisição, adicione a propriedade body:
        // body: JSON.stringify({ /* dados que você deseja enviar */ })
    })


export const concluirAula = async (idAula) => {
    const token = localStorage.getItem("token");
    const url = `https://srv495671.hstgr.cloud:8080/estudante/aula/${idAula}/concluir`;
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error('Erro ao concluir aula');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao concluir aula:', error);
        throw error;
    }
};

export const excluirUserById = async (id) =>
    axios.delete(`https://srv495671.hstgr.cloud:8080/estudante/delete/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })

export const editUserById = async (params) =>
    axios.put(`https://srv495671.hstgr.cloud:8080/estudante/editar`, params,  {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })


export const shortenLink = (link) => axios.get(`https://tinyurl.com/api-create.php?url=${link}`);




