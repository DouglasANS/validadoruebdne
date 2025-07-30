import React, { useEffect, useState } from 'react';
import { getImagemByUserId, getInfoAluno, registarAcessoValidarCertificado } from '../../Api';
import { useParams } from 'react-router-dom';
import Certificado from '../../components/Carteiras/Certificado';
import { useFomaularioStorage } from '../../storage';
import LoadingUI from '../../components/LoadingUI';
import ModalAtualizarCpf from '../../components/ModalUserAttCpf';
import SolicitarCpf from '../../components/SolicitarCpf';
import { isCarteirinhaValida } from '../../utils';
import InvalidoCarteira from '../../components/InvalidoCarteira';
import meiaEntrada from '../../assets/meiaentrada.png'

export default function Validacao() {
    const { email } = useParams();
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [needSolicitarCpf, setNeedSolicitarCpf] = useState(false);
    const { setUserData } = useFomaularioStorage(state => state.dispatch);

    useEffect(() => {
        console.log('object')
        
        if (email == 'undefined' || email == '') {
            setNeedSolicitarCpf(true)
            return setLoading(false);
        }
        getInfoAluno({ email }).then(res => {
            console.log(res.data.validadeCarteirinha)

            const currentIsValid = isCarteirinhaValida(res.data.validadeCarteirinha)
            if (res.data.status == false) {
                setNeedSolicitarCpf(true)
                return setLoading(false);
            }

            if (currentIsValid == false) {
                return setIsValid(true)
            }



            registarAcessoValidarCertificado({ idUser: res.data.id, tipo: 0 })
                .catch(() => { }); // ignora silenciosamente qualquer erro
            getImagemByUserId({ id: res.data.estudante_id })
                .then((resp) => {
                    setUserData({ ...res.data, imagem: resp.data.imagem });
                    if (!res.data.cpf || res.data.cpf.trim() === '') {
                        setModalOpen(true);
                    }
                })
                .catch((err) => {
                    console.error("Erro ao buscar ou salvar imagem:", err);
                })
                .finally(() => {
                    setLoading(false);
                });
        });
    }, []);

    const handleCpfAtualizado = (cpf) => {
        setModalOpen(false);
    };

    if (isValid) return <InvalidoCarteira />;
    if (loading) return <LoadingUI message="Validando dados do aluno..." />;
    if (needSolicitarCpf) return <SolicitarCpf currentRouter={'validar'} text={'Vamos conferir sua carteirinha? Digite seu CPF ou Email para continuar.'} />;

    return (
        <>
            <ModalAtualizarCpf
                open={modalOpen}
                email={email}
                onCpfAtualizado={handleCpfAtualizado}
            />
            <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', background: '#001c5d', height: '45px' }}>
                <img src={meiaEntrada} width={150}   />

            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'  }}>

                <Certificado />
            </div>
        </>
    );
}
