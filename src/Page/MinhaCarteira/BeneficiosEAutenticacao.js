import React from 'react';
import { Box, Typography, Stack, Grid, Paper, Alert, useTheme, useMediaQuery } from '@mui/material';
import { ShieldCheck, Ticket, CreditCard, Calendar, IdCard, Info } from 'lucide-react';

const BeneficiosEAutenticacao = ({ codId }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Paper
            elevation={0}
            className="info-panel-glass" // Mantendo sua classe de estilo personalizada
            sx={{
                p: { xs: 2, md: 4 },
                borderRadius: '32px',
                border: '1px solid rgb(255, 255, 255)',
                mt: 3 // Espaçamento superior para separar do bloco de cima
            }}
        >
            <Stack spacing={4}>

                {/* TÍTULO DA SEÇÃO */}
                <Box>
                    <Typography variant="h6" fontWeight="800" sx={{ color: '#1a1a1a', mb: 0.5 }}>
                        Onde utilizar seu benefício?
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Sua carteira digital é aceita em todo território nacional.
                    </Typography>
                </Box>

                {/* GRID DE ONDE USAR */}
                {/* GRID DE ONDE USAR */}
                <Grid container spacing={1}> {/* Grid container é essencial para o Grid item funcionar */}
                    {[
                        { label: 'Cinemas e Teatros', icon: <Ticket size={24} />, color: '#E91E63' },
                        { label: 'Shows e Festivais', icon: <CreditCard size={24} />, color: '#9C27B0' },
                        { label: 'Eventos Esportivos', icon: <Calendar size={24} />, color: '#4CAF50' },
                        { label: 'Transporte Público', icon: <IdCard size={24} />, color: '#FF9800' },
                    ].map((item, index) => (
                        // xs={6} faz com que fiquem 2 cards por linha no celular
                        <Grid item xs={6} sm={3} key={index} p={0.5}>
                            <Paper
                                elevation={0}
                                sx={{
                                    borderRadius: '24px',
                                    textAlign: 'center',
                                    bgcolor: 'rgba(255,255,255,0.4)',
                                    border: '1px solid rgba(0,0,0,0.04)',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    p: { xs: 2, sm: 3 }, // Menos padding no mobile para caber melhor
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 1.5,
                                    minHeight: { xs: '140px', sm: '130px' }, // Altura mínima um pouco maior no mobile
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: '0 15px 30px rgba(0,0,0,0.06)',
                                        bgcolor: 'white',
                                        border: '1px solid #53C59340'
                                    }
                                }}
                            >
                                <Box sx={{
                                    color: item.color,
                                    display: 'flex',
                                    p: 1.5,
                                    bgcolor: `${item.color}15`,
                                    borderRadius: '16px'
                                }}>
                                    {item.icon}
                                </Box>
                                <Typography
                                    variant="subtitle2"
                                    fontWeight="800"
                                    color="text.primary"
                                    sx={{
                                        fontSize: { xs: '0.75rem', sm: '0.85rem' }, // Fonte levemente menor no mobile
                                        lineHeight: 1.2,
                                        maxWidth: '90%'
                                    }}
                                >
                                    {item.label}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* ALERTA INFORMATIVO */}
                <Alert
                    icon={<Info size={20} />}
                    sx={{
                        borderRadius: '20px',
                        bgcolor: 'rgba(0, 106, 220, 0.05)',
                        border: 'none',
                        alignItems: 'center',
                        '& .MuiAlert-message': { width: '100%' }
                    }}
                >
                    <Typography variant="caption" color="text.secondary" fontWeight="500" display="block">
                        <strong>Dica de Usabilidade:</strong> Tire um print da sua carteirinha ou baixe o PDF. Assim, você garante o acesso mesmo se estiver sem internet no evento.
                    </Typography>
                </Alert>
            </Stack>
        </Paper>
    );
};

export default BeneficiosEAutenticacao;