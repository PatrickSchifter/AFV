import styled from 'styled-components';

export const Main = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`

export const TabContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 47px;
    width: 100%;
`

export const Tab = styled.div`
    border-top: ${props => props.activeTab ? '1px solid rgb(209, 207, 207)': '' };
    border-left: ${props => props.activeTab ? '1px solid rgb(209, 207, 207)': '' };
    border-right: ${props => props.activeTab ? '1px solid rgb(209, 207, 207)': '' };
    border-bottom: ${props => props.activeTab ? '' : '1px solid rgb(209, 207, 207)'};
    width: ${props => props.width};
    border-radius: 5px 5px 0 0;
    height: 29px;
    text-align: center;

    &:hover{
        border-top: ${props => !props.activeTab ? '1px solid rgb(209, 207, 207)': '' };
        border-left: ${props => !props.activeTab ? '1px solid rgb(209, 207, 207)': '' };
        border-right: ${props => !props.activeTab ? '1px solid rgb(209, 207, 207)': '' };
    }
`
export const Dados = styled.div`
    display: ${props => props.activeTab ? 'flex': 'none' };
    flex-wrap: wrap;
    width: 100%;
    height: calc(100% - 47px);
    margin: 0 2%;
`

export const ConfigEmail = styled.div`
    display: ${props => props.activeTab ? 'flex': 'none' };
    flex-wrap: wrap;
    width: 100%;
    height: calc(100% - 47px);
    margin: 0 2%;
`

export const Img = styled.img`
    max-width: 210px;
    max-height: 180px;
`

export const ContainerImage = styled.div`
    min-width: 210px;
    min-height: 180px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(209, 207, 207);
    border-radius: 5px;
    position: relative;
`
export const ContainerImageLabel = styled.div`
    display: flex;
    flex-direction: column;
    max-height: 200px;
    align-items: center;
`

export const Section = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 70%;
    min-height: 211px;
`

export const ContainerInputs = styled.div`
    display: flex;
    width: 100%;
`
