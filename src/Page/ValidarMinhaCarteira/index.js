import { useState } from 'react';
import './Login.css';
import { FiUser, FiCalendar } from 'react-icons/fi';
import logo from '../../assets/ueb.png'
import loginimg from '../../assets/login2.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import ReactInputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import { getImagemByUserId } from '../../Api/MinhaCarteiraApi';
import { notify } from '../../components/Notify';
import { getUserByCPFAndNascimento } from '../../Api';
import Cookies from "js-cookie";
import { useStorageValidarCarteira } from './StorageValidarCarteira';
const Login = () => {
    const [dataNascimento, setDataNascimento] = useState('');
    const [cpf, setCpf] = useState('');

    const navigate = useNavigate();

    const { setCurrentUser } = useStorageValidarCarteira(state => state).dispatch



    const expirationTime = 1 /* new Date(new Date().getTime() + 15 * 1000); */


    const handleLogin = () => {
        if (cpf.length !== 11) {
            return notify('Preencha o CPF corretamente!');
        }

        if (dataNascimento.length !== 10) {
            return notify('Data de nascimento inválida. Use o formato DD/MM/AAAA');
        }

        const [day, month, year] = dataNascimento.split('/').map(Number);

        // Validação básica de faixa
        if (
            !day || !month || !year ||
            day < 1 || month < 1 || month > 12 || year < 1900
        ) {
            return notify('Data de nascimento inválida.');
        }

        // Cria a data
        const date = new Date(year, month - 1, day);

        // Valida se a data realmente existe
        if (
            date.getFullYear() !== year ||
            date.getMonth() !== month - 1 ||
            date.getDate() !== day
        ) {
            return notify('Data de nascimento inexistente.');
        }

        // Se passou por tudo, pode formatar
        const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} 00:00:00.000000`;



        getUserByCPFAndNascimento({ cpf, dataNascimento: formattedDate }).then(resp => {
            console.log(resp)
            if (resp?.data?.status === false) { return notify(resp?.data?.message) }
            if (resp?.status == 200) {
                getImagemByUserId({ id: resp?.data?.estudante_id }).then(res => {

                    setCurrentUser({ ...resp?.data, imagem: res.data.imagem })
                    Cookies.set("usuario", "true", { expires: expirationTime })
                    Cookies.set("email", resp?.data?.email, { expires: expirationTime })
                    Cookies.set("cpf", resp?.data?.cpf, { expires: expirationTime })
                    navigate('/visualizaminhacarteira')
                })

            } else {
                notify('Usuário inválido!')
            }
        }).catch(err => {
            notify('Usuário inválido!')
        })
    };

    const handleCpfChange = (e) => {
        // Remove todos os caracteres não numéricos
        const rawValue = e.target.value.replace(/\D/g, '');
        setCpf(rawValue);
    };


    return (
        <>
            <div className="container">
                <div
                    className="left-panel"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', alignItems: 'center', justifyContent: 'center' }}>

                        <h2 className='text-gradient'>Bem vindo de volta!</h2>
                        <h3>Informe seus dados e valide a sua carteira DNE</h3>
                        <img className='imagemlogin2' src={loginimg} />
                    </div>
                    {/* <button className="button-outline">Sign In</button> */}
                </div>

                <div
                    className="right-panel"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className='contentCardlogin'>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={logo} width={100} height={100} />
                        </div>
                        <h2>Acesse sua carteira</h2>

                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                            <FontAwesomeIcon style={{ margin: '2px 5px 0 0' }} icon={faInfoCircle} size='1x' color='#53C593' />
                            <h4>Digite seus dados de acesso no campo abaixo</h4>
                        </div>

                        <div className='formContainer'>
                            <div className="input-group">
                                <span className="icon"><FiUser /></span>
                                <ReactInputMask
                                    mask="999.999.999-99"
                                    placeholder="CPF"
                                    value={cpf}
                                    onChange={handleCpfChange}
                                    onKeyDown={(e) => {
                                        console.log('teset')
                                        if (e.key == 'Enter') {
                                            e.preventDefault()
                                            handleLogin()
                                        }
                                    }}
                                >
                                    {(inputProps) => <input {...inputProps} type="text" />}
                                </ReactInputMask>
                            </div>
                            <div className="input-group">
                                <span className="icon"><FiCalendar /></span>
                                <ReactInputMask
                                    mask="99/99/9999"
                                    placeholder="Data de nascimento (dd/mm/aaaa)"
                                    value={dataNascimento}
                                    onChange={(e) => setDataNascimento(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleLogin();
                                        }
                                    }}
                                >
                                    {(inputProps) => <input {...inputProps} type="text" />}
                                </ReactInputMask>
                            </div>


                            <button onClick={handleLogin} type="submit" className="button"><b>Acessar Carteira</b></button>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="footer-login">
                <p>Contato: <a href="mailto:contato@uebcarteirinha.com.br">contato@uebcarteirinha.com.br</a> | Tel: <a href="tel:+5531996092454">+55 31 99609-2454</a></p>
            </footer>
        </>
    );
};

export default Login