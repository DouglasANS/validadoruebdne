import React, { useState } from 'react'; // 1. Importe o useState
import {
    Box, Typography, Stack, Paper, Divider,
    Button, useTheme, useMediaQuery, Alert, Grid, CircularProgress
} from '@mui/material';
import {
    Calendar, Ticket, ShieldCheck, AlertTriangle,
    XCircle, Download, Hash, School, GraduationCap,
    User, Fingerprint, IdCard
} from 'lucide-react';
import { generatePdfCarteirinhaDigitalApi } from '../../Api';

// --- SUB-COMPONENTE: BADGE DE STATUS ---
const StatusBadge = ({ status }) => {
    const config = {
        active: { label: "DOCUMENTO ATIVO", color: "#2e7d32", bg: "#e8f5e9" },
        warning: { label: "RENOVAÇÃO PENDENTE", color: "#ed6c02", bg: "#fff3e0" },
        expired: { label: "DOCUMENTO EXPIRADO", color: "#d32f2f", bg: "#ffebee" },
        loading: { label: "VERIFICANDO...", color: "#757575", bg: "#f5f5f5" }
    };
    const current = config[status] || config.loading;

    return (
        <Box sx={{
            bgcolor: current.bg,
            color: current.color,
            px: 2, py: 0.5,
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: '900',
            letterSpacing: '0.5px',
            border: `1px solid ${current.color}40`,
            display: 'flex',
            alignItems: 'center',
            gap: 1
        }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: current.color }} />
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
    
    // 2. Estado de loading para o botão
    const [isDownloading, setIsDownloading] = useState(false);

    // 3. Lógica de download com bloqueio
    const downloadPdfDigital = async () => {
        if (isDownloading) return;

        try {
            setIsDownloading(true);
            
            // Chama a API que explicamos anteriormente (que deve tratar o Blob)
            await generatePdfCarteirinhaDigitalApi({ cpf: userData.cpf });
            
        } catch (error) {
            console.error("Erro ao baixar PDF:", error);
            // Aqui você pode adicionar um toast de erro se desejar
        } finally {
            // Pequeno delay para garantir que o navegador iniciou o processo antes de liberar
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
            <Stack spacing={4}>
                {/* CABEÇALHO COM STATUS */}
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

                {/* GRID DE INFORMAÇÕES DO ALUNO */}
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <DetailItem icon={GraduationCap} label="Curso" value={userData?.curso} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DetailItem icon={Hash} label="Código de Uso" value={userData?.codigoUso} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DetailItem icon={Fingerprint} label="CPF" value={userData?.cpf} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DetailItem icon={IdCard} label="RG" value={userData?.rg} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DetailItem icon={Calendar} label="Nascimento" value={userData?.dataNascimento} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DetailItem icon={Ticket} label="Escolaridade" value={userData?.escolaridade} />
                    </Grid>
                </Grid>

                <Divider />

                {/* ALERTAS CONTEXTUAIS */}
                {walletStatus === 'warning' && (
                    <Alert severity="warning" variant="outlined" sx={{ borderRadius: '16px', border: '2px solid' }}>
                        A validade da sua carteira é até <strong>{userData?.validadeCarteirinha}</strong>.
                        Acesse o portal para renovação.
                    </Alert>
                )}

                {/* AÇÕES NO RODAPÉ */}
                <Stack direction={isMobile ? "column" : "row"} spacing={2} sx={{ mt: 'auto' }}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={downloadPdfDigital}
                        size="large"
                        // Mostra o spinner se estiver baixando, senão o ícone de download
                        startIcon={isDownloading ? <CircularProgress size={20} color="inherit" /> : <Download size={22} />}
                        // Desativa se: não tiver imagem, estiver expirado OU se já estiver baixando
                        disabled={!imageReady || walletStatus === 'expired' || isDownloading}
                        sx={{
                            borderRadius: '16px',
                            py: 2,
                            bgcolor: '#53C593',
                            fontWeight: '800',
                            fontSize: '1rem',
                            boxShadow: '0 10px 20px rgba(83, 197, 147, 0.2)',
                            '&:hover': { bgcolor: '#47b686' },
                            '&:disabled': { bgcolor: '#ccc' }
                        }}
                    >
                        {isDownloading 
                            ? 'GERANDO ARQUIVO...' 
                            : walletStatus === 'expired' 
                                ? 'DOWNLOAD BLOQUEADO' 
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