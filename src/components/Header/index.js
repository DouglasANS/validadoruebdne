import React, { useState, useEffect } from 'react';
import {
    AppBar, Toolbar, Typography, Container, Box, Avatar,
    Stack, Menu, MenuItem, ListItemIcon, Divider, ButtonBase
} from '@mui/material';
import { LogOut, Settings, ChevronDown, User } from 'lucide-react';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

export default function Header({ userName }) {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        const usuario = Cookies.get("usuario");
        const cpf = Cookies.get("cpf");
        const userId = Cookies.get("user_id");

        if (!usuario || !cpf || !userId) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => { 
        Cookies.remove("usuario");
        Cookies.remove("cpf");
        Cookies.remove("user_id");
        navigate('/');
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                color: '#1a1a1a',
                mb: 4
            }}
        >
            <Container maxWidth="xl">
                <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0 } }}>

                    {/* LOGO */}
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                        <Typography variant="h6" fontWeight="700" sx={{ letterSpacing: '-0.5px' }}>
                            UEB <span style={{ color: '#53C593' }}>Carteirinha</span>
                        </Typography>
                    </Stack>

                    {/* BOTÃO DE PERFIL/CONFIGURAÇÃO */}
                    <ButtonBase
                        onClick={handleClick}
                        sx={{
                            p: '6px 12px',
                            borderRadius: '50px',
                            transition: 'all 0.2s ease',
                            backgroundColor: open ? 'rgba(83, 197, 147, 0.1)' : 'rgba(0, 0, 0, 0.03)',
                            border: '1px solid',
                            borderColor: open ? '#53C593' : 'transparent',
                            '&:hover': {
                                backgroundColor: 'rgba(83, 197, 147, 0.08)',
                                transform: 'translateY(-1px)'
                            }
                        }}
                    >
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <Avatar
                                sx={{
                                    width: 32,
                                    height: 32,
                                    bgcolor: '#53C593',
                                    color: '#fff',
                                    fontSize: '0.875rem',
                                    fontWeight: '700',
                                    boxShadow: '0 2px 8px rgba(83, 197, 147, 0.3)'
                                }}
                            >
                                {userName ? userName.charAt(0).toUpperCase() : 'U'}
                            </Avatar>
                            
                            <Box sx={{ textAlign: 'left', display: { xs: 'none', sm: 'block' } }}>
                                <Typography variant="subtitle2" fontWeight="700" sx={{ lineHeight: 1.2 }}>
                                    Meu Perfil
                                </Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                                    Opções
                                </Typography>
                            </Box>

                            <ChevronDown 
                                size={18} 
                                color={open ? '#53C593' : '#666'} 
                                style={{ 
                                    transition: 'transform 0.3s',
                                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)' 
                                }} 
                            />
                        </Stack>
                    </ButtonBase>

                    {/* MENU DROPDOWN */}
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                mt: 1.5,
                                borderRadius: '16px',
                                minWidth: 200,
                                border: '1px solid rgba(0,0,0,0.08)',
                                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                                overflow: 'visible',
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 20,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                    >
                        <Box sx={{ px: 2, py: 1.5 }}>
                            <Typography variant="caption" fontWeight="700" color="text.disabled" sx={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
                                Aluno Logado
                            </Typography>
                            <Typography variant="subtitle1" fontWeight="800" noWrap>
                                {userName || "Estudante"}
                            </Typography>
                        </Box>

                        <Divider sx={{ my: 0.5, opacity: 0.6 }} />

                        <MenuItem disabled sx={{ py: 1.2 }}>
                            <ListItemIcon>
                                <Settings size={18} />
                            </ListItemIcon>
                            Configurações
                        </MenuItem>

                        <MenuItem 
                            onClick={handleLogout} 
                            sx={{ 
                                py: 1.5, 
                                color: '#d32f2f',
                                '&:hover': { backgroundColor: '#fff5f5' }
                            }}
                        >
                            <ListItemIcon>
                                <LogOut size={18} color="#d32f2f" />
                            </ListItemIcon>
                            <Typography fontWeight="600">Sair da conta</Typography>
                        </MenuItem>
                    </Menu>

                </Toolbar>
            </Container>
        </AppBar>
    );
}