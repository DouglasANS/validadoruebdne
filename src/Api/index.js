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

const api = axios.create({
    baseURL: currentServer,
    timeout: 45000, // 45 segundos timeout
});


export const registarAcessoValidarCertificado = async ({ idUser, tipo }) =>
    axios.post(`${currentServer}/api/registarAcessoValidarCertificado`, { idUser, tipo })

export const getUserByCPFAndNascimento = async ({ cpf, dataNascimento }) => {
    return axios.post(`${currentServer}/api/getUserByCPFAndNascimento`, {
        cpf,
        data_nascimento: dataNascimento,
    },);
};
export const getUserByCPFAndCodUsoApi = async ({ cpf, codUso }) => {
    return axios.post(`${currentServer}/api/getUserByCPFAndCodUso`, {
        cpf,
        codigo_uso: codUso,
    },);
};

export const generatePdfValidadorDigitalApi = async ({ cpf }) => {
    try {
        const response = await api.post(
            '/api/validarpdf', // Certifique-se que a rota está correta
            { cpf },
            {
                responseType: 'blob', 
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/pdf' // Indica que você espera um PDF
                }
            }
        );

        // 1. Cria o Blob garantindo o tipo 'application/pdf'
        // Isso é vital para que assinaturas digitais sejam reconhecidas por leitores de PDF
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        // 2. No Mobile (iOS/Android), abrir em nova aba é mais seguro para PDFs assinados
        // pois permite que o usuário veja o selo de assinatura antes de salvar.
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
            // Em mobile, abrimos o PDF diretamente. O usuário pode salvar pelo menu do sistema.
            window.open(url, '_blank');
        } else {
            // No Desktop, forçamos o download
            const link = document.createElement('a');
            link.href = url;
            const filename = `validacao_assinada_${cpf}.pdf`;
            link.setAttribute('download', filename);
            
            document.body.appendChild(link);
            link.click();
            
            // Limpeza
            setTimeout(() => {
                document.body.removeChild(link);
            }, 100);
        }

        // Importante: Não revogar o objeto imediatamente se abrir em nova aba
        // pois o navegador precisa da URL ativa para renderizar o PDF.
        setTimeout(() => {
            window.URL.revokeObjectURL(url);
        }, 5000); // 5 segundos é seguro

        return response;
    } catch (error) {
        console.error('Erro ao processar validação assinada:', error);
        throw error;
    }
};

export const generatePdfCarteirinhaDigitalApi = async ({ cpf }) => {
    try {
        const response = await api.post(
            '/api/generatePdfEstudante',
            { cpf },
            {
                responseType: 'blob', 
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        // 1. Cria o Blob com o tipo MIME correto (importante para mobile reconhecer como PDF)
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        // 2. Cria o elemento <a>
        const link = document.createElement('a');
        link.href = url;

        // 3. Define o nome do arquivo
        const filename = `carteirinha_${cpf}.pdf`;
        link.setAttribute('download', filename);

        // --- AJUSTES PARA MOBILE ---
        // Abre em nova aba se o download automático falhar (comum no iOS/Safari)
        link.target = '_blank'; 
        link.rel = 'noopener noreferrer';
        // ---------------------------

        // 4. Executa o clique
        document.body.appendChild(link);
        link.click();
        
        // Pequeno delay antes de remover para garantir que o navegador mobile processe o clique
        setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }, 100);

        return response;
    } catch (error) {
        console.error('Erro ao baixar o PDF:', error);
        throw error;
    }
};


export const getUserCarteirinhaByCpfPngApi = async ({ cpf }) => {
    try {
        const response = await api.post(
            '/api/generatePngEstudante',
            { cpf },
            {
                responseType: 'blob', // 🔥 IMPORTANTE: diz ao axios que a resposta é um blob
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'image/png, application/json'
                }
            }
        );


        return response;
    } catch (error) {
        console.error('Erro na API:', error);
        throw error;
    }
};

export const getImagemByUserId = async ({ id }) =>
    axios.get(`${currentServer}/api/imagem/${id}`)

export const updateCpfByEmail = async ({ cpf, email }) =>
    axios.put(`${currentServer}/api/updateCpfByEmail`, { cpf, email })

export const getInfoAlunoByCpf = async ({ cpf }) =>
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
    axios.put(`${currentServer}/estudante/editar`, params, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    })


export const shortenLink = (link) => axios.get(`https://tinyurl.com/api-create.php?url=${link}`);




