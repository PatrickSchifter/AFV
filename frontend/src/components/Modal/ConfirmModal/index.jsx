import styled from "styled-components"
import { AiOutlineExclamationCircle } from 'react-icons/ai'


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

const ButtonNo = styled.button`
    width: 91px;
    height: 43px;
    background-color: #C1C1C1;
    border: 1px solid #C1C1C1;  
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

const ConfirmModal = ({openModal, setOpenModal, header, action, caseYes}) => {
    const handleClickYes = () => {
        caseYes.func(caseYes.param);
        setOpenModal(false);
    }

    return (
        <Main openModal={openModal}>
            <Container>
                <AiOutlineExclamationCircle size={50} color="#F8BD86" />
                <HeaderP>{header}</HeaderP>
                <ActionP>{action}</ActionP>
                <ButtonWrapper>
                    <ButtonYes onClick={handleClickYes}>Sim</ButtonYes>
                    <ButtonNo onClick={() => setOpenModal(false)}>Não</ButtonNo>
                </ButtonWrapper>
            </Container>
        </Main>
    )
}

export default ConfirmModal

/* 
O parâmetro caseYes é acionado ao apertar o botão SIM. Esse parâmetro recebe um objeto contendo as keys func e param
Sendo func a função que será acionada e essa função irá receber SOMENTE o param. 
O param é uma lista de parâmetros que a função precisa para funcionar adequadamente e deve-se lidar com os itens da lista dentro da função
*/