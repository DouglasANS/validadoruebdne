import React, { useRef } from 'react'
/* import info from '../assets/info.png'; */
import { DivDrop, DivInput, DivInputForm, InputForm, LabelInput } from './style';
import { useFomaularioStorage } from '../../storage';
import DropFixImage from '../DropFixImage';

export default function Formulario() {

    const { defaultUserData } = useFomaularioStorage(state => state.dados)
    const dispatch = useFomaularioStorage(state => state.dispatch)

    const refIputs = useRef(null)

    const takeInput = () => {
        const inputs = refIputs.current.getElementsByTagName("input")

        let valueInputs = {}

        for (let input of inputs) {
            valueInputs[input.id] = input.value
        }
        dispatch.setUserData(valueInputs)
    }

    var title = 'Cadastrar dados da carteira'

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
            <DivInputForm style={{ width: '500px', background: '#f4f7f8', padding: '10px 20px', borderRadius: '10px', boxShadow: '4px 2px 20px #3332' }}>

                <h1 style={{ fontSize: '18px', textAlign: 'center' }}>{title.toUpperCase()}</h1>

                <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0px' }}>

                    {/* <img style={{ width: '25px', height: '25px' }} src={info} alt="Informação" /> */}
                    <span style={{ marginLeft: '5px' }}>
                        Preencha o formulário abaixo com os dados solicitados
                    </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap' }} ref={refIputs}>
                    {
                        defaultUserData.map((item, index) => {
                            return (
                                <DivInput style={{ width: item.width || '100%', margin: item.margin || '0px' }} key={index}>
                                    <LabelInput for={item.id}>{item.label}</LabelInput>
                                    <InputForm id={item.id} label={item.label} onChange={() => { takeInput() }} defaultValue={item.defaultValue} />
                                </DivInput>
                            )
                        })
                    }
                </div>
                <DivDrop style={{marginTop: '50px', marginLeft: '160px'}}>
                    <DropFixImage />
                </DivDrop>

                
            </DivInputForm>
        </div>
    )
}
