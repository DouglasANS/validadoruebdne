import React, { useState } from 'react';
import {
    Box, Typography, Stack, Paper, Divider,
    Button, useTheme, useMediaQuery, Alert, Grid, CircularProgress
} from '@mui/material';
import {
    Calendar, Ticket, ShieldCheck, AlertTriangle,
    XCircle, Download, Hash, School, GraduationCap,
    User, Fingerprint, IdCard, MessageCircle // Importei MessageCircle para o WhatsApp
} from 'lucide-react';
import { generatePdfCarteirinhaDigitalApi } from '../../Api';

// --- SUB-COMPONENTE: BADGE DE STATUS ---
const StatusBadge = ({ status }) => {
    const config = {
        active: { label: "DOCUMENTO ATIVO", color: "#2e7d32", bg: "rgba(46, 125, 50, 0.12)" },
        warning: { label: "RENOVAÇÃO PENDENTE", color: "#ed6c02", bg: "rgba(237, 108, 2, 0.12)" },
        expired: { label: "DOCUMENTO EXPIRADO", color: "#d32f2f", bg: "rgba(211, 47, 47, 0.12)" },
        loading: { label: "VERIFICANDO...", color: "#757575", bg: "rgba(117, 117, 117, 0.12)" }
    };
    const current = config[status] || config.loading;

    return (
        <Box sx={{
            bgcolor: current.bg,
            color: current.color,
            px: 2,
            py: 0.8,
            borderRadius: '12px', // Um pouco menos arredondado para um look moderno
            fontSize: '0.7rem',
            fontWeight: '800',
            height: '25px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            border: `1px solid ${current.color}30`,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            backdropFilter: 'blur(4px)',
            boxShadow: `0 4px 12px ${current.color}15`,
            transition: 'all 0.3s ease'
        }}>
            {/* Indicador de Status com Animação */}
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {/* Círculo de Pulsação (Apenas se não for loading) */}
                {status !== 'loading' && (
                    <Box sx={{
                        position: 'absolute',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: current.color,
                        animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                        '@keyframes ping': {
                            '75%, 100%': {
                                transform: 'scale(2.5)',
                                opacity: 0,
                            },
                        },
                    }} />
                )}
                
                {/* Ponto Central Sólido */}
                <Box sx={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    backgroundColor: current.color,
                    zIndex: 1 
                }} />
            </Box>

            {current.label}
        </Box>
    );
};
// --- SUB-COMPONENTE: ITEM DE DETALHE ---
const DetailItem = ({ icon: Icon, label, value }) => (
    <Stack direction="row" spacing={2} alignItems="center">
        <Box sx={{ p: 1, bgcolor: 'rgba(0, 106, 220, 0.05)', borderRadius: '10px', color: '#53C593' }}>
            <Icon size={18} />
        </Box>
        <Box>
            <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 700, fontSize: '0.65rem' }}>
                {label}
            </Typography>
            <Typography variant="body2" fontWeight="600" color="text.primary">
                {value || 'Não informado'}
            </Typography>
        </Box>
    </Stack>
);

