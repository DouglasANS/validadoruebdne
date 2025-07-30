import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function InvalidoCarteira() {
    const phoneNumber = "5531996092454";

    const handleRenovar = () => {
        window.open(`https://wa.me/${phoneNumber}`, "_blank");
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(to right, #e35a0e, #68306e)',
            padding: '20px',
        }}>
            <div style={{
                backgroundColor: '#fff7ed',
                border: '1px solid #fed7aa',
                borderRadius: '12px',
                padding: '32px',
                width: '100%',
                maxWidth: '440px',
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
                fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                textAlign: 'center',
            }}>
                <div style={{
                    backgroundColor: '#fde68a',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                }}>
                    <AlertTriangle color="#b45309" size={32} />
                </div>
                <h2 style={{
                    fontSize: '22px',
                    color: '#c2410c',
                    marginBottom: '12px',
                }}>
                    Documento Expirado
                </h2>
                <p style={{
                    fontSize: '15px',
                    color: '#78350f',
                    lineHeight: '1.6',
                    marginBottom: '24px',
                }}>
                    A validade da sua carteirinha de estudante expirou. Para continuar aproveitando seus benefícios, faça a renovação agora mesmo.
                </p>
                <button
                    onClick={handleRenovar}
                    style={{
                        backgroundColor: '#ea580c',
                        color: '#fff',
                        padding: '12px 24px',
                        fontSize: '15px',
                        borderRadius: '8px',
                        border: 'none',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'background 0.3s ease',
                    }}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = '#c2410c'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = '#ea580c'}
                >
                    Renovar Carteirinha
                </button>
            </div>
        </div>
    );
}
