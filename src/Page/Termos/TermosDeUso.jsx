import React from 'react';

const TermosDeUso = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Termos de Uso – UEB – Carteirinha de Estudante</h1>

      <p style={styles.text}><strong>Última atualização:</strong> 16/07/2025</p>

      <h2 style={styles.subtitle}>1. Aceitação dos Termos</h2>
      <p style={styles.text}>
        Ao acessar e utilizar o aplicativo ou site <strong>UEB – Carteirinha de Estudante</strong>, o usuário concorda integralmente com este Termo de Uso e com a Política de Privacidade.
        Caso não concorde, não utilize o serviço.
      </p>

      <h2 style={styles.subtitle}>2. Descrição do Serviço</h2>
      <p style={styles.text}>
        O <strong>UEB – Carteirinha de Estudante</strong> permite que o estudante consulte e visualize sua carteirinha estudantil em formato digital, via aplicativo ou web.
        O app não realiza cadastro de dados. O cadastro é feito em outro processo, por meio físico ou via WhatsApp, diretamente com a instituição.
      </p>

      <h2 style={styles.subtitle}>3. Responsabilidades do Usuário</h2>
      <p style={styles.text}>
        Ao utilizar o UEB, o usuário:
      </p>
      <ul style={styles.list}>
        <li>Declara que as informações previamente cadastradas são verdadeiras;</li>
        <li>Compromete-se a utilizar o sistema de forma ética e conforme a legislação;</li>
        <li>Concorda em não utilizar o serviço para finalidades ilegais ou não autorizadas.</li>
      </ul>

      <h2 style={styles.subtitle}>4. Uso por Menores de Idade</h2>
      <p style={styles.text}>
        O uso por menores de 18 anos é permitido, desde que o cadastro tenha sido realizado pelo responsável legal, que ao fornecer os dados declara estar ciente e autoriza o uso e visualização das informações no app ou site.
      </p>
      <p style={styles.text}>
        O cadastro dos dados acontece fora do aplicativo, por meio físico ou contato via WhatsApp.
      </p>

      <h2 style={styles.subtitle}>5. Senha e Segurança</h2>
      <p style={styles.text}>
        Atualmente, o acesso é feito via CPF e data de nascimento. Em versões futuras, poderá ser implementado o acesso por senha, visando aumentar a segurança.
      </p>

      <h2 style={styles.subtitle}>6. Alterações e Atualizações</h2>
      <p style={styles.text}>
        A UEB pode atualizar este termo a qualquer momento. As alterações serão divulgadas no próprio app, site ou pelos canais oficiais.
      </p>

      <h2 style={styles.subtitle}>7. Limitação de Responsabilidade</h2>
      <p style={styles.text}>
        A UEB não se responsabiliza por:
      </p>
      <ul style={styles.list}>
        <li>Problemas decorrentes do uso inadequado do sistema;</li>
        <li>Interrupções ou falhas momentâneas de funcionamento;</li>
        <li>Erros causados por informações incorretas fornecidas no cadastro original.</li>
      </ul>

      <h2 style={styles.subtitle}>8. Direitos Autorais e Propriedade Intelectual</h2>
      <p style={styles.text}>
        Todos os direitos sobre o sistema, logotipo e design do UEB são protegidos por lei e pertencem à UEB ou licenciantes autorizados.
      </p>

      <h2 style={styles.subtitle}>9. Privacidade</h2>
      <p style={styles.text}>
        O tratamento de dados pessoais segue a Política de Privacidade disponível no aplicativo, site e em link público.
      </p>

      <h2 style={styles.subtitle}>10. Contato</h2>
      <p style={styles.text}>
        Em caso de dúvidas ou solicitações, entre em contato pelo nosso WhatsApp oficial: <strong>+55 31 99609-2454</strong>
      </p>

      <h2 style={styles.subtitle}>11. Foro e Legislação</h2>
      <p style={styles.text}>
        Este Termo de Uso é regido pelas leis brasileiras, em especial o Código Civil e a LGPD. Qualquer disputa será resolvida no foro da sede da UEB.
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
  list: {
    paddingLeft: '20px',
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

export default TermosDeUso;
