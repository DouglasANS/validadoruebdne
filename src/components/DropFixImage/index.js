import { Button, Dialog } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
  } from 'react-image-crop'
  import 'react-image-crop/dist/ReactCrop.css'
  import { canvasPreview } from './canvasPreview';
import Dropzone from 'react-dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhotoFilm, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useFomaularioStorage } from '../../storage'

export const SectionUpload = styled.div`
cursor: pointer; 
width: 150px;
margin-left: 10px;
height: 20px;
background: #00000006;
`

export const InputForm = styled.input`  
    border: none;
    border-radius: 5px;
    width: 100%;
    height: 25px; 
    padding-left: 10px;
    outline: none;
`

export const Input = styled.input`
  background: rgba(255,255,255,0.1);
  border: none;
  font-size: 16px;
  height: 25px;
  padding: 15px;
  margin: 0;
  outline: 0; 
  width: 100%;
  background-color: #e8eeef;
  color: #8a97a0;
  box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
  margin-bottom: 5px; 
`

export const LabelInput = styled.h3`
  font-weight: 300;
  display: inline;
`

function centerAspectCrop(
    mediaWidth,
    mediaHeight,
    aspect,
  ) {
    return centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        aspect,
        mediaWidth,
        mediaHeight,
      ),
      mediaWidth,
      mediaHeight,
    )
  }
  
  function useDebounceEffect(
    fn,
    waitTime,
    deps,
  ) {
    useEffect(() => {
      const t = setTimeout(() => {
        fn.apply(undefined, deps)
      }, waitTime)
  
      return () => {
        clearTimeout(t)
      }
    }, deps)
  }
  

export default function DropFixImage({setImage = undefined}) {

  const { setCurrentImagem } = useFomaularioStorage(state => state.dispatch)

    const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef(null)
  const imgRef = useRef(null)
  const hiddenAnchorRef = useRef(null)
  const blobUrlRef = useRef('')
  const [crop, setCrop] = useState()
  const [completedCrop, setCompletedCrop] = useState()
  const [aspect, setAspect] = useState(7 / 9)
  const [open, setOpen] = React.useState(false);

  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  const onDropa = (files) => {  

    if (files && files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(files[0])
      handleClickOpen()
    }

   /*  const blob = new Blob([files[0]]);
            var render = new FileReader()
            render.readAsDataURL(blob)
            render.onload= () =>{
                var base64 = render.result;

                setCurrentImagem(base64);
            } */
};


  function onDownloadCropClick() {
    if (!previewCanvasRef.current) {
      throw new Error('Crop canvas does not exist')
    }



    previewCanvasRef.current.toBlob((blob) => {


       new Blob([blob]);
          var render = new FileReader()
          render.readAsDataURL(blob)
          render.onload= () =>{
              var base64 = render.result;
              if(setImage){
                setImage(base64)
              }else{
                setCurrentImagem(base64)
              } 
              handleClose()
          }




      /* if (!blob) {
        throw new Error('Failed to create blob')
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current)
      }
      blobUrlRef.current = URL.createObjectURL(blob)
      hiddenAnchorRef.current.href = blobUrlRef.current
      hiddenAnchorRef.current.click() */
    })

    handleClose()
  }


  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          1,
          0,
        )
      }
    },
    100,
    [completedCrop, 1, 0],
  )

  const handleClickOpen = () => {
    setOpen(true);
  }; 
  const handleClose = () => {
    /* document.getElementById('img111').value = '' */
    setImgSrc('')
    setOpen(false);
  };

  return (
    <div>
        <Dropzone onDrop={files => onDropa(files)}>
          {({getRootProps, getInputProps}) => (
              <SectionUpload {...getRootProps()}>
              <Input {...getInputProps()} />

              <Button startIcon={<FontAwesomeIcon icon={faPhotoFilm} />} style={{background: '#13B2E8'}} variant="contained" >Upload Image</Button>
                
            </SectionUpload>
          )}
          </Dropzone>


        {/* {currentImagem === null ? <div style={{display:'flex', justifyContent: 'end', alignItems: 'end', margin: '40px 0 0 10px'}}>
              <FontAwesomeIcon icon={faXmark} color='red' /> 
              <h4 style={{margin: '0px 0 0 5px'}}>Sem imagem</h4>
              </div>: 
              <img style={{marginLeft: '10px',width: '40px', height: '50px'}} src={currentImagem} />
              
            } */}

        <Dialog
            open={open}  
            onClose={handleClose}  
          > 
            <div style={{width: '500px', height: '360px', background: '#fff', display: 'flex', margin: '20px', justifyContent: 'center', alignItems: 'center'}}>
                {!!imgSrc && (
                  <div style={{width: '200px', height: '100%', background: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={aspect}
                      >
                        <img
                          ref={imgRef}
                          alt="Crop me"
                          src={imgSrc}
                          style={{ transform: `scale(${1}) rotate(${0}deg)`, width: '200px' }}
                          onLoad={onImageLoad}
                        />
                      </ReactCrop>
                  </div>
                )}

                {!!completedCrop && (
                    <>
                      <div style={{marginLeft: '10px'}}>
                        <h3>Prévia</h3>
                        <canvas
                          ref={previewCanvasRef}
                          style={{
                            border: '1px solid black',
                            objectFit: 'contain',
                            width: 100,
                            height: 128,
                          }}
                        />
                      </div>
                      <div style={{marginLeft: '10px'}}>
                        <Button variant="contained" onClick={onDownloadCropClick}>Salvar</Button>
                        <a
                          ref={hiddenAnchorRef}
                          download
                          style={{
                            position: 'absolute',
                            top: '-200vh',
                            visibility: 'hidden',
                          }}
                        >
                          Hidden download
                        </a>
                      </div>
                    </>
                  )}


               

            </div>
          </Dialog>
    </div>
  )
}
