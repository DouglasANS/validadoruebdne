import React from 'react'
import carteira1 from '../../assets/carteira1.jpg'
import { useFomaularioStorage } from '../../storage'
import QRCode from 'react-qr-code'

export default function PreviewCarteira1() {

    const { userData, randomCod, currentImagem } = useFomaularioStorage(state => state.dados)

    return (
        <div id='node_to_png1' style={{ width: '250px', height: '450px', position: 'relative' }}>
            <img width={250} height={450} src={carteira1} />
            <div style={{ position: 'absolute', top: '88px', right: '17px' }}>
                <QRCode
                    bgColor='#00000000'
                    size={98}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={'linkQrCode'}
                    viewBox={`0 0 256 256`}
                />
            </div>

            {currentImagem.length !== 0 && <img style={{ position: 'absolute', top: '84px', left: '14px', fontSize: '10px', width: '103px', height: '119px', borderRadius: '10px' }} src={currentImagem} />}
            <h6 style={{ position: 'absolute', top: '188px', right: '42px', fontSize: '10px' }}><b style={{ color: 'black' }}>{userData?.cod?.toUpperCase() || randomCod}</b> </h6>
            <div style={{ position: 'absolute', top: '218px', left: '15px', width: '220px', height: '130px', display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
                <h6 style={{ fontSize: '10px' }}><b style={{ color: 'black' }}></b> {userData?.nome?.toUpperCase()}</h6>
                <h6 style={{ fontSize: '10px' }}><b style={{ color: 'black' }}>Ins. Ensino:</b> {userData?.instituicao === undefined ? 'FUNEMG' : userData?.instituicao?.toUpperCase()}</h6>
                <h6 style={{ fontSize: '10px' }}><b style={{ color: 'black' }}>Curso:</b> {userData?.curso?.toUpperCase()}</h6>
                { userData?.cpf && <h6 style={{ fontSize: '10px' }}><b style={{ color: 'black' }}>CPF:</b> {userData?.cpf?.toUpperCase()}</h6>}
                <h6 style={{ fontSize: '10px' }}><b style={{ color: 'black' }}>RG:</b> {userData?.rg?.toUpperCase()}</h6>
                <h6 style={{ fontSize: '10px' }}><b style={{ color: 'black' }}>Data de nasc:</b> {userData?.dataNascimento?.toUpperCase()}</h6>
                <h6 style={{ fontSize: '10px' }}><b style={{ color: 'black' }}>Validade:</b> {userData?.validade?.toUpperCase()}</h6>
            </div>
        </div>
    )
}
