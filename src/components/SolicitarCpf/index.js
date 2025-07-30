import React, { useState } from 'react'; 
import { getInfoAlunoByCpf, verifyEmailExist } from '../../Api';
import { notify } from '../Notify';

export default function SolicitarCpf({ text, currentRouter }) {
    const [modo, setModo] = useState('cpf'); // 'cpf' ou 'email'
    const [valor, setValor] = useState('');
    const [erro, setErro] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (modo === 'cpf') {
            const cpfLimpo = valor.replace(/\D/g, '');

            if (cpfLimpo.length !== 11) {
                return setErro('Ops! Verifique se o CPF tem 11 dígitos.');
            }

            setErro('');
            const res = await getInfoAlunoByCpf({ cpf: cpfLimpo });

            if (res.data.status === false) {
                return notify(res.data.message);
            }

            window.location.href = `/${currentRouter}/${res.data.email}`;
        } else {
            if (!valor.includes('@') || !valor.includes('.')) {
                return setErro('E-mail inválido. Verifique e tente novamente.');
            }

            const resEmail = await verifyEmailExist({ userEmail: valor })
            if (resEmail.data.status == true) {
                return window.location.href = `/${currentRouter}/${valor}`;

            }
            setErro('');

            return notify(resEmail.data.message);
            // Aqui você pode fazer uma chamada como getInfoAlunoByEmail
            // const res = await getInfoAlunoByEmail({ email: valor });

            // Simulação de sucesso: 
        }
    };

    const formatarCpf = (valor) => {
        const apenasNumeros = valor.replace(/\D/g, '').slice(0, 11);
        return apenasNumeros
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {/* <img src={code} alt="Imagem decorativa" style={styles.banner} /> */}
                <h2 style={styles.title}>Olá, estudante! 👋</h2>
                <p style={styles.subtitle}>{text}</p>

                <div style={styles.switchContainer}>
                    <button
                        style={modo === 'cpf' ? styles.switchActive : styles.switch}
                        onClick={() => {
                            setValor('')
                            setModo('cpf')
                        }}
                    >
                        CPF
                    </button>
                    <button
                        style={modo === 'email' ? styles.switchActive : styles.switch}
                        onClick={() => {
                            setValor('')
                            setModo('email')
                        }}
                    >
                        E-mail
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type={modo === 'cpf' ? 'text' : 'email'}
                        placeholder={modo === 'cpf' ? 'Ex: 123.456.789-00' : 'Ex: estudante@email.com'}
                        value={valor}
                        onChange={(e) => setValor(modo === 'cpf' ? formatarCpf(e.target.value) : e.target.value)}
                        style={styles.input}
                    />
                    {erro && <p style={styles.erro}>{erro}</p>}
                    <button type="submit" style={styles.botao}>Continuar</button>
                </form>
            </div>
        </div>
    );
}

const styles = {
    container: {
        background: 'linear-gradient(to right, #e35a0e, #68306e)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
    },
    card: {
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.15)',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '420px',
        textAlign: 'center',
    },
    banner: {
        marginTop: '10px',
        width: '180px',
        height: '70px',
        objectFit: 'cover',
    },
    title: {
        margin: '16px 0 4px',
        fontSize: '22px',
        color: '#333',
        fontWeight: 600,
    },
    subtitle: {
        padding: '0 25px',
        marginBottom: '20px',
        fontSize: '15px',
        color: '#666',
    },
    switchContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '15px',
    },
    switch: {
        padding: '8px 16px',
        backgroundColor: '#eee',
        borderRadius: '20px',
        border: 'none',
        cursor: 'pointer',
        color: '#555',
    },
    switchActive: {
        padding: '8px 16px',
        backgroundColor: '#e35a0e',
        borderRadius: '20px',
        border: 'none',
        color: '#fff',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    form: {
        padding: '0 25px 30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
        padding: '12px',
        fontSize: '16px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        textAlign: 'center',
        outline: 'none',
        transition: 'border 0.2s',
    },
    botao: {
        backgroundColor: '#e35a0e',
        color: '#fff',
        padding: '12px',
        border: 'none',
        fontSize: '16px',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    erro: {
        color: 'red',
        fontSize: '14px',
        marginTop: '-10px',
    },
};
