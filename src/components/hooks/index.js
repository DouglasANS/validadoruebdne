export function gerarSequencia() {
    const caracteres = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let sequencia = '';

    // Gera os primeiros 3 caracteres numéricos
    for (let i = 0; i < 3; i++) {
        const indiceAleatorio = Math.floor(Math.random() * 10); // Apenas números
        sequencia += indiceAleatorio;
    }

    // Adiciona o hífen
    sequencia += '-';

    // Gera os próximos 4 caracteres alfanuméricos
    for (let i = 0; i < 4; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
        sequencia += caracteres.charAt(indiceAleatorio);
    }

    /* return sequencia; */
    return '3AZ';
}

export function primeiraLetraMaiuscula(str) {
    // Divide a string em palavras
    var palavras = str.replace(/\s+/g, ' ').split(' ');
    // Mapeia cada palavra, convertendo a primeira letra para maiúscula e o restante para minúscula
    var palavrasFormatadas = palavras.map(function(palavra) {
        return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
    });
    // Junta as palavras de volta em uma string
    
    var newS = palavrasFormatadas.join(' ');
    return newS.replaceAll(' ', '-')
}