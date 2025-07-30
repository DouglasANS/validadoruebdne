import React, { useEffect, useState } from 'react'
import { getInfoAluno, registarAcessoValidarCertificado } from '../../Api'
import { useParams } from 'react-router-dom';
import { useFomaularioStorage } from '../../storage';
import DocValido from '../../components/Carteiras/DocValido';
import { mockAlunoApi } from '../../mock';
import LoadingUI from '../../components/LoadingUI';
import ModalAtualizarCpf from '../../components/ModalUserAttCpf';
import SolicitarCpf from '../../components/SolicitarCpf';
import { isCarteirinhaValida } from '../../utils';
import InvalidoCarteira from '../../components/InvalidoCarteira';

export default function Certificado() {

    const { email } = useParams();

    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [needSolicitarCpf, setNeedSolicitarCpf] = useState(false);
    const { setUserData } = useFomaularioStorage(state => state.dispatch)
    const [isValid, setIsValid] = useState(false);



    useEffect(() => {

        if (email == 'undefined' || email == '') {
            setNeedSolicitarCpf(true)
            return setLoading(false);
        }
        getInfoAluno({ email }).then(res => {

            if (res.data.status == false) {
                setNeedSolicitarCpf(true)
                return setLoading(false);
            }

            const currentIsValid = isCarteirinhaValida(res.data.validadeCarteirinha)

            if (currentIsValid == false) {
                return setIsValid(true)
            }

            console.log(res.data.cpf, !res.data.cpf || res.data.cpf.trim() === '');

            if (!res.data.cpf || res.data.cpf.trim() === '') {
                setModalOpen(true);
            }

            // Executa a request mas não aguarda nem trata erros
            registarAcessoValidarCertificado({ idUser: res.data.id, tipo: 1 })
                .catch(() => { }); // ignora silenciosamente qualquer erro

            setUserData(res.data);
        }).catch((err) => {
            console.error("Erro ao buscar ou salvar imagem:", err);
        }).finally(() => {
            setLoading(false);
        });
    }, []);


    const handleCpfAtualizado = (cpf) => {
        setModalOpen(false);
    };

    if (isValid) return <InvalidoCarteira />;
    if (loading) return <LoadingUI message="Validando dados do aluno..." />;
    if (needSolicitarCpf) return <SolicitarCpf currentRouter={'certificado'} text={'Vamos conferir sua carteirinha? Digite seu CPF ou Email para continuar.'} />;

    return (
        <>
            <ModalAtualizarCpf
                open={modalOpen}
                email={email}
                onCpfAtualizado={handleCpfAtualizado}
            />
            <div>
                <DocValido />
            </div>
        </>
    )
}
