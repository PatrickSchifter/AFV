import { useState, useContext, useEffect, useCallback } from 'react';
import styled from 'styled-components'
import { fetchItems } from '../../../utils/fetch';
import { AuthContext } from '../../../auth';

import Input from '../../../components/Input';
import SelectSituacao from '../../../components/SelectSituacao';
import GradeVolumeFaixa from '../GradeVolumeFaixa';

const ContainerInputs = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 50%;
    margin: 1%;
`
const ContainerMain = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`

const Frame = styled.div`
    width: 98%;
    height: 92%;
    margin: 1%;
    display: flex;
    justify-content: space-between;
    border: 1px solid #dfdfdf;  
    border-radius: 10px;
`

const DescontoVolumeFinanceiro = ({IDVolume}) => {
    const [state, setState] = useState({})

    const {setIsAuthenticated} = useContext(AuthContext)

    const getData = useCallback(async () => {
        const url = process.env.REACT_APP_API_URL + `volume/idvolume=${IDVolume}`;
        const dados = await fetchItems(url, 'GET', null, setIsAuthenticated);
        if(dados.status === 404){
            return
        }else{
            setState(dados.data[0])
        }
        console.log(state)
    }, [IDVolume])

    useEffect(()=>{
        getData();
    }, [IDVolume])

    return (
        <ContainerMain>
            <Frame>
                <ContainerInputs>
                    <Input name='codigo' type='text' description='Código' value={state.IDVolume ? state.IDVolume : ''} disabled={true} width='25%' margin='0px 20px 0px 0px' />
                    <Input name='descricao' type='text' description='Descrição' value={state.DesVolume ? state.DesVolume : ''} disabled={true} width='100%' margin='0px 0px 0px 0px' />
                    <Input name='datainicial' type='text' description='Data Inicial' value={state.DataInicial ? state.DataInicial : ''} disabled={true} width='30.1%' margin='0px 20px 0px 0px' />
                    <Input name='datafinal' type='text' description='Data Final' value={state.DataFinal ? state.DataFinal : ''} disabled={true} width='30.1%' margin='0px 20px 0px 0px' />
                    <SelectSituacao description='Situação' width='30.1%' value={state.Situacao ? state.Situacao : ''} disabled={true} margin='0px 0px 0px 0px' />
                </ContainerInputs>
                <GradeVolumeFaixa IDVolume={IDVolume} />
            </Frame>
        </ContainerMain>
    )
}

export default DescontoVolumeFinanceiro;