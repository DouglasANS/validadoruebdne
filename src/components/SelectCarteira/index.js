import React, { useRef } from 'react'
import { DivButton, DivCarteira } from './style'
import { useFomaularioStorage } from '../../storage'
import PreviewCarteira1 from '../PreviewCarteira/carteira1'
import domtoimage from 'dom-to-image';
import PreviewCarteira2 from '../PreviewCarteira/carteira2';
import ReactToPrint from 'react-to-print';
import PCPdf1 from '../Carteiras/Pc/pdf1';
import PCPdf2 from '../Carteiras/Pc/pdf2';
import PCPng1 from '../Carteiras/Pc/png1';
import PCPng2 from '../Carteiras/Pc/png2';
import { Button } from '@mui/material';
import Certificado from '../Carteiras/Certificado';
import DocValido from '../Carteiras/DocValido';
import { notify } from '../Notify';
import { primeiraLetraMaiuscula } from '../hooks';

export default function SelectCarteira() {

    const { device, selectedCarteira, userData, defaultUserData, currentImagem } = useFomaularioStorage(state => state.dados)
    const dispatch = useFomaularioStorage(state => state.dispatch)



    const componentRefPdf = useRef();

    const downloadSelectedPng = () => {

        var currentCarteira = selectedCarteira === 1 ? 'node_to_png1' : 'node_to_png2'

        domtoimage.toJpeg(document.getElementById(currentCarteira), { quality: 0.95 })
            .then(function (dataUrl) {

                var link = document.createElement('a');
                link.download = `${userData.nome}.jpeg`;
                link.href = dataUrl;
                link.click();

                /* const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.setAttribute("download", 'carteira2');
                document.body.appendChild(link);
                link.click();
                link.remove(); */

            });

    }


    const downloadCertificado = () => {

        if (
            userData.nome.trim() === ''
            || userData.ensino.trim() === ''
            || userData.instituicao.trim() === ''
        ) {
            return notify('Os campos Nome, Nível de Ensino e Instituição são obrigatórios para poder baixar o Documento válido!')
        }

        var ajustName = primeiraLetraMaiuscula(userData?.nome?.toUpperCase())
        
        const newDef = `https://carteirinhasdeestudante.com.br/wp-content/uploads/CERTIFICADO-DIGITAL-${ajustName}.jpeg`

        const newDefault = defaultUserData.map((item => {
            if (item.id === 'link') {
                return { id: 'link', label: 'Link Certificado', defaultValue: newDef }
            } else {
                return item
            }
        }))

        dispatch.setUserData({ ...userData, link: newDef })
        dispatch.setDefaultUserData(newDefault)

        domtoimage.toJpeg(document.getElementById('certificado'), { quality: 0.95 })
            .then(function (dataUrl) {

                var link = document.createElement('a');
                link.download = `CERTIFICADO DIGITAL ${userData.nome}.jpeg`;
                link.href = dataUrl;
                link.click();

                /* const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.setAttribute("download", `CERTIFICADO DIGITAL ${userData.nome}.jpeg`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link); */
            });
    }


    const downloadDocvalido = () => {


        if (
            userData.nome.trim() === ''
            || userData.ensino.trim() === ''
            || userData.instituicao.trim() === ''
            || userData.curso.trim() === ''
            || userData.rg.trim() === ''
        ) {
            return notify('Os campos Nome, Nível de Ensino, Instituição, Curso, Rg, são obrigatórios para poder baixar o Documento válido!')
        }

        if (currentImagem.length === 0) {
            return notify('Adicione uma imagem para poder baixar o Documento válido!')
        }

        var ajustName = primeiraLetraMaiuscula(userData?.nome?.toUpperCase())

        const newDef = `https://carteirinhasdeestudante.com.br/wp-content/uploads/${ajustName}.jpeg`

        const newDefault = defaultUserData.map((item => {
            if (item.id === 'linkQr') {
                return { id: 'linkQr', label: 'Link QR Code', defaultValue: newDef }
            } else {
                return item
            }
        }))

        dispatch.setUserData({ ...userData, linkQr: newDef })
        dispatch.setDefaultUserData(newDefault)

        domtoimage.toJpeg(document.getElementById('docvalido'), { quality: 0.95 })
            .then(function (dataUrl) {

                var link = document.createElement('a');
                link.download = `${userData.nome}.jpeg`;
                link.href = dataUrl;
                link.click();

                /* const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.setAttribute("download", `${userData.nome}.jpeg`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link); */
            });
    }


    return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <DivCarteira style={{ width: '500px', height: '670px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '10px', boxShadow: '4px 2px 20px #3332' }}>
                <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {
                        device === 'Pc' &&
                        <>
                            {selectedCarteira === 1 && <PCPdf1 refe={componentRefPdf} />}
                            {selectedCarteira === 2 && <PCPdf2 refe={componentRefPdf} />}
                            <Certificado />
                            <DocValido />

                            <PCPng1 />
                            <PCPng2 />
                        </>
                    }

                    {
                        device === 'Android' &&
                        <>
                            {selectedCarteira === 1 ?
                                <PCPdf1 refe={componentRefPdf} />
                                :
                                <PCPdf2 refe={componentRefPdf} />
                            }

                            <Certificado />
                            <DocValido />
                            <PCPng1 />
                            <PCPng2 />
                        </>
                    }

                    {
                        device === 'Iphone' &&
                        <>
                            {selectedCarteira === 1 ?
                                <PCPdf1 refe={componentRefPdf} />
                                :
                                <PCPdf2 refe={componentRefPdf} />
                            }

                            <Certificado />
                            <DocValido />

                            <PCPng1 />
                            <PCPng2 />
                        </>
                    }


                    {/* {
                        selectedCarteira === 1 ?
                            <PreviewCarteira1 />
                            :
                            <PreviewCarteira2 />
                    } */}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', height: '100px', justifyContent: 'space-around' }}>

                    <div style={{ display: 'flex', justifyContent: 'center' }} >
                        <Button style={{ background: '#13B2E8', height: '35px', margin: '0 5px' }} variant="contained" onClick={() => { dispatch.setSelectedCarteira(1) }} >1</Button>
                        <Button style={{ background: '#13B2E8', height: '35px', margin: '0 5px' }} variant="contained" onClick={() => { dispatch.setSelectedCarteira(2) }} >2</Button>
                    </div>
                    <div style={{ display: 'flex' }}>
                        {selectedCarteira <= 2 && <>
                            <ReactToPrint
                                trigger={() => <Button style={{ background: '#13B2E8', height: '35px', margin: '0 5px' }} variant="contained">PDF</Button>}
                                content={() => componentRefPdf.current}
                                /* onAfterPrint={() => { setOpen(false) }} */
                                pageStyle={selectedCarteira === 1 ? pageStylePdf1 : pageStylePdf2}
                                documentTitle={`CARTEIRA ${userData?.nome?.toUpperCase() === undefined ? '' : userData?.nome?.toUpperCase()}`}
                            />
                            <Button style={{ background: '#13B2E8', height: '35px', margin: '0 5px' }} variant="contained" onClick={downloadSelectedPng} >PNG</Button>
                        </>
                        }
                        <Button style={{ background: '#13B2E8', height: '35px', margin: '0 5px' }} variant="contained" onClick={downloadCertificado} >Certificado</Button>
                        <Button style={{ background: '#13B2E8', height: '35px', margin: '0 5px' }} variant="contained" onClick={downloadDocvalido} >Doc Válido</Button>
                    </div>
                </div>
            </DivCarteira>
        </div>
    )
}


const pageStylePdf1 = `@page {
    size: 250px 450px;
    margin: 0px;
    padding: 0px
  }
  @media print { 
    html, body {
    height: 100vh; 
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden;
    }
  }
   `
const pageStylePdf2 = `@page {
    size: 450px 275px;
    margin: 0px;
    padding: 0px
  }
  @media print { 
    html, body { 
    margin: 0 !important;
    padding: 0 !important;
    }
  }
   `
