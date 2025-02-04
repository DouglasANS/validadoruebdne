import React, { useEffect } from 'react'
import digital2025 from '../../assets/digital2025.png'
import QRCode from 'react-qr-code'
import domtoimage from 'dom-to-image';
import { useGlobalCarteira } from '../../storage/globalCarteira';
import { escolaridadeAll } from '../../utils';

export default function CarteiraDigitalGlobal({componentRefPdf}) {

    const { dataCarteira } = useGlobalCarteira(state => state).dados

    const confDigital = {
        qrcodeTamanho: 85,
        qrcodeTop: '95px',
        qrcodeRight: '23px',
        fontSizeConteudo: '10px'
    }

    var size = '10px'

    const { codigoUso, cpf, dataNascimento, escolaridade, nome, curso, rg, validadeCarteirinha, imagem, email, instituicao } = dataCarteira

    console.log(codigoUso, cpf, dataNascimento, escolaridade, nome, curso, rg, validadeCarteirinha, imagem, email, instituicao)

     const scl = escolaridadeAll.filter(item=>{
            if(item.value === escolaridade?.toUpperCase()){
                return item
            }
        })

    return (
        <div style={{ width: '10px', height: '10px', overflow: 'auto', position: 'absolute', top: '0', left: '0' }}>

            <div id='globalDigital' ref={componentRefPdf} style={{ width: '650px', height: '1182px', position: 'relative' }}>
                <img width={650} height={1182} src={digital2025} />
                <div style={{ position: 'absolute', top: '250px', right: '66px' }}>
                    {<QRCode
                        bgColor='#00000000'
                        size={210}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={`https://funemg.vercel.app/validar/${email}`}
                        viewBox={`0 0 256 256`}
                    />}
                </div>

                {imagem && <img style={{ position: 'absolute', top: '220px', left: '38px', fontSize: '10px', width: '266px', height: '314px', borderRadius: '28px' }} src={imagem} />}
                <h6 style={{ position: 'absolute', top: '480px', right: '37px', fontSize: '30px', width: '265px', textAlign: 'center' }}><b style={{ color: 'black' }}>{codigoUso}</b> </h6>
                <div style={{ position: 'absolute', top: '570px', left: '40px', width: '600px', height: '350px', display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
                    <h6 style={{ fontSize: '25px' }}><b style={{ color: 'black' }}> {nome?.toUpperCase()}</b></h6>
                    <h6 style={{ fontSize: '25px' }}><b style={{ color: 'black' }}>Ins. Ensino: {instituicao?.toUpperCase()}</b></h6>
                    <h6 style={{ fontSize: '25px' }}><b style={{ color: 'black' }}>Curso: {curso?.toUpperCase()}</b></h6>
                    <h6 style={{ fontSize: '25px' }}><b style={{ color: 'black' }}>Nível de Ensino: {scl[0]?.name?.toUpperCase()}</b></h6>
                    <h6 style={{ fontSize: '25px' }}><b style={{ color: 'black' }}>RG: {rg?.toUpperCase()}</b></h6>
                    <h6 style={{ fontSize: '25px' }}><b style={{ color: 'black' }}>Data de nasc: {dataNascimento}</b></h6>
                    <h6 style={{ fontSize: '25px' }}><b style={{ color: 'black' }}>Validade: {validadeCarteirinha}</b></h6>
                </div>
                <a style={{ position: 'absolute', bottom: '118px', left: '230px', fontSize: '10px', height: '60px', width: '195px', }} href={`https://funemg.vercel.app/certificado/${email}`}></a>
            </div>
        </div>
    )
}
