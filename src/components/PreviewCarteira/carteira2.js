import React from 'react'
import carteira2 from '../../assets/carteira2.jpg'
import { useFomaularioStorage } from '../../storage'
import QRCode from 'react-qr-code'

export default function PreviewCarteira2() {

    const { userData, randomCod, currentImagem } = useFomaularioStorage(state => state.dados)

    return (
        <div id='node_to_png2' style={{ width: '450px', height: '275px', position: 'relative' }}>
            <img width={450} height={275} src={carteira2} />
            {/* <div style={{ position: 'absolute', top: '88px', right: '17px' }}>
                <QRCode
                    bgColor='#00000000'
                    size={98}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={'linkQrCode'}
                    viewBox={`0 0 256 256`}
                />
            </div> */}

            {currentImagem.length !== 0 && <img style={{ position: 'absolute', top: '73px', left: '31px', fontSize: '12px', width: '103px', height: '124px' }} src={currentImagem} />}
            <div style={{ position: 'absolute', bottom: '30px', width: '100px', right: '200px', textAlign: 'center' }}>
                <h6 ><b style={{ color: 'black', fontSize: '12px' }}>CÓD. USO</b> </h6>
                <h6 ><b style={{ color: 'black', fontSize: '12px' }}>{userData?.cod?.toUpperCase() || randomCod}</b> </h6>
            </div>
            <div style={{ position: 'absolute', top: '80px', left: '150px', width: '220px', height: '130px', display: 'flex', flexDirection: 'column' }}>
                <h6 style={{ fontSize: '12px' }}><b style={{ color: 'black' }}></b> {userData?.nome?.toUpperCase()}</h6>
                { userData?.cpf && <h6 style={{ fontSize: '12px' }}><b style={{ color: 'black' }}>CPF:</b> {userData?.cpf?.toUpperCase()}</h6>}
                <h6 style={{ fontSize: '12px' }}><b style={{ color: 'black' }}>RG:</b> {userData?.rg?.toUpperCase()}</h6>
                <h6 style={{ fontSize: '12px' }}><b style={{ color: 'black' }}>DATA DE NASC.:</b> {userData?.dataNascimento?.toUpperCase()}</h6>
                <h6 style={{ fontSize: '12px' }}><b style={{ color: 'black' }}></b> {userData?.instituicao === undefined ? 'FUNEMG' : userData?.instituicao?.toUpperCase()}</h6>
                <h6 style={{ fontSize: '12px' }}><b style={{ color: 'black' }}></b> {userData?.curso?.toUpperCase()}</h6>
            </div>
        </div>
    )
}

