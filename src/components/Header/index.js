import React, { useState, useEffect } from 'react';
import {
    AppBar, Toolbar, Typography, Container, Box, Avatar,
    Stack, IconButton, Menu, MenuItem, ListItemIcon, Divider
} from '@mui/material';
import { Wallet, LogOut } from 'lucide-react';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom'; // Hook correto para redirecionamento

export default function Header({ userName }) {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // 1️⃣ VERIFICAÇÃO DE SEGURANÇA: Redireciona se os cookies não existirem
    useEffect(() => {
        const usuario = Cookies.get("usuario");
        const cpf = Cookies.get("cpf");
        const userId = Cookies.get("user_id");

        if (!usuario || !cpf || !userId) {
            navigate('/'); // Redireciona para o login se algum faltar
        }
    }, [navigate]);

    // 2️⃣ FUNÇÃO DE LOGOUT
    const handleLogout = () => { 
        Cookies.remove("usuario");
        Cookies.remove("cpf");
        Cookies.remove("user_id");
 
        navigate('/'); // Navega para a home
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogoutAction = () => {
        handleLogout();
        handleClose();
    };

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                color: '#1a1a1a',
                mb: 4
            }}
        >
            <Container maxWidth="xl">
                <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0 } }}>

                    {/* LOGO / TÍTULO */}
                    <Stack direction="row" alignItems="center" spacing={1.5}> 
                        <Typography variant="h6" fontWeight="700" sx={{ letterSpacing: '-0.5px' }}>
                            UEB <span style={{ color: '#53C593' }}>Carteirinha</span>
                        </Typography>
                    </Stack>

                    {/* SEÇÃO DO USUÁRIO */}
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' }, mr: 1 }}>
                            <Typography variant="subtitle2" fontWeight="600" lineHeight={1}>
                                {userName || "Estudante"}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Portal do Aluno
                            </Typography>
                        </Box>

                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ p: 0 }}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: '#f0fdf4',
                                    color: '#53C593',
                                    fontWeight: 'bold',
                                    border: '2px solid #fff',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                    transition: 'transform 0.2s',
                                    '&:hover': { transform: 'scale(1.05)' }
                                }}
                            >
                                {userName ? userName.charAt(0).toUpperCase() : 'U'}
                            </Avatar>
                        </IconButton>
                    </Stack>

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
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                                mt: 1.5,
                                borderRadius: '12px',
                                minWidth: 180,
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
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
                            <Typography variant="subtitle2" noWrap fontWeight="700">
                                {userName || "Estudante"}
                            </Typography>
                        </Box>

                        <Divider sx={{ my: 0.5, opacity: 0.6 }} />

                        <MenuItem onClick={handleLogoutAction} sx={{ color: '#d32f2f', py: 1.5 }}>
                            <ListItemIcon>
                                <LogOut size={18} color="#d32f2f" />
                            </ListItemIcon>
                            Sair da conta
                        </MenuItem>
                    </Menu>

                </Toolbar>
            </Container>
        </AppBar>
    );
}