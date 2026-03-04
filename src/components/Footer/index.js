import React from 'react';
import { Box, Container, Typography, Stack, Link, Divider, Grid } from '@mui/material';
import { ShieldCheck, Copyright } from 'lucide-react';
import logo_icp from '../../assets/logo_icp.png'
import logo_iti from '../../assets/logo_iti.png'
export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <Box
            component="footer"
            sx={{
                mt: 'auto',
                py: { xs: 6, md: 5 }, // Aumentado para dar mais presença
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
                                {/* Substitua o 'src' pelo caminho real das suas imagens */}
                                <Box
                                    component="img"
                                    src={logo_iti}
                                    alt="Logo ITI"
                                    sx={{ height: 70, filter: 'grayscale(100%)', opacity: 0.7, '&:hover': { opacity: 1, filter: 'none' }, transition: '0.3s' }}
                                />
                                <Box
                                    component="img"
                                    src={logo_icp}
                                    alt="Logo ICP-Brasil"
                                    sx={{ height: 70, filter: 'grayscale(100%)', opacity: 0.7, '&:hover': { opacity: 1, filter: 'none' }, transition: '0.3s' }}
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
                                território nacional, emitido mediante certificação digital padrão
                                <strong> ICP-Brasil</strong> e em total conformidade com as normas de
                                certificação do <strong>ITI</strong> (Instituto Nacional de Tecnologia da Informação).
                            </Typography>
                        </Stack>
                    </Grid>

                    {/* BRAND E LINKS DE APOIO */}
                    <Grid item xs={12} md={6}>
                        <Stack spacing={3} alignItems={{ xs: 'center', md: 'flex-end' }}>
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

                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography variant="body2" fontWeight="900" sx={{ color: '#53C593' }}>
                                    UEB <span style={{ color: '#1a1a1a' }}>Carteirinha</span>
                                </Typography>
                                <Divider orientation="vertical" flexItem sx={{ height: 15 }} />
                                <Typography variant="caption" color="text.disabled" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>

                                </Typography>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4, opacity: 0.5 }} />

                <Typography
                    variant="caption"
                    display="block"
                    textAlign="center"
                    color="text.disabled"
                    sx={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700 }}
                >
                    <Copyright size={12} /> {year} — Todos os direitos reservados.
                </Typography>
            </Container>
        </Box>
    );
}