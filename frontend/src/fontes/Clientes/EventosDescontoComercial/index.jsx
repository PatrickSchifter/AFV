import styled from 'styled-components'
import { useEffect, useContext, useState} from 'react'
import { fetchItems } from '../../../utils/fetch'
import { AuthContext } from '../../../auth'

import Input from '../../../components/Input'
import SelectSituacao from '../../../components/SelectSituacao'
import GradeCascataFaixa from '../GradeCascataFaixa';
import Frame from '../../../components/Frame'

const Main = styled.div`
    display: flex;
    width: 99%;
    height: 99%;
    margin: 0.5%;
`
const ContainerCascata = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    width: 110%;
    margin-top: 2%;
`

const EventosDeDescontoComercial = ({IDCascata}) => {
    const {setIsAuthenticated} = useContext(AuthContext);
    const [state, setState] = useState({})

    useEffect(() => {
            async function getData(){
                const url = process.env.REACT_APP_API_URL + `cascata/idcascata=${IDCascata}`;
                const dados = await fetchItems(url, 'GET', null, setIsAuthenticated)
                if(dados.status === 404){
                    return
                }else{
                    setState(dados.data[0])
                }
            }
            getData();
            }, [IDCascata])

    return (
        <Frame width='100%' height='95%' margin='1%'>
            <Main>
                <ContainerCascata>
                    <Input name='codigo' type='text' description='Código' value={state.IDCascata ? state.IDCascata : ''} disabled={true} width='25%' margin='0px 20px 0px 0px' />
                    <SelectSituacao description='Situação' width='60%' value={state.Situacao ? state.Situacao : ''} disabled={true} />
                    <Input name='descricao' type='text' description='Descrição' value={state.DesCascata ? state.DesCascata : ''} disabled={true} width='90%' margin='0px 0px 0px 0px' onlyUppercase />
                </ContainerCascata>
                <GradeCascataFaixa IDCascata={IDCascata}/>
            </Main>
        </Frame>
    )
}

export default EventosDeDescontoComercial