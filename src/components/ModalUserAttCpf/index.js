import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Fade, Backdrop, useTheme } from '@mui/material';
import { updateCpfByEmail } from '../../Api';

export default function ModalAtualizarCpf({ open, email, onCpfAtualizado }) {
    const [cpfInput, setCpfInput] = useState('');
    const [sucesso, setSucesso] = useState(false);
    const theme = useTheme();

    const handleSalvarCpf = async () => {
        const cpfLimpo = cpfInput.replace(/\D/g, '');

        if (cpfLimpo.length !== 11) {
            alert("CPF inválido. Digite exatamente 11 números.");
            return;
        }

        try {
            await updateCpfByEmail({ email, cpf: cpfLimpo });

            setSucesso(true);

            setTimeout(() => {
                onCpfAtualizado(cpfLimpo); // fecha modal e atualiza CPF no componente pai
            }, 1500);
        } catch (err) {
            console.error("Erro ao salvar CPF:", err);
            alert(
                "Não foi possível salvar seu CPF em nosso sistema. " +
                "Para gerar sua carteira, por favor, informe corretamente o número do seu CPF. " +
                "Caso o problema persista, entre em contato com a equipe da FUNEMG."
            );
        }
    };

    return (
        <Modal
            open={open}
            onClose={() => { }} // impedir fechamento externo
            closeAfterTransition
            disableEscapeKeyDown
            slots={{ backdrop: Backdrop }}
            slotProps={{ backdrop: { timeout: 500 } }}
        >
            <Fade in={open}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: '#fff',
                    borderRadius: '16px',
                    boxShadow: 24,
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,

                    width: '90%',        // largura base pequena (telinhas)
                    maxWidth: 400,       // limite máximo em telas grandes

                    // breakpoints para melhor ajuste
                    [theme.breakpoints.up('sm')]: {
                        width: 400,
                    },
                    [theme.breakpoints.down('xs')]: {
                        width: '95%',
                        p: 3,
                    },
                }}>
                    <Typography variant="h6">CPF não cadastrado</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Para gerar corretamente seus dados, por favor, informe seu CPF corretamente. Se precisar de ajuda, fale com a equipe da FUNEMG.
                    </Typography>
                    <TextField
                        label="CPF"
                        value={cpfInput}
                        onChange={(e) => setCpfInput(e.target.value.replace(/\D/g, ''))}
                        fullWidth
                        inputProps={{ maxLength: 11 }}
                        helperText="Apenas números (11 dígitos)"
                    />
                    <Button variant="contained" onClick={handleSalvarCpf}>
                        Salvar CPF
                    </Button>
                    {sucesso && (
                        <Box sx={{ color: 'green' }}>
                            CPF atualizado com sucesso!
                        </Box>
                    )}
                </Box>
            </Fade>
        </Modal>
    );
}
