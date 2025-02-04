import styled from "styled-components"

export const DivInput = styled.div` 
@media (max-width: 1100px) { 
        display: flex;
        flex-direction: column;
        width: 300px !important;
    }
`

export const DivInputForm = styled.div` 
height: 650px;
@media (max-width: 1100px) { 
        height: 900px;
        width: 300px !important;
    }
`

export const DivDrop = styled.div` 
@media (max-width: 1100px) { 
        margin: 0 !important;
    }
`

export const SectionUpload = styled.div`
    cursor: pointer; 
    width: 150px;
    margin-left: 10px;
    height: 20px;
    background: #00000006;
`

export const InputForm = styled.input`
    @media (max-width: 1100px) { 
        width: 100%;
    }
    background: rgba(255,255,255,0.1);
    border: none;
    font-size: 16px;
    height: 20px;
    margin: 0;
    height: 30px;
    outline: 0;
    padding: 2px 2px;
    width: 100%;
    background-color: #e8eeef;
    color: #8a97a0;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(0,0,0,0.03) inset;
    margin-bottom: 5px;
`

export const LabelInput = styled.h3`
    font-weight: 400;
    display: inline;
`