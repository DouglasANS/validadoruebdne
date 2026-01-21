
export const escolaridadeAll = [
    {
        "value": "FUNDAMENTAL_COMPLETO",
        "name": "Fundamental"
    },
    {
        "value": "MEDIO_COMPLETO",
        "name": "Médio"
    },
    {
        "value": "TECNICO_COMPLETO",
        "name": "Técnico"
    },
    {
        "value": "SUPERIOR_COMPLETO",
        "name": "Superior"
    },
    {
        "value": "POS_GRADUACAO_COMPLETO",
        "name": "Pós-graduação"
    },
    {
        "value": "MESTRADO_COMPLETO",
        "name": "Mestrado"
    },
    {
        "value": "DOUTORADO_COMPLETO",
        "name": "Doutorado"
    },
]

export const escolaridadeAllBack = {
    FUNDAMENTAL_COMPLETO: "Fundamental",
    MEDIO_COMPLETO: "Médio",
    TECNICO_COMPLETO: "Técnico",
    SUPERIOR_COMPLETO: "Superior",
    POS_GRADUACAO_COMPLETO: "Pós-graduação",
    MESTRADO_COMPLETO: "Mestrado",
    DOUTORADO_COMPLETO: "Doutorado",
}


export default function linkEmbed(link) {
    if (!link) return
    function getId(url) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);

        if (match && match[2].length == 11) {
            return match[2];
        } else {
            return 'error';
        }
    }

    var myId = getId(link);
    return `//www.youtube.com/embed/${myId}`
}


export function formatDateToDDMMYYYY(dateString) {
    // Divide a data no formato "YYYY-MM-DD" em partes separadas
    const [year, month, day] = dateString.split('-');
    // Retorna a data no formato "DD/MM/YYYY"
    return `${day}/${month}/${year}`;
}


export function capitalizeInitials(text) {
    return text
        .toLowerCase() // Converte todo o texto para minúsculas
        .split(' ') // Divide o texto em palavras
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Converte a inicial para maiúscula
        .join(' '); // Junta as palavras novamente em uma string
}

export function isCarteirinhaValida(dataString) {
    if (dataString == undefined) {
        return false
    }
    // Converte "31/03/2025" em um objeto Date
    const [dia, mes, ano] = dataString.split('/');
    const dataLimite = new Date(ano, mes - 1, dia); // JS: mês começa do 0

    // Pega a data atual sem horário
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // remove hora, minuto, segundo e milissegundo

    // Compara
    return hoje <= dataLimite;
}