import { useState } from 'react';
import './Login.css';
import { FiUser, FiCalendar } from 'react-icons/fi';
import logo from '../../assets/ueb.png'
import loginimg from '../../assets/login2.png'
import ReactInputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import { notify } from '../../components/Notify';
import { getUserByCPFAndNascimento } from '../../Api';
import Cookies from "js-cookie";
import { useStorageValidarCarteira } from './StorageValidarCarteira';
import fundoeduc1 from '../../assets/fundoeduc1.png';
import logo_iti from '../../assets/logo_iti.png';
import Footer from '../../components/Footer';

const Login = () => {
    const [dataNascimento, setDataNascimento] = useState('');
    const [cpf, setCpf] = useState('');
    const [loading, setLoading] = useState(false); // 1. Novo estado de loading

    const navigate = useNavigate();
    const { setCurrentUser } = useStorageValidarCarteira(state => state).dispatch
    const expirationTime = 1;

    const handleLogin = () => {
        if (cpf.length !== 11) return notify('Preencha o CPF corretamente!');
        if (dataNascimento.length !== 10) return notify('Data de nascimento inválida.');

        const [day, month, year] = dataNascimento.split('/').map(Number);
        const date = new Date(year, month - 1, day);

        if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
            return notify('Data de nascimento inexistente.');
        }

        const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} 00:00:00.000000`;

        setLoading(true); // 2. Ativa o loading

        getUserByCPFAndNascimento({ cpf, dataNascimento: formattedDate })
            .then(resp => {
                if (resp?.data?.status === false) {
                    setLoading(false); // Desativa se der erro na regra de negócio
                    return notify(resp?.data?.message);
                }

                setCurrentUser({ ...resp?.data });
                Cookies.set("usuario", "true", { expires: expirationTime });
                Cookies.set("cpf", resp?.data?.cpf, { expires: expirationTime });
                Cookies.set("user_id", resp?.data?.id, { expires: expirationTime });
                navigate('/visualizaminhacarteira');


            })
            .catch(err => {
                setLoading(false); // 3. Desativa em caso de erro de rede
                notify('Erro ao conectar com o servidor.');
            });
    };

    const handleCpfChange = (e) => {
        const rawValue = e.target.value.replace(/\D/g, '');
        setCpf(rawValue);
    };


    return (
        <>
            <div className="container" style={{ backgroundImage: `url(${fundoeduc1})` }}>
                <div className="login-wrapper">

                    {/* LADO VISUAL - Com mais vida e card maior */}
                    <div className="visual-side">
                        <div>
                            <div className="badge">Portal Oficial UEB</div>
                            <h2>Sua identidade estudantil, agora digital.</h2>
                            <p>Acesse o ecossistema DNE e gerencie sua carteira com segurança e agilidade.</p>
                        </div>

                        {/* Esta imagem agora ganha vida com a animação de flutuação do CSS */}
                        <div className="side-illustration">
                            <img src={loginimg} alt="Ilustração Estudantil" className="logo-img2" />
                        </div>

                        <div className="benefit-item">
                            <span className="benefit-icon"><img style={{ height: '52px', width: 'auto' }} src={logo_iti} /></span>
                            <div>
                                <strong>Validação Oficial</strong>
                                <p>Padrão nacional ITI/Meia-Entrada.</p>
                            </div>
                        </div>
                    </div>

                    {/* LADO DO FORMULÁRIO */}
                    <div className="form-side">
                        <div className="brand-area">
                            <img src={logo} alt="Logo UEB" className="logo-img" />
                        </div>

                        <div className="header-text">
                            <h2 style={{ textAlign: 'center' }}>Bem-vindo</h2>
                            <p className="subtitle" style={{ textAlign: 'center' }}>Insira suas credenciais abaixo.</p>
                        </div>

                        <div className="formContainer">
                            <div className="input-container">
                                <label htmlFor="cpf">CPF</label>
                                <div className="custom-input-wrapper">
                                    <ReactInputMask
                                        id="cpf"
                                        mask="999.999.999-99"
                                        placeholder="000.000.000-00"
                                        value={cpf}
                                        onChange={handleCpfChange}
                                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                                    >
                                        {(inputProps) => <input {...inputProps} type="text" />}
                                    </ReactInputMask>
                                    <span className="input-icon"><FiUser size={20} /></span>
                                </div>
                            </div>

                            <div className="input-container">
                                <label htmlFor="nascimento">Data de Nascimento</label>
                                <div className="custom-input-wrapper">
                                    <ReactInputMask
                                        id="nascimento"
                                        mask="99/99/9999"
                                        placeholder="DD / MM / AAAA"
                                        value={dataNascimento}
                                        onChange={(e) => setDataNascimento(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                                    >
                                        {(inputProps) => <input {...inputProps} type="text" />}
                                    </ReactInputMask>
                                    <span className="input-icon"><FiCalendar size={20} /></span>
                                </div>
                            </div>

                            <button
                                onClick={handleLogin}
                                className={`btn-login ${loading ? 'btn-loading' : ''}`}
                                disabled={loading}
                            >
                                {loading ? <div className="spinner"></div> : "Acessar Minha Carteira"}
                            </button>
                        </div>

                    </div>
                </div>

            </div>
            <Footer />
        </>
    );
};

export default Login