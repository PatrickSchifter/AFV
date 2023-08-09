import React from 'react';
import styled from 'styled-components';
import { FaCogs } from 'react-icons/fa';

const Button = styled.button`
    color: white;
    background-color: #ea5c11;
    border-radius: 5px;
    box-shadow: none;
    border: #ea5c11;
    cursor: pointer;
    width: 100%;
    height: 35px;
`

const Main = styled.div`
    display: flex;
    flex-direction: column; 
    justify-content: flex-end;

    height: ${props => props.justButton ? '35px' : '57px'};
    width:  ${props => props.width ? props.width : '100px'};
    margin: ${props => props.margin ? props.margin : '0px 20px 15px 0px' };
`

const ButtonConfiguracao = ({onClick, width, justButton, margin}) => {
    return (
        <Main width={width} justButton={justButton} margin={margin}>
            <Button onClick={onClick} >{<FaCogs />} Configuração</Button>
        </Main> 
    )
}


export default ButtonConfiguracao;