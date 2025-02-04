import styled from "styled-components"

export const PseudoElemento = styled.div`
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url('https://img.freepik.com/vetores-gratis/fundo-de-formas-abstratas-brancas_79603-1362.jpg');
  background-size: cover;
  opacity: 0.6; /* Ajuste a opacidade conforme necessário (0 = transparente, 1 = opaco) */
`;

export const PngsDiv = styled.div` 
@media (max-width: 1100px) {
    display: none ;  

  } 
`;

export const DivHome = styled.div` 
    display: flex;
    background: #ebebeb; 
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background-color: #13b2e8; 

    > div:nth-child(1){
        position: relative;
        width: 50%;
        height: calc(100vh);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    > div:nth-child(2){
        position: relative;
        width: 50%;
        height: calc(100vh);
    }

  @media (max-width: 1100px) { 
    flex-direction: column-reverse;

    > div:nth-child(1){
        position: relative;
        width: 100%;
        height: 100%; 
        margin: 20px 0px;
    }

    > div:nth-child(2){
        position: relative;
        width: 100%;
        height: 100%;
        margin-bottom: 100px;
    }
  }

/* 
    > div:nth-child(1){
        width: 50%;
        height: calc(100vh);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    > div:nth-child(2){
        width: 50%;
        height: calc(100vh);
    }

  @media (max-width: 1000px) { 
    flex-direction: column-reverse;

    > div:nth-child(1){
        width: 100%;
        height: 100%;
        margin: 20px 0px;
    }

    > div:nth-child(2){
        width: 100%;
        height: 100%;
        margin-bottom: 100px;
    }
  } */

 
`