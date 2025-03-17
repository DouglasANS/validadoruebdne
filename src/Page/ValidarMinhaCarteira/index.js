import React, { useState } from 'react';
import './Login.css';
import { motion } from 'framer-motion';
import { FiUser, FiLock, FiMail } from 'react-icons/fi';
import logo from '../../assets/ueb.png'
import loginimg from '../../assets/login2.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import ReactInputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom';
import { LoginUserMinhaCarteira } from '../../Api/MinhaCarteiraApi';
import { notify } from '../../components/Notify';
import { getInfoAluno } from '../../Api';
import Cookies from "js-cookie";
import { useStorageValidarCarteira } from './StorageValidarCarteira';
const Login = () => {
    const [password, setPassword] = useState('');
    const [cpf, setCpf] = useState(''); 
    
    const navigate = useNavigate();

    const { setCurrentUser } = useStorageValidarCarteira(state => state).dispatch
    

    const expirationTime = 1 /* new Date(new Date().getTime() + 15 * 1000); */

    const handleLogin = () => {
        LoginUserMinhaCarteira({cpf,senha: password}).then(resp=>{
            if(resp?.data?.usuario == true){
                getInfoAluno({ email: resp?.data?.email }).then(res => { 
                    var infoEstudante = null

                    res.data.map(item=>{
                        if(item.ano == 2025){
                            infoEstudante = item
                        }
                    })

                    setCurrentUser(infoEstudante)
                })
                Cookies.set("usuario", "true", { expires: expirationTime })
                Cookies.set("email", resp?.data?.email, { expires: expirationTime })
                navigate('/visualizaminhacarteira') 

            }else{
                notify('Usuário inválido!')
            }
        }) 
        console.log('CPF:', cpf, 'Senha:', password);
    };

    const handleCpfChange = (e) => {
        // Remove todos os caracteres não numéricos
        const rawValue = e.target.value.replace(/\D/g, '');
        setCpf(rawValue);
      };
    

    return (
        <div className="container">
            <motion.div
                className="left-panel"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', alignItems: 'center', justifyContent: 'center' }}>

                    <h2 className='text-gradient'>Bem vindo de volta!</h2>
                    <h3>Informe seus dados e valide a sua carteira DNE</h3>
                    <img className='imagemlogin2' src={loginimg}  />
                </div>
                {/* <button className="button-outline">Sign In</button> */}
            </motion.div>

            <motion.div
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
                                onKeyDown={(e)=>{
                                    console.log('teset') 
                                    if(e.key == 'Enter'){  
                                        e.preventDefault()
                                        handleLogin()
                                    }
                                }}
                            >
                                {(inputProps) => <input {...inputProps} type="text" />}
                            </ReactInputMask>
                        </div>
                        <div className="input-group">
                            <span className="icon"><FiLock /></span>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e)=>{ 
                                    console.log('1222', e.key) 
                                    if(e.key == 'Enter'){  
                                        e.preventDefault()
                                        handleLogin()
                                    }
                                }}
                            />
                        </div>
                        <button onClick={handleLogin} type="submit" className="button"><b>Acessar Carteira</b></button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login