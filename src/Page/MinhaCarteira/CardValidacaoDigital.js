import React, { useState } from 'react';
import {
    Box, Typography, Paper, Button, Stack,
    CircularProgress, Divider, useTheme, Tooltip
} from '@mui/material';
import { ShieldCheck, FileCheck, Download, Copy, Check } from 'lucide-react';
import { generatePdfValidadorDigitalApi } from '../../Api';

export default function CardValidacaoDigital({ codId, cpf, walletStatus }) {
    const codPem = `-----BEGIN CERTIFICATE-----
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
-----END CERTIFICATE-----`;

    const [isGenerating, setIsGenerating] = useState(false);
    const [copied, setCopied] = useState(false);
    const theme = useTheme();

    const handleCopyPem = () => {
        navigator.clipboard.writeText(codPem);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = async () => {
        // Segurança extra: se estiver expirado, interrompe a execução
        if (walletStatus === 'expired') return;

        setIsGenerating(true);
        try {
            await generatePdfValidadorDigitalApi({ cpf });
        } catch (error) {
            console.error("Erro na validação:", error);
        } finally {
            setTimeout(() => setIsGenerating(false), 800);
        }
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: { xs: 3, md: 4 },
                borderRadius: '28px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(245,255,250,0.95) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(83, 197, 147, 0.3)',
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <Box sx={{ position: 'absolute', top: 6, right: 6, color: 'rgba(83, 197, 147, 0.08)' }}>
                <ShieldCheck size={140} />
            </Box>

            <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ p: 1.5, bgcolor: '#53C59315', color: '#53C593', borderRadius: '14px' }}>
                    <FileCheck size={28} />
                </Box>
                <Box>
                    <Typography variant="h6" fontWeight="900" color="#1a1a1a" sx={{ fontSize: '1.1rem' }}>
                        Autenticidade Digital
                    </Typography>
                    <Typography variant="caption" color="text.secondary" fontWeight="600">
                        Chave Pública ICP-Brasil
                    </Typography>
                </Box>
            </Stack>

            <Divider sx={{ opacity: 0.1 }} />

            <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6, fontWeight: 500 }}>
                    Clique no quadro abaixo para copiar o certificado completo para verificação externa.
                </Typography>

                <Tooltip title={copied ? "Copiado!" : "Clique para copiar o PEM completo"}>
                    <Box
                        onClick={handleCopyPem}
                        sx={{
                            bgcolor: '#ffffff', // Fundo Branco solicitado
                            p: 2,
                            borderRadius: '16px',
                            border: '1.5px solid rgba(83, 197, 147, 0.2)',
                            cursor: 'pointer',
                            position: 'relative',
                            transition: 'all 0.2s ease-in-out',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                            '&:hover': {
                                borderColor: '#53C593',
                                boxShadow: '0 6px 16px rgba(83, 197, 147, 0.1)'
                            }
                        }}
                    >
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                            <Typography variant="caption" sx={{ fontWeight: 800, color: '#53C593', letterSpacing: 0.5 }}>
                                CERTIFICADO PEM OFICIAL
                            </Typography>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="caption" sx={{ color: 'text.disabled', fontWeight: 700 }}>
                                    {copied ? "COPIADO" : "COPIAR"}
                                </Typography>
                                {copied ? <Check size={16} color="#53C593" strokeWidth={3} /> : <Copy size={16} color="#53C593" />}
                            </Stack>
                        </Stack>

                        {/* Área com Scroll para mostrar todo o certificado */}
                        <Box sx={{
                            maxHeight: '180px',
                            overflowY: 'auto',
                            pr: 1,
                            '&::-webkit-scrollbar': { width: '4px' },
                            '&::-webkit-scrollbar-thumb': { bgcolor: '#53C59340', borderRadius: '10px' }
                        }}>
                            <Typography
                                sx={{
                                    fontFamily: '"Roboto Mono", monospace',
                                    fontSize: '0.68rem',
                                    color: '#444',
                                    whiteSpace: 'pre-wrap', // Mantém a quebra de linha do PEM
                                    wordBreak: 'break-all',
                                    lineHeight: 1.4,
                                    opacity: 0.8
                                }}
                            >
                                {codPem}
                            </Typography>
                        </Box>
                    </Box>
                </Tooltip>
            </Box>

            <Tooltip title={walletStatus === 'expired' ? "Documento expirado. Não é possível baixar o comprovante." : ""}>
                <span> {/* O span é necessário para o Tooltip funcionar em botões desabilitados */}
                    <Button
                        variant="contained"
                        fullWidth
                        // BLOQUEIO AQUI: Desabilita se estiver gerando OU se estiver expirado
                        disabled={isGenerating || walletStatus === 'expired'}
                        onClick={handleDownload}
                        startIcon={isGenerating ? <CircularProgress size={20} color="inherit" /> : <Download size={20} />}
                        sx={{
                            py: 2,
                            borderRadius: '14px',
                            bgcolor: '#53C593',
                            fontWeight: '800',
                            fontSize: '0.95rem',
                            textTransform: 'none',
                            boxShadow: '0 10px 20px rgba(83, 197, 147, 0.25)',
                            '&:hover': {
                                bgcolor: '#42a97d',
                                boxShadow: '0 12px 24px rgba(83, 197, 147, 0.35)'
                            },
                            '&.Mui-disabled': {
                                // Estilização específica para quando estiver expirado (cinza)
                                bgcolor: walletStatus === 'expired' ? '#e0e0e0' : 'rgba(83, 197, 147, 0.5)',
                                color: walletStatus === 'expired' ? '#9e9e9e' : '#fff',
                                boxShadow: 'none'
                            }
                        }}
                    >
                        {isGenerating ? 'Processando Documento...' : 'Baixar Comprovante de Validação'}
                    </Button>
                </span>
            </Tooltip>
        </Paper>
    );
}