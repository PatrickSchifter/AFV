import styled from 'styled-components'
import {useReducer, useEffect, useContext, useState} from 'react'
import { fetchItems } from '../../../utils/fetch'
import { AuthContext } from '../../../auth'
import { handleBlurPercentualMaximo } from '../../../utils/utils'
import { handleDelete } from './services'

import Frame from '../../../components/Frame'
import Input from '../../../components/Input'
import ButtonActionBlue from '../../../components/ButtonActionBlue'
import Flag from '../../../components/Flag'
import SelectSituacao from '../../../components/SelectSituacao'
import SucessModal from '../../../components/Modal/SucessModal'
import GradeCascataFaixa from '../GradeCascataFaixa'
import WarningModal from '../../../components/Modal/WarningModal'
import ConfirmModal from '../../../components/Modal/ConfirmModal'

const Main = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
`
const ContainerCascata = styled.div`
    display: flex;
    width: 97%;
    margin-top: 2%;
`
const ContainerFaixa = styled.div`
    display: flex;
    width: 97%;
    height: 70%;
`

const ContainerInputFaixa = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-content: flex-start;
    width: 348px;
    height: 100%;
    margin: 0px 15px 0px 6px;
`

const EventosDeDescontoComercial = ({IDCascata, Modo, setUpdate}) => {

    const initialState = {
        IDCascata: Modo === 'I' ? null : IDCascata,
        DesCascata: null,
        Situacao: 'A',
        Modo: Modo,
        Sigla:null,
        PerMaximo: null,
        TipoCascata: 'N',
        IDCascataFaixa: null
    }

    const reducer = (state, action) => {
        switch(action.type){
            case 'setDados':
                return {...state, ...action.payload}
            case 'setDesCascata':
                return {...state, DesCascata: action.payload === '' ? null : action.payload.toUpperCase()}
            case 'setSituacao':
                return {...state, Situacao: action.payload === '' ? null : action.payload}
            case 'setModo':
                return {...state, Modo: action.payload}
            case 'setSigla':
                return {...state, Sigla: action.payload === '' ? null : action.payload}
            case 'setPerMaximo':
                return {...state, PerMaximo: action.payload}
            case 'setDescontoCascata':
                return {...state, TipoCascata: action.payload}
            case 'setInitialFaixa':
                return {...state, TipoCascata: 'N', PerMaximo: null, Sigla:null}
            case 'setIDCascataFaixa':
                return {...state, IDCascataFaixa: action.payload}
            default:
                return state;
        }
    }

    const [faixa, setFaixa] = useState([])
    const [openModalSucess, setOpenModalSucess] = useState(false)
    const [openModalWarning, setOpenModalWarning] = useState(false)
    const [openModalConfirm, setOpenModalConfirm] = useState(false)
    const [updateGrade, setUpdateGrade] = useState(true)
    const [state, dispatch] = useReducer(reducer, initialState);
    const [warningMessage, setWarningMessage] = useState('')
    const [sucessMensage, setSucessMensage] = useState('')
    const {setIsAuthenticated} = useContext(AuthContext);

    useEffect(() => {
        if(state.Modo === 'A' || state.Modo === 'V'){
            async function getData(){
                const url = process.env.REACT_APP_API_URL + `cascata/idcascata=${IDCascata}`;
                const dados = await fetchItems(url, 'GET', null, setIsAuthenticated)
                if(dados.status === 404){
                    dispatch({type: 'setDados', payload: {IDCascata: '', DesCascata:'', Situacao: ''}})
                }else{
                    dispatch({type: 'setDados', payload: dados.data[0]})
                }
            }
            getData();
        }else if(state.Modo === 'I'){
            return
        }
    }, [])

    const dadosPreenchidos = state.DesCascata !== null && state.Situacao !== null

    const handleClickSalvar = async () =>{
        if(state.DesCascata == null){
            setWarningMessage('É necessário preencher a Descrição');
            setOpenModalWarning(true);
        }else if(state.Situacao == null){
            setWarningMessage('É necessário selecionar a Situação');
            setOpenModalWarning(true);
        }else{
            await setUpdate(false);
            if(state.Modo === 'A'){
                if(state.IDCascata && dadosPreenchidos){
                    const url = process.env.REACT_APP_API_URL + `cascata`;
                    await fetchItems(url, 'PATCH', {dados_cascata: state})
                    setSucessMensage('Desconto alterado com sucesso')
                    setOpenModalSucess(true)
                }
            }else if(state.Modo === 'I'){
                if(dadosPreenchidos){
                    const url = process.env.REACT_APP_API_URL + `cascata`;
                    const response = await fetchItems(url, 'POST', {dados_cascata: state});
                    dispatch({type:'setDados', payload:{IDCascata: response.data.recordset[0].IDCascata, DesCascata: state.DesCascata, Situacao: state.Situacao}})
                    setSucessMensage('Desconto inserido com sucesso');
                    setOpenModalSucess(true);
                    dispatch({type: 'setModo', payload: 'A'});
                }
            }
            await setUpdate(true);
        }
        
    }

    const handleChangeMaximo = (event) => {
        const inputValue = event.target.value;
        const numericValue = /^\d*\.?\d*$/.test(inputValue) ? inputValue : state.PerMaximo;
        dispatch({type:'setPerMaximo', payload:numericValue})
    };

    const handleInserirFaixa = async () =>{
        if(state.Sigla == null){
            setWarningMessage('É necessário preencher a Sigla');
            setOpenModalWarning(true);
        }else if(state.PerMaximo == null){
            setWarningMessage('É necessário preencher o Maximo (%)');
            setOpenModalWarning(true);
        }else{
            const url = process.env.REACT_APP_API_URL + `cascata-faixa`;
            const response = await fetchItems(url, 'POST', {dados_cascata_faixa: {...state, PerMaximo: parseFloat(state.PerMaximo)}}, setIsAuthenticated);
            let novaFaixa = faixa;
            novaFaixa.push({IDCascataFaixa: response.data.recordset[0].IDCascataFaixa, IDCascata: IDCascata, Sigla: state.Sigla, PerMaximo: state.PerMaximo, TipoCascata: state.TipoCascata});
            setFaixa(novaFaixa);
            dispatch({type: 'setInitialFaixa'});
        }
}

    return (
    <Main>
        <Frame width='98%' margin='10px 0px 0px 0px' height='85px'>
            <ContainerCascata>
                <Input name='codigo' type='text' description='Código' value={state.IDCascata} disabled={true} width='20%' margin='0px 20px 0px 0px' />
                <Input name='descricao' type='text' description='Descrição' value={state.DesCascata} disabled={!(state.Modo === 'A' || state.Modo === 'I')} onChange={(e)=>dispatch({type:'setDesCascata', payload:e.target.value})} width='50%' margin='0px 20px 0px 0px' onlyUppercase />
                <SelectSituacao description='Situação' width='30%' value={state.Situacao} disabled={!(state.Modo === 'A' || state.Modo === 'I')} onChange={(e)=>dispatch({type:'setSituacao', payload:e.target.value})} />
                <ButtonActionBlue title={state.Modo === 'A' || state.Modo === 'V' ? 'Salvar' : state.Modo === 'I' ? 'Incluir': ''} margin='0px' onClick={handleClickSalvar} disabled={!(state.Modo === 'A' || state.Modo === 'I')} />
            </ContainerCascata>
        </Frame>
        <ContainerFaixa>
            <ContainerInputFaixa>
                <Input name='sigla' type='text' description='Sigla' value={state.Sigla} width='100px' disabled={!(state.Modo === 'A')} onChange={(e)=>dispatch({type:'setSigla', payload:e.target.value})} margin='0px 20px 0px 0px' onlyUppercase maxLength={6} />
                <Input name='maximo' type='text' description='Maximo (%)' value={state.PerMaximo} width='100px' disabled={!(state.Modo === 'A')} onChange={handleChangeMaximo}  margin='0px' inputMode='decimal' onBlur={() => handleBlurPercentualMaximo(state.PerMaximo, dispatch, 'setPerMaximo')}  />
                <Flag name='descontocascata' description='Desconto Cascata' value={state.TipoCascata} disabled={!(state.Modo === 'A')} dispatch={{dispatch:dispatch, type: 'setDescontoCascata'}} width='97%' margin='0px' />
                <ButtonActionBlue title='Incluir' justButton margin='15px 0px 0px 0px' onClick={handleInserirFaixa} />
            </ContainerInputFaixa>
            {updateGrade ? <GradeCascataFaixa IDCascata={state.IDCascata} setUpdate={setUpdateGrade} faixa={faixa} setFaixa={setFaixa} setOpenModalConfirm={setOpenModalConfirm} dispatch={dispatch} Modo={Modo} />: <></>}
        </ContainerFaixa>
        <SucessModal openModal={openModalSucess} setOpenModal={setOpenModalSucess} action={sucessMensage} />
        <WarningModal openModal={openModalWarning} setOpenModal={setOpenModalWarning} header='Eventos de Desconto Comercial' action={warningMessage} />
        <ConfirmModal openModal={openModalConfirm} setOpenModal={setOpenModalConfirm} header='Eventos de Desconto Comercial' action='Tem certeza que deseja excluir esse registro?' caseYes={{func: handleDelete, param:[dispatch,state.IDCascataFaixa, setIsAuthenticated, setUpdateGrade]}} />
    </Main>
    )
}

export default EventosDeDescontoComercial