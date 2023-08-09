import styled from "styled-components"
import { IoIosCheckmarkCircleOutline  } from 'react-icons/io'


const Main = styled.div`
    display: ${props => props.openModal ? 'flex' : 'none'} ;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
`

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    height: 200px;
    width: 400px;
    background-color: white;
`

const ButtonOK = styled.button`
    width: 91px;
    height: 43px;
    background-color: #8CD4F5;
    border: 1px solid #8CD4F5;  
    border-radius: 5px;
    color: white;
`

const ButtonYes = styled.button`
    width: 91px;
    height: 43px;
    background-color: #8CD4F5;
    border: 1px solid #8CD4F5;  
    border-radius: 5px;
    color: white;
`

const ButtonWrapper = styled.div`
    display: flex;
    width: 50%;
    justify-content: space-between;
`

const HeaderP = styled.p`
    font-family: Helvetica;
    color: #616161;
    font-weight: bold;
`

const ActionP = styled(HeaderP)`
    font-size: 14;
    font-weight:400;
`

const SucessModal = ({openModal, setOpenModal, action}) => {

    return (
        <Main openModal={openModal}>
            <Container>
                <IoIosCheckmarkCircleOutline style={{marginTop: '15px'}} size={50} color="#AADE8D" />
                <ActionP>{action}</ActionP>
                <ButtonOK onClick={() => setOpenModal(false)}>OK</ButtonOK>
            </Container>
        </Main>
    )
}

export default SucessModal
