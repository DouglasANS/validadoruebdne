import React, { useEffect } from 'react';
import background from '../../../assets/backgroundcarteira.jpg';
import aviso from '../../../assets/aviso.jpg';
import './visualizarCarteira.css';
import { mockAlunoEditApi } from '../../../mock';
import { escolaridadeAllBack, isCarteirinhaValida } from '../../../utils';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { useStorageValidarCarteira } from '../StorageValidarCarteira';
import { Button } from '@mui/material';
import { getImagemByUserId, getInfoAlunoByCpf } from '../../../Api/MinhaCarteiraApi';

export default function VisualizarMinhaCarteira() {

    const handleGoMinhaCarteira = () => {
        navigate('/')
        Cookies.remove('usuario')
        Cookies.remove('email')
        Cookies.remove('cpf')
    };

    const { currentUser } = useStorageValidarCarteira(state => state)
    /* const { setCurrentUser } = useStorageValidarCarteira(state => state).dispatch */
    const { setCurrentUser } = useStorageValidarCarteira(state => state).dispatch

    const navigate = useNavigate();

    const tokenUser = Cookies.get("usuario")
    const userEmail = Cookies.get("email")
    const cpf = Cookies.get("cpf")
    useEffect(() => {
        console.log(cpf)
        if (tokenUser == 'true') {

            getInfoAlunoByCpf({ cpf: cpf }).then(resp => {

                const isValid = isCarteirinhaValida(resp?.data.validadeCarteirinha)

                if(!isValid){
                    return setCurrentUser(null)
                }
                getImagemByUserId({ id: resp?.data?.estudante_id }).then(res => {

                    setCurrentUser({ ...resp?.data, imagem: res.data.imagem })  
                })


            })

        } else {
            handleGoMinhaCarteira()
        }


    }, [])

    return (
        <div
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        > 
            <>
                <SuspendedButton handleGoMinhaCarteira={handleGoMinhaCarteira} />
                {currentUser == null ? <HasNoCarteira email={userEmail} /> :
                    <HasCarteira currentUser={currentUser} />
                }
            </>
            {/* <Footer /> */}
        </div>
    );
}

function Card({ text, data }) {
    return (
        <div style={{ padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 'bold' }}>{text}</span>
            <span>{data}</span>
        </div>
    );
}

export function HasCarteira({ currentUser }) {

    const text = `UEB atesta que ${currentUser?.nome?.toUpperCase()} é estudante e está regularmente matrículado(a) em Ensino ${escolaridadeAllBack[currentUser?.escolaridade?.toUpperCase()] || currentUser?.escolaridade?.toUpperCase()} na instituição ${currentUser?.instituicao?.toUpperCase()}`;

    return (
        <div class="container2">
            <div class="card2">
                <h2 class="textoValidado">Documento validado com sucesso!</h2>
                <h5>{text}<span id="nomeInstituicao"></span>.</h5>
                <div class="card-content">
                    <div class="card-row"><strong>Nome:</strong> <span id="nome">{currentUser?.nome?.toUpperCase()}</span></div>
                    <div class="divider"></div>
                    <div class="card-row"><strong>Instituição:</strong> <span id="instituicao">{currentUser?.instituicao?.toUpperCase()}</span></div>
                    <div class="divider"></div>
                    <div class="card-row"><strong>Curso:</strong> <span id="curso">{currentUser?.curso?.toUpperCase()}</span></div>
                    <div class="divider"></div>
                    <div class="card-row"><strong>Documento de Identificação:</strong> <span id="rg">{currentUser?.rg?.toUpperCase()}</span></div>
                    <div class="divider"></div>
                    <div class="card-row"><strong>Emissor:</strong> UEB</div>
                </div>
                {/* <img
                    style={{ width: '150px', height: '190px', alignSelf: 'center', margin: '15px auto', border: '1px solid black' }}
                    src={currentUser?.imagem}
                    alt='Imagem do estudante'
                /> */}
                <img id="imagemUsuario" class="user-image" src={currentUser?.imagem} alt="Imagem do estudante" />
            </div>
        </div>

    );

}


/* document.getElementById('nomeUsuario').innerText = currentUser.nome?.toUpperCase();
document.getElementById('nomeInstituicao').innerText = currentUser.instituicao?.toUpperCase();
document.getElementById('nome').innerText = currentUser.nome?.toUpperCase();
document.getElementById('instituicao').innerText = currentUser.instituicao?.toUpperCase();
document.getElementById('curso').innerText = currentUser.curso?.toUpperCase();
document.getElementById('rg').innerText = currentUser.rg?.toUpperCase(); */

export function HasNoCarteira({ email }) {

    const openWhatsApp = () => {
        const phoneNumber = "5531996092454";
        const message = `Olá! Gostaria de solicitar a renovação da carteira do estudante com email: ${email}.`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
    };

    return (
        <div className="containerhasno">
            <div className="card3">
                <img src={aviso} alt="Aviso" className="card-image" />
                <h3>
                    Infelizmente, identificamos que você não possui a carteira digital mais recente ativa em nosso sistema. Para resolver essa questão, recomendamos que entre em contato com o nosso suporte pelo canal oficial. Nossa equipe está à disposição para auxiliá-lo e garantir que tudo seja resolvido o mais rápido possível.
                </h3>
                <Button onClick={openWhatsApp} variant="outlined" style={{ width: '150px', alignSelf: 'center', marginBottom: '50px' }} color="error">Expirada!</Button>
            </div>
        </div>
    );
}

export function SuspendedButton({ handleGoMinhaCarteira }) {


    return (
        <button className="suspended-button" onClick={handleGoMinhaCarteira}>
            Sair
        </button>
    );
}
