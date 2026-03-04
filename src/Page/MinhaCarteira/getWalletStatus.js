// utils/walletHelpers.js
export const getWalletStatus = (validadeStr) => {
    if (!validadeStr) return 'loading';
    
    const [day, month, year] = validadeStr.split('/').map(Number);
    const validadeDate = new Date(year, month - 1, day);
    const hoje = new Date();
    
    // Diferença em dias
    const diffTime = validadeDate - hoje;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'expired';
    if (diffDays <= 30) return 'warning'; // Avisar com 30 dias de antecedência
    return 'active';
};