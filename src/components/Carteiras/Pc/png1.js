import React from 'react'
import carteira1 from '../../../assets/carteira1.jpg'
import QRCode from 'react-qr-code'
import { useFomaularioStorage } from '../../../storage'

export default function PCPng1() {

    const { userData, randomCod, currentImagem } = useFomaularioStorage(state => state.dados)

    return (
        <div style={{ width: '10px', height: '10px', overflow: 'auto', position: 'absolute', top: '0', left: '0' }}>

            <div id='node_to_png1' style={{ width: '650px', height: '1182px', position: 'relative' }}>
                <img width={650} height={1182} src={carteira1} />
                <div style={{ position: 'absolute', top: '250px', right: '66px' }}>
                    {userData?.linkQr && <QRCode
                        bgColor='#00000000'
                        size={210}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={userData?.linkQr}
                        viewBox={`0 0 256 256`}
                    />}
                </div>

                {currentImagem.length !== 0 && <img style={{ position: 'absolute', top: '220px', left: '38px', fontSize: '10px', width: '266px', height: '314px', borderRadius: '28px' }} src={currentImagem} />}
                <h6 style={{ position: 'absolute', top: '480px', right: '37px', fontSize: '30px', width: '265px', textAlign: 'center' }}><b style={{ color: 'black' }}>{userData?.cod?.toUpperCase() || randomCod}</b> </h6>
                <div style={{ position: 'absolute', top: '570px', left: '40px', width: '600px', height: '350px', display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
                    <h6 style={{ fontSize: '25px' }}><b style={{ color: 'black' }}></b> {userData?.nome?.toUpperCase()}</h6>
                    <h6 style={{ fontSize: '25px' }}><b style={{ color: 'black' }}>Ins. Ensino:</b> {userData?.instituicao === undefined ? 'FUNEMG' : userData?.instituicao?.toUpperCase()}</h6>
                    <h6 style={{ fontSize: '25px' }}><b style={{ color: 'black' }}>Curso:</b> {userData?.curso?.toUpperCase()}</h6>
                    <h6 style={{ fontSize: '25px' }}><b style={{ color: 'black' }}>Nível de Ensino:</b> {userData?.ensino?.toUpperCase()}</h6>
                    <h6 style={{ fontSize: '25px' }}><b style={{ color: 'black' }}>RG:</b> {userData?.rg?.toUpperCase()}</h6>
                    <h6 style={{ fontSize: '25px' }}><b style={{ color: 'black' }}>Data de nasc:</b> {userData?.dataNascimento?.toUpperCase()}</h6>
                    <h6 style={{ fontSize: '25px' }}><b style={{ color: 'black' }}>Validade:</b> {userData?.validade?.toUpperCase()}</h6>
                </div>
                <a style={{ position: 'absolute', bottom: '118px', left: '230px', fontSize: '10px', height: '60px', width: '195px', }} href={userData?.link}></a>
            </div>
        </div>
    )
}