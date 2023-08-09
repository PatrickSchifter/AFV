import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowMinimize, faTimes  } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';


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
    height: 36px;
    border-radius: 5px 5px 0px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const PHeader = styled.p`
    margin-left: 10px;
    font-weight: 500;
`

const PopUpSecondary = ({openPopUp, setOpenPopUp, children, width, height, header}) => {

    const windowW = window.innerWidth / 4 + 50;
    const windowH = window.innerHeight / 4 + 50;
    
    const handleClosePopUp = () => {
        setOpenPopUp(false)
    }

    return (
        <div
            style={{
                display: openPopUp ? 'block' : 'none',
                position: 'fixed',
                left: windowW,
                top: windowH,
                background: 'white',   
                width: width,
                height: height,
                boxShadow: '0 .5rem 1rem rgba(0,0,0,.15)'   ,
                border: '1px solid #dee2e6',
                borderRadius: '5px',
                zIndex: 1
            }}
        >
            <Header>
                <PHeader>{header}</PHeader>
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
                    {children}
                </div>
            </div>
        </div>
    );
};

export default PopUpSecondary;