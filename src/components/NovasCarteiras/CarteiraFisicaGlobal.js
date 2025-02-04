import React, { useEffect, useState } from 'react'
import CARD2025 from '../../assets/CARD2025.jpeg'
import QRCode from 'react-qr-code'
import { escolaridadeAll } from '../../utils'
import { useGlobalCarteira } from '../../storage/globalCarteira'
export default function CarteiraFisicaGlobal() {

    const { dataCarteira } = useGlobalCarteira(state => state).dados

    const { codigoUso, cpf, dataNascimento, escolaridade, nome, curso, rg, validadeCarteirinha, imagem, email, instituicao, codId } = dataCarteira

    var size = '10px'

    const scl = escolaridadeAll.filter(item=>{
        if(item.value === escolaridade?.toUpperCase()){
            return item
        }
    })

    return (
        <div style={{ width: '10px', height: '10px', overflow: 'auto', position: 'absolute', top: '0', left: '0' }}>
            <div id='CarteiraFisicaGlobal' style={{ width: '1004px', height: '650px', position: 'relative',
                backgroundImage: `url(${CARD2025})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
             }}> 
                <div style={{ position: 'absolute', top: '500px', left: '120px' }}>
                     <QRCode
                        bgColor='#00000000'
                        size={130}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={`https://funemg.vercel.app/validar/${email}`}
                        viewBox={`0 0 256 256`}
                    />
                </div>

                {imagem && <img style={{ position: 'absolute', top: '161px', left: '64px', fontSize: '12px', width: '252px', height: '321px' }} src={imagem || ''} />}
                <div style={{ position: 'absolute', bottom: '60px', width: '250px', right: '370px', textAlign: 'center' }}>
                    <h6 ><b style={{ color: 'black', fontSize: '25px' }}>CÓD. USO</b> </h6>
                    <h6 ><b style={{ color: 'black', fontSize: '25px' }}>{codigoUso?.toUpperCase()}</b> </h6>
                    
                </div>
                <div style={{ position: 'absolute', top: '183px', left: '360px', width: '460px', height: '130px', display: 'flex', flexDirection: 'column' }}>
                    <h6 style={{ fontSize: '25px' }}><b style={{ color: 'black' }}> {nome?.toUpperCase()}</b></h6>
                    {cpf && <h6 style={{ fontSize: '25px' }}><b style={{ color: 'black' }}>CPF: {cpf?.toUpperCase()}</b></h6>}
                    <h6 style={{ fontSize: '25px' }}><b style={{ color: 'black' }}>RG: {rg?.toUpperCase()}</b></h6>
                    <h6 style={{ fontSize: '25px' }}><b style={{ color: 'black' }}>DATA DE NASC.: {dataNascimento?.toUpperCase()}</b></h6>
                    <h6 style={{ fontSize: '25px' }}><b style={{ color: 'black' }}>{instituicao?.toUpperCase()}</b></h6>
                    <h6 style={{ fontSize: '25px' }}><b style={{ color: 'black' }}> {curso?.toUpperCase()}</b></h6>
                    <h6 style={{ fontSize: '25px' }}><b style={{ color: 'black' }}> {scl[0]?.name?.toUpperCase()}</b></h6>
                </div>
                <h6 style={{position: 'absolute', bottom: '160px', right: '200px', fontSize: '25px', width: '20px' }}> {codId?.toUpperCase() || '' }</h6>
            </div>
        </div>
    )
}
