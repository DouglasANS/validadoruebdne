import React from 'react'
import textCertificado from '../../../assets/textCertificado.jpg'
import meiaEntrada from '../../../assets/meiaEntrada.jpg'
import nameCertificado from '../../../assets/nameCertificado.jpg'
import { useFomaularioStorage } from '../../../storage'
import { escolaridadeAllBack } from '../../../utils'

export default function DocValido() {

    const { userData, /* currentImagem */ } = useFomaularioStorage(state => state.dados)

    if (Array.isArray(userData)) {

        const text = `UEB atesta que ${userData[0]?.nome?.toUpperCase()} é estudante e está regularmente matrículado(a) em Ensino ${escolaridadeAllBack[userData[0]?.escolaridade?.toUpperCase()] || userData[0]?.escolaridade?.toUpperCase()} na instituição ${userData[0]?.instituicao?.toUpperCase()}`

        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>

                <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', width: '100vw' }}>
                    <img src={nameCertificado} width={150} alt='Nome do Certificado' />
                    <img src={meiaEntrada} width={150} alt='Imagem Meia Entrada' />
                    <h4 style={{ padding: '10px 20px' }}><b>{text}</b></h4>
                    <img src={textCertificado} style={{ width: '100%' }} alt='Texto do Certificado'  />
                </div>
            </div>
        )
    } else if (typeof userData === 'object' && userData !== null) {
        const text = `UEB atesta que ${userData?.nome?.toUpperCase()} é estudante e está regularmente matrículado(a) em Ensino ${escolaridadeAllBack[userData?.escolaridade?.toUpperCase()] || userData?.escolaridade?.toUpperCase()} na instituição ${userData?.instituicao?.toUpperCase()}`

        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>

                <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', width: '100vw' }}>
                    <img src={nameCertificado} width={150} alt='Nome do Certificado' />
                    <img src={meiaEntrada} width={150} alt='Imagem Meia Entrada' />
                    <h4 style={{ padding: '10px 20px' }}><b style={{fontFamily: 'Roboto',}}>{text}</b></h4>
                    <img src={textCertificado} style={{ width: '100%' }} alt='Texto do Certificado'/>
                </div>
            </div>
        )
    } else {
        // Caso seja null, undefined ou outro tipo inesperado
        console.warn("Dados de usuário inválidos:", userData);
        return (
            <>
            </>
        );
    }



}