export default function CardInfoCarteira({ userData, walletStatus, imageReady }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const firstName = userData?.nome ? userData.nome.split(' ')[0] : 'Estudante';
    const [isDownloading, setIsDownloading] = useState(false);

    // Configuração do WhatsApp
    const whatsappNumber = "5531996092454"; // Substitua pelo seu número
    const whatsappMessage = encodeURIComponent(`Olá! Gostaria de solicitar a renovação da minha cartirinha UEB. Meu CPF é ${userData?.cpf}.`);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    const downloadPdfDigital = async () => {
        if (isDownloading) return;
        try {
            setIsDownloading(true);
            await generatePdfCarteirinhaDigitalApi({ cpf: userData.cpf });
        } catch (error) {
            console.error("Erro ao baixar PDF:", error);
        } finally {
            setTimeout(() => setIsDownloading(false), 1000);
        }
    };

    return (
        <Paper
            elevation={0}
            className="info-panel-glass"
            sx={{
                p: { xs: 3, md: 5 },
                borderRadius: '32px',
                minHeight: '600px',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Stack spacing={4} sx={{ height: '100%' }}>
                {/* CABEÇALHO */}
                <Stack
                    direction={isMobile ? "column" : "row"}
                    justifyContent="space-between"
                    alignItems={isMobile ? "flex-start" : "center"}
                    spacing={2}
                >
                    <Box>
                        <Typography variant="h3" fontWeight="900" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, color: '#1a1a1a' }}>
                            {firstName}.
                        </Typography>
                        <Typography variant="body1" color="text.secondary" fontWeight="500">
                            {userData?.instituicao} — {userData?.ano}
                        </Typography>
                    </Box>
                    <StatusBadge status={walletStatus} />
                </Stack>

                <Divider />

                {/* GRID DE INFORMAÇÕES */}
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}><DetailItem icon={GraduationCap} label="Curso" value={userData?.curso} /></Grid>
                    <Grid item xs={12} sm={6}><DetailItem icon={Hash} label="Código de Uso" value={userData?.codigoUso} /></Grid>
                    <Grid item xs={12} sm={6}><DetailItem icon={Fingerprint} label="CPF" value={userData?.cpf} /></Grid>
                    <Grid item xs={12} sm={6}><DetailItem icon={IdCard} label="RG" value={userData?.rg} /></Grid>
                    <Grid item xs={12} sm={6}><DetailItem icon={Calendar} label="Nascimento" value={userData?.dataNascimento} /></Grid>
                    <Grid item xs={12} sm={6}><DetailItem icon={Ticket} label="Escolaridade" value={userData?.escolaridade} /></Grid>
                </Grid>

                <Divider />

                {/* ÁREA DE RENOVAÇÃO (AMIGÁVEL) */}
                {(walletStatus === 'expired' || walletStatus === 'warning') && (
                    <Box
                        sx={{
                            p: 3,
                            borderRadius: '24px',
                            // Gradiente suave baseado no status
                            background: walletStatus === 'expired'
                                ? 'linear-gradient(145deg, #fff5f5 0%, #fff0f0 100%)'
                                : 'linear-gradient(145deg, #fffaf2 0%, #fff4e6 100%)',
                            border: '1px solid',
                            borderColor: walletStatus === 'expired' ? 'rgba(211, 47, 47, 0.2)' : 'rgba(237, 108, 2, 0.2)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.04)',
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2.5
                        }}
                    >
                        {/* Detalhe decorativo de fundo */}
                        <Box sx={{
                            position: 'absolute', top: -10, right: -10,
                            opacity: 0.05, transform: 'rotate(-15deg)'
                        }}>
                            <MessageCircle size={100} color={walletStatus === 'expired' ? '#d32f2f' : '#ed6c02'} />
                        </Box>

                        <Stack direction="row" spacing={2} alignItems="center">
                            <Box sx={{
                                p: 1.2,
                                bgcolor: '#fff',
                                borderRadius: '12px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                display: 'flex',
                                // Animação discreta no ícone
                                animation: 'pulse 2s infinite ease-in-out',
                                '@keyframes pulse': {
                                    '0%': { transform: 'scale(1)' },
                                    '50%': { transform: 'scale(1.05)' },
                                    '100%': { transform: 'scale(1)' },
                                }
                            }}>
                                <AlertTriangle color={walletStatus === 'expired' ? '#d32f2f' : '#ed6c02'} size={24} />
                            </Box>
                            <Box>
                                <Typography variant="subtitle1" fontWeight="900" sx={{ color: '#1a1a1a', lineHeight: 1.2 }}>
                                    {walletStatus === 'expired' ? 'Documento Expirado' : 'Renovação Disponível'}
                                </Typography>
                                <Typography variant="caption" fontWeight="600" sx={{ color: walletStatus === 'expired' ? '#d32f2f' : '#ed6c02', textTransform: 'uppercase', letterSpacing: 1 }}>
                                    Ação Necessária
                                </Typography>
                            </Box>
                        </Stack>

                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, lineHeight: 1.6, pr: 2 }}>
                            Sua renovação garante a continuidade da sua **meia-entrada** e outros benefícios estudantis para 2026.
                        </Typography>

                        <Button
                            variant="contained"
                            fullWidth
                            startIcon={<MessageCircle size={20} strokeWidth={2.5} />}
                            href={whatsappUrl}
                            target="_blank"
                            sx={{
                                borderRadius: '16px',
                                textTransform: 'none',
                                fontWeight: '800',
                                py: 1.8,
                                bgcolor: '#128C7E',
                                color: '#fff',
                                fontSize: '0.9rem',
                                boxShadow: '0 6px 20px rgba(37, 211, 102, 0.3)',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    bgcolor: '#128C7E',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 8px 25px rgba(37, 211, 102, 0.4)',
                                }
                            }}
                        >
                            Solicitar Renovação via WhatsApp
                        </Button>
                    </Box>
                )}

                {/* AÇÕES NO RODAPÉ */}
                <Stack direction={isMobile ? "column" : "row"} spacing={2} sx={{ mt: 'auto' }}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={downloadPdfDigital}
                        size="large"
                        startIcon={isDownloading ? <CircularProgress size={20} color="inherit" /> : <Download size={22} />}
                        disabled={!imageReady || walletStatus === 'expired' || isDownloading}
                        sx={{
                            borderRadius: '16px',
                            py: 2,
                            bgcolor: '#53C593',
                            fontWeight: '800',
                            fontSize: '1rem',
                            boxShadow: '0 10px 20px rgba(83, 197, 147, 0.2)',
                            '&:hover': { bgcolor: '#47b686' },
                            '&:disabled': { bgcolor: '#e0e0e0', color: '#9e9e9e' }
                        }}
                    >
                        {isDownloading
                            ? 'GERANDO ARQUIVO...'
                            : walletStatus === 'expired'
                                ? 'DOWNLOAD INDISPONÍVEL'
                                : 'BAIXAR CARTEIRA PDF'}
                    </Button>
                </Stack>

                <Typography variant="caption" color="text.disabled" textAlign="center">
                    Versão Digital 2026.1
                </Typography>
            </Stack>
        </Paper>
    );
}