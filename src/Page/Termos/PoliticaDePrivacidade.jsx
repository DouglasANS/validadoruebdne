import React from 'react';

const PoliticaDePrivacidade = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Política de Privacidade</h1>

      <p style={styles.text}><strong>Última atualização:</strong> 16/07/2025</p>

      <p style={styles.text}>
        O aplicativo <strong>UEB - Carteirinha de estudante</strong> valoriza a sua privacidade e se compromete com a proteção dos dados pessoais dos usuários.
      </p>

      <h2 style={styles.subtitle}>1. Público-Alvo</h2>
      <p style={styles.text}>
        O aplicativo UEB é destinado a estudantes do ensino médio, técnico e universitário que desejam acessar a sua carteirinha estudantil digital.
      </p>

      <h2 style={styles.subtitle}>2. Dados Coletados</h2>
      <p style={styles.text}>
        O app coleta informações necessárias para validar a identidade do estudante e gerar a carteirinha digital.
      </p>

      <p style={styles.text}>
        <strong>2.1 Informações fornecidas pelo usuário:</strong><br />
        - CPF e Data de Nascimento (para autenticação e acesso).<br />
        - Senha (opcional em atualizações futuras).
      </p>

      <p style={styles.text}>
        <strong>2.2 Informações coletadas automaticamente:</strong><br />
        - Endereço IP<br />
        - Dados do dispositivo<br />
        - Dados de uso do aplicativo
      </p>

      <h2 style={styles.subtitle}>3. Finalidade da Coleta de Dados</h2>
      <p style={styles.text}>
        Os dados são utilizados para autenticação, emissão da carteirinha, funcionamento do app e cumprimento de obrigações legais.
      </p>

      <h2 style={styles.subtitle}>4. Compartilhamento de Dados</h2>
      <p style={styles.text}>
        Os dados não são vendidos ou alugados. O compartilhamento ocorre apenas em casos legais ou com parceiros tecnológicos, sob contrato de confidencialidade.
      </p>

      <h2 style={styles.subtitle}>5. Segurança dos Dados</h2>
      <p style={styles.text}>
        Adotamos criptografia, controle de acesso e outras práticas de segurança da informação.
      </p>

      <h2 style={styles.subtitle}>6. Retenção e Exclusão</h2>
      <p style={styles.text}>
        Os dados são mantidos pelo tempo necessário para as finalidades informadas ou exigidas por lei.
      </p>

      <h2 style={styles.subtitle}>7. Direitos do Usuário</h2>
      <p style={styles.text}>
        O usuário pode acessar, corrigir ou solicitar a exclusão dos seus dados pessoais conforme previsto na LGPD.
      </p>

      <h2 style={styles.subtitle}>8. Uso por Menores de Idade</h2>
      <p style={styles.text}>
        O cadastro dos dados dos menores de 18 anos ocorre por meio de processo físico ou via WhatsApp, realizado pelo responsável legal.<br /><br />
        O aplicativo UEB não realiza o cadastro direto desses dados; sua função é apenas a visualização segura das informações previamente cadastradas.<br /><br />
        Ao utilizar o aplicativo, entende-se que o responsável legal, ao ter efetuado o cadastro por esses meios, está ciente e autoriza o tratamento dos dados.
      </p>

      <h2 style={styles.subtitle}>9. Cookies e Tecnologias Semelhantes</h2>
      <p style={styles.text}>
        O aplicativo não utiliza cookies. Apenas identificadores anônimos para análise de desempenho.
      </p>

      <h2 style={styles.subtitle}>10. Alterações na Política</h2>
      <p style={styles.text}>
        A política poderá ser atualizada. Em caso de mudanças relevantes, os usuários serão notificados.
      </p>

      <h2 style={styles.subtitle}>11. Contato</h2>
      <p style={styles.text}>
        Em caso de dúvidas, solicitações ou para exercer seus direitos relacionados aos dados pessoais, entre em contato pelo nosso WhatsApp oficial: <strong>+55 31 99609-2454</strong>
      </p>

      <h2 style={styles.subtitle}>12. Legislação e Foro</h2>
      <p style={styles.text}>
        Esta política é regida pela legislação brasileira, especialmente a LGPD. Disputas serão resolvidas no foro da sede da UEB.
      </p>

      <p style={styles.footer}>UEB – Carteirinha de estudante</p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    lineHeight: '1.8',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#007145',
  },
  subtitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '25px',
    marginBottom: '10px',
    color: '#444',
  },
  text: {
    fontSize: '16px',
    marginBottom: '15px',
  },
  footer: {
    marginTop: '40px',
    fontSize: '14px',
    color: '#777',
    textAlign: 'center',
    fontStyle: 'italic',
  },
};

export default PoliticaDePrivacidade;
