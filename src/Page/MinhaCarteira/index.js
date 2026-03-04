import React, { useEffect, useState, useMemo } from 'react';
import { Box, Container, Typography, Stack, Grid, Paper, Chip, Divider, Skeleton, Alert } from '@mui/material';
import { ShieldCheck, Download, Calendar, Ticket, CreditCard, AlertTriangle, XCircle, IdCard, Info } from 'lucide-react';
import { getInfoAlunoByCpf, getUserCarteirinhaByCpfPngApi } from '../../Api';
import Cookies from "js-cookie";
import './styleMinhaCarteira.css';
import { getWalletStatus } from './getWalletStatus';
import CardInfoCarteira from './CardInfoCarteira';
import Header from '../../components/Header';
import fundoeduc1 from '../../assets/fundoeduc1.png';
import Footer from '../../components/Footer';
import BeneficiosEAutenticacao from './BeneficiosEAutenticacao';
import CardValidacaoDigital from './CardValidacaoDigital';

// --- SUB-COMPONENTE: BADGE DE STATUS ---


export default function MinhaCarteira() {
    const cpf = Cookies.get("cpf");
    const [userData, setUserData] = useState(null);
    const [imagem, setImagem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageReady, setImageReady] = useState(false);

    useEffect(() => {
        async function loadData() {
            try {
                const res = await getInfoAlunoByCpf({ cpf });
                setUserData(res.data);
                console.log(res.data);

                const imgRes = await getUserCarteirinhaByCpfPngApi({ cpf });
                setImagem(URL.createObjectURL(imgRes.data));
            } catch (err) {
                setImagem('https://via.placeholder.com/320x200.png?text=Erro+ao+Carregar');
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [cpf]);

    // Memo para calcular status apenas quando userData mudar
    const walletStatus = useMemo(() => {
        return userData ? getWalletStatus(userData.validadeCarteirinha) : 'loading';
    }, [userData]);

    if (loading) return <Skeleton variant="rectangular" height="100vh" />;

    return (
        <Box className="main-viewport-modern" >
            <Header userName={userData?.nome} />

            <Container maxWidth="xl" className="content-container-modern" sx={{ py: 4 }}>
                <Grid container spacing={4} justifyContent="center">

                    {/* LINHA 1 - O Bloco Unificado (Imagem + Info) */}
                    <Grid item xs={12} lg={10}>
                        <Paper
                            elevation={0}
                            className="info-panel-glass"
                            sx={{
                                p: { xs: 2, md: 4 },
                                borderRadius: '32px',
                                border: '1px solid rgba(255,255,255,0.3)',
                                overflow: 'hidden'
                            }}
                        >
                            <Grid container spacing={4} alignItems="center">
                                {/* LADO ESQUERDO: IMAGEM CENTRALIZADA */}
                                <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Box className="perspective-wrapper" sx={{ width: '100%', maxWidth: '380px' }}>
                                        <div className="image-contain" style={{ margin: '0 auto' }}>
                                            <img
                                                src={imagem}
                                                onLoad={() => setImageReady(true)}
                                                className="wallet-img-clean"
                                                alt="Carteira"
                                                style={{ width: '100%', height: 'auto', display: 'block' }}
                                            />
                                        </div>
                                    </Box>
                                </Grid>

                                {/* LADO DIREITO: INFO (Sem o Paper interno, para não duplicar bordas) */}
                                <Grid item xs={12} md={7}>
                                    <CardInfoCarteira
                                        userData={userData}
                                        walletStatus={walletStatus}
                                        imageReady={imageReady}
                                        isInsideUnifiedPaper={true} // Passamos uma prop para avisar que já está dentro de um Paper
                                    />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* LINHA 2 - BENEFÍCIOS (Abaixo do bloco unificado) */}
                    <Grid item xs={12} lg={10}>
                        <CardValidacaoDigital cpf={userData?.cpf} />
                    </Grid>
                    <Grid item xs={12} lg={10}>
                        <BeneficiosEAutenticacao codId={userData?.codId} />
                    </Grid>

                </Grid>
            </Container>
            <Footer />
        </Box>
    );
}
