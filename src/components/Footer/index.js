import React from 'react';
import { Box, Container, Typography, Stack, Link, Divider, Grid } from '@mui/material';
import { ShieldCheck, Copyright } from 'lucide-react';
import logo_icp from '../../assets/logo_icp.png'
import logo_iti from '../../assets/logo_iti.png'
import AppleStoreButton from '../Buttons/AppleStore';
import GooglePlayButton from '../Buttons/GooglePlay';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <Box
            component="footer"
            sx={{
                mt: 'auto',
                py: { xs: 4, md: 5 },
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(12px)',
                borderTop: '1px solid rgba(0, 0, 0, 0.05)',
                width: '100%'
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4} alignItems="center">
                    {/* SEÇÃO LEGAL E SELOS */}
                    <Grid item xs={12} md={6}>
                        <Stack spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }}>
                            <Stack direction="row" spacing={3} alignItems="center">
                                <Box
                                    component="img"
                                    src={logo_iti}
                                    alt="Logo ITI"
                                    sx={{ height: 50, filter: 'grayscale(100%)', opacity: 0.7, '&:hover': { opacity: 1, filter: 'none' }, transition: '0.3s' }}
                                />
                                <Box
                                    component="img"
                                    src={logo_icp}
                                    alt="Logo ICP-Brasil"
                                    sx={{ height: 50, filter: 'grayscale(100%)', opacity: 0.7, '&:hover': { opacity: 1, filter: 'none' }, transition: '0.3s' }}
                                />
                            </Stack>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'text.secondary',
                                    textAlign: { xs: 'center', md: 'left' },
                                    maxWidth: '450px',
                                    lineHeight: 1.6,
                                    display: 'block'
                                }}
                            >
                                Documento digital de identificação estudantil com validade em todo o
                                território nacional, emitido conforme a norma do <strong>ITI</strong> e 
                                padrão <strong>ICP-Brasil</strong>.
                            </Typography>
                        </Stack>
                    </Grid>

                    {/* LINKS E AMBIENTE SEGURO */}
                    <Grid item xs={12} md={6}>
                        <Stack spacing={2} alignItems={{ xs: 'center', md: 'flex-end' }}>
                            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center">
                                <Link href="/termos-de-uso" underline="none" variant="caption" color="text.secondary" sx={{ fontWeight: 600, '&:hover': { color: '#53C593' } }}>
                                    Termos de Uso
                                </Link>
                                <Link href="/politica-de-privacidade" underline="none" variant="caption" color="text.secondary" sx={{ fontWeight: 600, '&:hover': { color: '#53C593' } }}>
                                    Políticas de Privacidade
                                </Link>
                                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: '#2e7d32' }}>
                                    <ShieldCheck size={16} />
                                    <Typography variant="caption" fontWeight="700">Ambiente Seguro</Typography>
                                </Stack>
                            </Stack>
                            <Typography variant="body2" fontWeight="900" sx={{ color: '#53C593' }}>
                                UEB <span style={{ color: '#1a1a1a' }}>Carteirinha</span>
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4, opacity: 0.5 }} />

                {/* BOTÕES DAS STORES ORGANIZADOS */}
                <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    spacing={2} 
                    justifyContent="center" 
                    alignItems="center"
                    sx={{ mb: 4 }}
                >
                    <AppleStoreButton />
                    <GooglePlayButton />
                </Stack>

                {/* COPYRIGHT FINAL */}
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={0.5} sx={{ color: 'text.disabled' }}>
                    <Copyright size={12} />
                    <Typography
                        variant="caption"
                        sx={{ 
                            fontSize: '0.65rem', 
                            textTransform: 'uppercase', 
                            letterSpacing: 1.5, 
                            fontWeight: 700 
                        }}
                    >
                        {year} — Todos os direitos reservados.
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
}