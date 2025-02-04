import React from 'react'
import domtoimage from 'dom-to-image';
import { PDFDocument } from 'pdf-lib';
import { useGlobalCarteira } from '../../storage/globalCarteira';
import { jsPDF } from "jspdf";
import { getInfoAluno } from '../../Api';
import { Button } from '@mui/material';

export default function ButtonFisica({ data }) {

    const { setDataCarteira } = useGlobalCarteira.getState().dispatch

    const handleDownloadCarteiraFisica = () => {

        getInfoAluno({ email: data.email }).then(res => {
            const currentStudent = res.data.filter((item) => {
                if (item.ano == data.ano) {
                    return item
                }
            })
            console.log(currentStudent[0])
            setDataCarteira(currentStudent[0])
            downloadSelectedPng(currentStudent[0].nome)
        })
    }

    const downloadSelectedPng = (nome) => {
    
            var currentCarteira = 'CarteiraFisicaGlobal'
    
            domtoimage.toJpeg(document.getElementById(currentCarteira), { quality: 0.95 })
                .then(function (dataUrl) {
    
                    var link = document.createElement('a');
                    link.download = `${nome}.jpeg`;
                    link.href = dataUrl;
                    link.click();
    
                });
    
        }

    const downloadPDF = () => {
        const pdf = new jsPDF('p', 'pt', 'a4'); // Criar um PDF no formato A4

        const element = document.getElementById('CarteiraFisicaGlobal'); // ID do elemento a ser convertido em PDF
        if (!element) {
            console.error("Elemento não encontrado.");
            return;
        }

        pdf.html(element, {
            callback: (doc) => {
                // Baixar o PDF gerado
                doc.save("document.pdf");
            },
            x: 10, // Margem X
            y: 10, // Margem Y
            html2canvas: { scale: 0.8 }, // Configurações do html2canvas para ajustar a escala
        });
    };


    async function combinePDFsAndDownload() {

        const mergedPdf = await PDFDocument.create();


        try {
            const pngBase64 = await domtoimage.toJpeg(document.getElementById('CarteiraFisicaGlobal'), { quality: 0.99 });

            const imageBytes = base64ToArrayBuffer(pngBase64);
            const image = await mergedPdf.embedJpg(imageBytes);

            const page = mergedPdf.addPage([image.width, image.height]);
            page.drawImage(image, {
                x: 0,
                y: 0,
                width: image.width,
                height: image.height,
            });

            const mergedPdfBytes = await mergedPdf.save();
            const mergedBlob = new Blob([mergedPdfBytes], { type: 'application/pdf' });

            const blobURL = window.URL.createObjectURL(mergedBlob);

            const downloadLink = document.createElement('a');
            downloadLink.href = blobURL;
            downloadLink.download = 'merged_document.pdf';
            downloadLink.click();

            window.URL.revokeObjectURL(blobURL);

        } catch (error) {
            console.error('Erro ao gerar o PDF:', error);
        }
    }

    function base64ToArrayBuffer(base64) {
        const binaryString = window.atob(base64.split(',')[1]); // Remove o prefixo 'data:image/jpeg;base64,'
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }


    return (
        <div>
            <Button
                style={{ height: '35px', margin: '0 5px' }}
                variant="contained"
                onClick={handleDownloadCarteiraFisica}
            >
                Baixar Fisica
            </Button>
        </div>
    )
}
