import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleReload = () => window.location.reload();
  const handleGoHome = () => navigate('/');

  // Estilos inline para manter tudo em um arquivo só, mas com cara de profissional
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f8fafc',
      color: '#1e293b',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px',
      textAlign: 'center',
    },
    icon: {
      fontSize: '80px',
      marginBottom: '20px',
      color: '#ef4444',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    message: {
      fontSize: '1.1rem',
      color: '#64748b',
      marginBottom: '30px',
      maxWidth: '500px',
    },
    buttonGroup: {
      display: 'flex',
      gap: '15px',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    primaryBtn: {
      padding: '12px 24px',
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'background 0.2s',
    },
    secondaryBtn: {
      padding: '12px 24px',
      backgroundColor: 'white',
      color: '#3b82f6',
      border: '2px solid #3b82f6',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
    },
    errorCode: {
      marginTop: '40px',
      fontSize: '0.8rem',
      color: '#94a3b8',
      backgroundColor: '#f1f5f9',
      padding: '5px 15px',
      borderRadius: '20px',
    }
  };

  return (
    <div style={styles.container}>
      {/* Ícone visual de erro */}
      <div style={styles.icon}>⚠️</div>
      
      <h1 style={styles.title}>Ops! Página indisponível</h1>
      
      <p style={styles.message}>
        Não conseguimos carregar as informações. Isso pode ser um problema temporário de conexão ou um erro no servidor.
      </p>

      <div style={styles.buttonGroup}>
        <button 
          onClick={handleReload} 
          style={styles.primaryBtn}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
        >
          Tentar novamente
        </button>
        
        <button 
          onClick={handleGoHome} 
          style={styles.secondaryBtn}
        >
          Voltar ao Início
        </button>
      </div>

      {error && (
        <div style={styles.errorCode}>
          Erro identificado: {error.statusText || error.message || "Desconhecido"}
        </div>
      )}
    </div>
  );
};

export default ErrorPage;