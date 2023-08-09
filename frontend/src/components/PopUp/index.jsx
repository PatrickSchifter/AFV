import React, { useState, useRef, useEffect, useContext, startTransition } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowMinimize, faTimes  } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

import { ContentContext } from '../../contexts/contentContext';

import { configPopUp } from './service';


const WindowControlerButton = styled.div`
    display: flex;
    color: #0056b3;
    height: 100%;
    width: 54px;
`

const ButtonControllerWindow = styled.div`
    border: 1px solid #dee2e6;
    width: 50%;
    display: flex;
    align-items: center;    
    justify-content: center;

    &:hover{
        background-color: #dae0e594;
    }
`

const Header = styled.header`
    border-bottom: 1px solid rgba(0,0,0,.125);
    background-color: #f8f9fa;
    width: 100%;
    height: 7%;
    border-radius: 5px 5px 0px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const PHeader = styled.p`
    margin-left: 10px;
    font-weight: 500;
`

const PopUp = ({setIsDragging, position, setPosition, startPosition, setStartPosition, divRef, popUp}) => {

    const {state, dispatch} = useContext(ContentContext);

    const handleMouseDown = (event) => {
        event.preventDefault();
        setIsDragging(true);
        setStartPosition({
        x: event.clientX - position[popUp].x,
        y: event.clientY - position[popUp].y
        });
    };
    
    const handleClosePopUp = () => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        configPopUp(dispatch, null, false, '', '0px', '0px')

        const newArrayPosition = [...position];
        newArrayPosition[popUp] = {popUp: popUp, x: windowWidth / 4, y: windowHeight / 4 };
        setPosition(newArrayPosition);
    }
    
    useEffect(() => {
        const handleResize = () => {
            const { offsetWidth, offsetHeight } = divRef.current;
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            // Verifica se a posição atual ultrapassa os limites da janela
            let newPosition = { ...position[popUp] };
            if (newPosition.x + offsetWidth > windowWidth) {
                newPosition.x = windowWidth - offsetWidth;
            }
            if (newPosition.y + offsetHeight > windowHeight) {
                newPosition.y = windowHeight - offsetHeight;
            }

            const newArrayPosition = [...position];
            newArrayPosition[popUp] = newPosition;
            setPosition(newArrayPosition);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [position[popUp]]);

    return (
        <div
            ref={divRef}
            style={{
                display: state.openPopUp ? 'block' : 'none',
                position: 'fixed',
                left: position[popUp].x,
                top: position[popUp].y,
                background: 'white',   
                width: state.width,
                height: state.height,
                boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)'   ,
                border: '1px solid #dee2e6',
                borderRadius: '5px'
            }}
        >
            <Header onMouseDown={handleMouseDown}>
                <PHeader>{state.header}</PHeader>
                <WindowControlerButton>
                    <ButtonControllerWindow>
                        <FontAwesomeIcon icon={faWindowMinimize } />
                    </ButtonControllerWindow>
                    <ButtonControllerWindow onClick={handleClosePopUp}>
                        <FontAwesomeIcon icon={faTimes } />
                    </ButtonControllerWindow>
                </WindowControlerButton>
            </Header>
            <div
                style={{
                    background: '#fff',
                    width: '100%',
                    height: '90%'
                }}
            >
                <div style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
                    {state.popUpContent}
                </div>
            </div>
        </div>
    );
};

/*Esse componente renderiza o conteudo que é passado para o dispatch setOpenPopUp que está no ContentContext. 
Hint: O componente setado no dispatch openPopUp deve ser setado da seguinte forma: 

    dispatch({type:'setPopUpContent', payload: <Componente />})
    dispatch({type:'setOpenPopUp', payload: true})
    dispatch({type:'setHeader', payload: 'Texto Header Exemplo'})
    dispatch({type:'setWidth', payload: '1000px'}) Determina a largura do popup
    dispatch({type:'setHeight', payload: '700px'}) Determina a altura do popup

Essa configuração está disponivel de forma simplificada na função configPopUp(dispatch, componentPopUp, openPopUp, header, width, height) na pasta './service.js'

Ao chamar a função handleClosePopUp, o componente renderizado é anulado e sua posição é resetada para o valor padrão.
*/

export default PopUp;