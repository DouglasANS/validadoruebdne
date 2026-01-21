import axios from "axios";

/* const getHost=(host)=>{
    const hostname = window.location.hostname
    if(hostname.includes('http://localhost:3000/')){
        return 'http://localhost:8080/'
    } 
} */

    const local = 'http://localhost:3002'
    const host = 'https://backendfunemg-backfune.alehbv.easypanel.host'

export const currentServer = host

export const registarAcessoValidarCertificado = async ({ idUser, tipo }) =>
    axios.post(`${currentServer}/api/registarAcessoValidarCertificado`, { idUser, tipo })

export const getUserByCPFAndNascimento = async ({ cpf, dataNascimento }) => { 
  return axios.post(`${currentServer}/api/getUserByCPFAndNascimento`, {
    cpf,
    data_nascimento: dataNascimento,
  },);
};

export const getImagemByUserId = async ({ id }) =>
    axios.get(`${currentServer}/api/imagem/${id}`)

export const updateCpfByEmail = async ({cpf, email}) =>
    axios.put(`${currentServer}/api/updateCpfByEmail`, {cpf, email})

export const getInfoAlunoByCpf = async ({ cpf: cpf }) =>
    axios.get(`${currentServer}/api/getUserByCPF/${cpf}`)

export const verifyEmailExist = async ({ userEmail }) =>
    axios.post(`${currentServer}/api/verifyEmailExist`, { userEmail }, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })

export const LoginUser = async (params) =>
    axios.post(`${currentServer}/usuario/login`, params,)

export const CadastrarUser = async (params) =>
    axios.post(`${currentServer}/aluno/cadastro`, params, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })
export const CadastrarEstudante = async (params) =>
    axios.post(`${currentServer}/estudante/cadastro`, params,)

export const getAllescolaridade = async (params) =>
    axios.get(`${currentServer}/aluno/escolaridade/all`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })

export const getInfoAluno = async ({ email }) =>
    axios.get(`${currentServer}/api/getUserByEmail/${email}`)

export const getAllCursos = async (params) =>
    axios.get(`${currentServer}/curso/`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })

export const getAllCursosEstudante = async (params) =>
    axios.get(`${currentServer}/estudante/cursos/info`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })


export const MatricularCurso = async ({ userId, cursoId }) =>
    fetch(`${currentServer}/estudante/${userId}/curso/${cursoId}/matricular`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json' // Se estiver enviando dados no corpo da requisição
        },
        // Se estiver enviando dados no corpo da requisição, adicione a propriedade body:
        // body: JSON.stringify({ /* dados que você deseja enviar */ })
    })

    export const desmatricularCurso = async ({ userId, cursoId }) =>
    fetch(`${currentServer}/estudante/${userId}/curso/${cursoId}/desmatricular`, {
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
    const url = `${currentServer}/estudante/aula/${idAula}/concluir`;
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
    axios.delete(`${currentServer}/estudante/delete/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })

export const editUserById = async (params) =>
    axios.put(`${currentServer}/estudante/editar`, params,  {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })


export const shortenLink = (link) => axios.get(`https://tinyurl.com/api-create.php?url=${link}`);




