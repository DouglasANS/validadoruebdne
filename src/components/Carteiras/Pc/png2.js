import React from 'react'
import carteira2 from '../../../assets/carteira2.jpg'
import QRCode from 'react-qr-code'
import { useFomaularioStorage } from '../../../storage'

export default function PCPng2() {

    const { userData, randomCod, currentImagem } = useFomaularioStorage(state => state.dados)

    return (
        <div style={{ width: '10px', height: '10px', overflow: 'auto', position: 'absolute', top: '0', left: '0' }}>
            <div id='node_to_png2' style={{ width: '1004px', height: '650px', position: 'relative' }}>
                <img width={1004} height={650} src={carteira2} />
                <div style={{ position: 'absolute', top: '476px', left: '120px' }}>
                    {userData?.linkQr && <QRCode
                        bgColor='#00000000'
                        size={130}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={userData?.linkQr}
                        viewBox={`0 0 256 256`}
                    />}
                </div>

                {currentImagem.length !== 0 && <img style={{ position: 'absolute', top: '173px', left: '70px', fontSize: '12px', width: '230px', height: '294px' }} src={currentImagem} />}
                <div style={{ position: 'absolute', bottom: '60px', width: '250px', right: '370px', textAlign: 'center' }}>
                    <h6 ><b style={{ color: 'black', fontSize: '25px' }}>CÓD. USO</b> </h6>
                    <h6 ><b style={{ color: 'black', fontSize: '25px' }}>{userData?.cod?.toUpperCase() || randomCod}</b> </h6>
                </div>
                <div style={{ position: 'absolute', top: '183px', left: '332px', width: '660px', height: '130px', display: 'flex', flexDirection: 'column' }}>
                    <h6 style={{ fontSize: '25px' }}><b style={{ color: 'black' }}></b> {userData?.nome?.toUpperCase()}</h6>
                    {userData?.cpf && <h6 style={{ fontSize: '25px' }}><b style={{ color: 'black' }}>CPF:</b> {userData?.cpf?.toUpperCase()}</h6>}
                    <h6 style={{ fontSize: '25px' }}><b style={{ color: 'black' }}>RG:</b> {userData?.rg?.toUpperCase()}</h6>
                    <h6 style={{ fontSize: '25px' }}><b style={{ color: 'black' }}>DATA DE NASC.:</b> {userData?.dataNascimento?.toUpperCase()}</h6>
                    <h6 style={{ fontSize: '25px' }}><b style={{ color: 'black' }}></b> {userData?.instituicao === undefined ? 'FUNEMG' : userData?.instituicao?.toUpperCase()}</h6>
                    <h6 style={{ fontSize: '25px' }}><b style={{ color: 'black' }}></b> {userData?.curso?.toUpperCase()}</h6>
                    <h6 style={{ fontSize: '25px' }}><b style={{ color: 'black' }}></b> {userData?.ensino?.toUpperCase()}</h6>
                </div>
            </div>
        </div>
    )
}
