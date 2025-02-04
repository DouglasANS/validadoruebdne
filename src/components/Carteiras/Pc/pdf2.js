import React from 'react'
import carteira2 from '../../../assets/carteira2.jpg'
import carteira2back from '../../../assets/carteira2back.jpg'
import QRCode from 'react-qr-code'
import { useFomaularioStorage } from '../../../storage'

export default function PCPdf2({ refe }) {

    const { userData, randomCod, currentImagem } = useFomaularioStorage(state => state.dados)

    return (
        <div ref={refe}>
            <div style={{ width: '450px', height: '275px', position: 'relative' }}>
                <img width={450} height={275} src={carteira2} />
                <div style={{ position: 'absolute', top: '202px', left: '52px' }}>
                    {userData?.linkQr && <QRCode
                        bgColor='#00000000'
                        size={58}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={userData?.linkQr}
                        viewBox={`0 0 256 256`}
                    />}
                </div>

                {currentImagem.length !== 0 && <img style={{ position: 'absolute', top: '73px', left: '31px', fontSize: '12px', width: '103px', height: '124px' }} src={currentImagem} />}
                <div style={{ position: 'absolute', bottom: '30px', width: '100px', right: '200px', textAlign: 'center' }}>
                    <h6 ><b style={{ color: 'black', fontSize: '12px' }}>CÓD. USO</b> </h6>
                    <h6 ><b style={{ color: 'black', fontSize: '12px' }}>{userData?.cod?.toUpperCase() || randomCod}</b> </h6>
                </div>
                <div style={{ position: 'absolute', top: '80px', left: '150px', width: '220px', height: '130px', display: 'flex', flexDirection: 'column' }}>
                    <h6 style={{ fontSize: '12px' }}><b style={{ color: 'black' }}></b> {userData?.nome?.toUpperCase()}</h6>
                    {userData?.cpf && <h6 style={{ fontSize: '12px' }}><b style={{ color: 'black' }}>CPF:</b> {userData?.cpf?.toUpperCase()}</h6>}
                    <h6 style={{ fontSize: '12px' }}><b style={{ color: 'black' }}>RG:</b> {userData?.rg?.toUpperCase()}</h6>
                    <h6 style={{ fontSize: '12px' }}><b style={{ color: 'black' }}>DATA DE NASC.:</b> {userData?.dataNascimento?.toUpperCase()}</h6>
                    <h6 style={{ fontSize: '12px' }}><b style={{ color: 'black' }}></b> {userData?.instituicao === undefined ? 'FUNEMG' : userData?.instituicao?.toUpperCase()}</h6>
                    <h6 style={{ fontSize: '12px' }}><b style={{ color: 'black' }}></b> {userData?.curso?.toUpperCase()}</h6>
                    <h6 style={{ fontSize: '12px' }}><b style={{ color: 'black' }}></b> {userData?.ensino?.toUpperCase()}</h6>
                </div>
            </div>
            <img width={450} height={275} src={carteira2back} />
        </div>
    )
}