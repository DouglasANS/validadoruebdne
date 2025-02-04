import React from 'react'
import { useFomaularioStorage } from '../../../storage'
import { escolaridadeAllBack } from '../../../utils'

export default function Certificado() {

    const { userData } = useFomaularioStorage(state => state.dados)

        if (Array.isArray(userData)) {

            const text = `UEB atesta que ${userData[0]?.nome?.toUpperCase()} é estudante e está regularmente matrículado(a) em Ensino ${escolaridadeAllBack[userData[0]?.escolaridade?.toUpperCase()] || userData[0]?.escolaridade?.toUpperCase()} na instituição ${userData[0]?.instituicao?.toUpperCase()}` //${userData[0]?.instituicao?.toUpperCase()}
            return (
                <div id='docvalido' style={{ display: 'flex', boxSizing: 'border-box', flexDirection: 'column', width: '100%', maxWidth: '450px', height: '730px', background: '#fff', border: '2px solid #333' }}>
                    <div style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#0C2612' }}>
                        <h3 style={{ fontSize: '25px', color: '#B0EAB9' }}><b>Documento válido!</b></h3>
                    </div>
                    <div style={{ background: '#333', height: '3px' }}></div>
                    <div style={{ height: '450px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '15px', fontFamily: 'sans-serif', textAlign: 'center', color: '#323232', padding: '0 5px' }}><b>{text}</b></h3>
                    </div>
                    <div style={{ background: '#333', height: '3px' }}></div>
                    <Card text='Nome:' data={userData[0]?.nome?.toUpperCase()} />
                    <div style={{ background: '#333', height: '3px' }}></div>
                    <Card text='Instituição:' data={userData[0]?.instituicao?.toUpperCase()} />
                    <div style={{ background: '#333', height: '3px' }}></div>
                    <Card text='Curso:' data={userData[0]?.curso?.toUpperCase()} />
                    <div style={{ background: '#333', height: '3px' }}></div>
                    <Card text='Documento de identificação:' data={userData[0]?.rg?.toUpperCase()} />
                    <div style={{ background: '#333', height: '3px' }}></div>
                    <Card text='Emissor:' data={'UEB'} />
                    <div style={{ background: '#333', height: '3px' }}></div>
                    {userData[0]?.imagem !== 0 && <img style={{ width: '150px', height: '230px', alignSelf: 'center', marginTop: '15px', border: '1px solid black' }} src={userData[0]?.imagem} />}
        
                </div>
            )
        } else if (typeof userData === 'object' && userData !== null) {
            // Se for um objeto, trate como objeto
            return(
                <>
                </>
            )
        } else {
            // Caso seja null, undefined ou outro tipo inesperado
            console.warn("Dados de usuário inválidos:", userData);
            return(
                <>
                </>
            );
        }
    

    

    
}


function Card({ text, data }) {

    const corText = '#323232'

    return (
        <div style={{ height: '50px'/* , border: '5px solid #333' */ }}>
            <div style={{ height: '25px' }}>
                <h3 style={{ fontSize: '15px', marginLeft: '30px', color: corText, paddingTop: '5px' }}><b>{text}</b></h3>
            </div>
            <div style={{ height: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontSize: '10px', fontWeight: '100', marginLeft: '30px', color: corText }}><b>{data}</b></h3>
            </div>
        </div>
    )
}