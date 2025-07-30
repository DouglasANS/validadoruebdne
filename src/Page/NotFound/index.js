import { Link } from "react-router-dom";
import error from '../../assets/error404.jpg'

const NotFound = () => {
    return (
        <div style={styles.container}> 
            <img src={error} width={400} />
            <p style={styles.message}>Ops! Página não encontrada.</p>
            <Link to="/" style={styles.button}>Voltar para o início</Link>
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        padding: "50px",
    },
    title: {
        fontSize: "100px",
        fontWeight: "bold",
        color: "#e74c3c",
    },
    message: {
        fontSize: "20px",
        marginBottom: "20px",
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        color: "#fff",
        background: "#E1560F",
        textDecoration: "none",
        borderRadius: "5px",
    }
};

export default NotFound;
