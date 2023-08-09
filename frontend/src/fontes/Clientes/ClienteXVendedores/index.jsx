import {useState, useEffect, useReducer, useContext} from 'react'
import styled from 'styled-components'

import ComboVClienteVendedorCombo from '../../../components/Combo/ComboVClienteVendedorCombo'
import ComboCascata from '../../../components/Combo/ComboCascata'
import ComboVolume from '../../../components/Combo/ComboVolume'
import ButtonActionBlue from '../../../components/ButtonActionBlue'
import GradeClienteXVendedores from '../GradeClienteXVendedores'
import ClienteVisita from '../ClienteVisita'
import WarningModal from '../../../components/Modal/WarningModal';
import ConfirmModal from '../../../components/Modal/ConfirmModal';

import { salvarDados, initialState, obtemDados, handleDelete } from './service'
import { AuthContext } from '../../../auth' 
import { fetchItems } from '../../../utils/fetch'

const Main = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 97%;
    height: 100%;
    margin: 15px;
`

const TableWrap = styled.div`
    overflow-y: auto;
    overflow-x: auto;
    height: 40%;
    width: 100%;
`


const ClienteXVendedores = ({IDCliente}) => {

    const {setIsAuthenticated} = useContext(AuthContext)
    const urlPost = process.env.REACT_APP_API_URL + `cliente-visita`;
    const token = localStorage.getItem('token');

    const reducer = (state, action) => {
        switch(action.type){
            case 'setVendedor':
                return {...state, IDUsuario: action.payload.IDUsuario, TipoUsuario: action.payload.TipoUsuario}
            case 'setDescontoComercial':
                return {...state, IDCascata: action.payload}
            case 'setDescontoVolume':
                return {...state, IDVolume: action.payload}
            case 'setIDCliente':
                return {...state, IDCliente: action.payload}
            case 'setModo':
                return {...state, Modo: action.payload}
            case 'setIDClienteVendedor':
                return {...state, IDClienteVendedor: action.payload}
            case 'setSeg':
                return {...state, Seg: action.payload}
            case 'setTer':
                return {...state, Ter: action.payload}
            case 'setQua':
                return {...state, Qua: action.payload}
            case 'setQui':
                return {...state, Qui: action.payload}
            case 'setSex':
                return {...state, Sex: action.payload}
            case 'setSab':
                return {...state, Sab: action.payload}
            case 'setDom':
                return {...state, Dom: action.payload}
            case 'setHora1':
                return {...state, Hora1: action.payload}
            case 'setHora2':
                return {...state, Hora2: action.payload}
            case 'setRecorrencia':
                return {...state, Recorrencia: action.payload}
            case 'updateSeg':
                fetchItems(urlPost, 'POST', {dados_cliente_visita: {...state, Seg: action.payload}}, setIsAuthenticated)
                return {...state, Seg: action.payload}
            case 'updateTer':
                fetchItems(urlPost, 'POST', {dados_cliente_visita: {...state, Ter: action.payload}}, setIsAuthenticated)
                return {...state, Ter: action.payload}
            case 'updateQua':
                fetchItems(urlPost, 'POST', {dados_cliente_visita: {...state, Qua: action.payload}}, setIsAuthenticated)
                return {...state, Qua: action.payload}
            case 'updateQui':
                fetchItems(urlPost, 'POST', {dados_cliente_visita: {...state, Qui: action.payload}}, setIsAuthenticated)
                return {...state, Qui: action.payload}
            case 'updateSex':
                fetchItems(urlPost, 'POST', {dados_cliente_visita: {...state, Sex: action.payload}}, setIsAuthenticated)
                return {...state, Sex: action.payload}
            case 'updateSab':
                fetchItems(urlPost, 'POST', {dados_cliente_visita: {...state, Sab: action.payload}}, setIsAuthenticated)
                return {...state, Sab: action.payload}
            case 'updateDom':
                fetchItems(urlPost, 'POST', {dados_cliente_visita: {...state, Dom: action.payload}}, setIsAuthenticated)
                return {...state, Dom: action.payload}
            case 'updateHora1':
                fetchItems(urlPost, 'POST', {dados_cliente_visita: {...state, Hora1: action.payload}}, setIsAuthenticated)
                return {...state, Hora1: action.payload}
            case 'updateHora2':
                fetchItems(urlPost, 'POST', {dados_cliente_visita: {...state, Hora2: action.payload}}, setIsAuthenticated)
                return {...state, Hora2: action.payload}
            case 'updateRecorrencia':
                fetchItems(urlPost, 'POST', {dados_cliente_visita: {...state, Recorrencia: action.payload}}, setIsAuthenticated)
                return {...state, Recorrencia: action.payload}
            default:
                return state
        }
    }
    

    const [state, dispatch] = useReducer(reducer, initialState);
    const [openWarningModal, setOpenWarningModa] = useState(false)
    const [warningMessage, setWarningMessage] = useState('')
    const [openConfirmModal, setOpenConfirmModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null)
    const [update, setUpdate] = useState(true)
    const [dadosGrade, setDadosGrade] = useState([])


    const ClienteVendedorExistente = dadosGrade.some((obj) => {
        return (
            obj.IDCliente === state.IDCliente &&
            obj.IDUsuario === state.IDUsuario &&
            obj.TipoUsuario === state.TipoUsuario &&
            obj.IDCascata === state.IDCascata &&
            obj.IDVolume === state.IDVolume
        );
    });

    async function handleInsertButton() {
        if(state.IDUsuario > 0){

            if(ClienteVendedorExistente && state.Modo === 'I'){
                setWarningMessage('Vendedor já inserido para esse cliente')
                setOpenWarningModa(true)
            }else if(state.Modo === 'I'){
                salvarDados(state, setIsAuthenticated);
                dispatch({type: 'setVendedor', payload:{IDUsuario: '', TipoUsuario: ''}})
                dispatch({type: 'setDescontoComercial', payload:''})
                dispatch({type: 'setDescontoVolume', payload:''})
                setSelectedRow(null)
            
            }else if(state.Modo === 'A'){
                salvarDados(state, setIsAuthenticated);
                dispatch({type: 'setModo', payload:'I'})
                dispatch({type: 'setVendedor', payload:{IDUsuario: '', TipoUsuario: ''}})
                dispatch({type: 'setDescontoComercial', payload:''})
                dispatch({type: 'setDescontoVolume', payload:''})
                dispatch({type: 'setIDClienteVendedor', payload:null})
                dispatch({type: 'setSeg', payload: 'N'})
                dispatch({type: 'setTer', payload: 'N'})
                dispatch({type: 'setQua', payload: 'N'})
                dispatch({type: 'setQui', payload: 'N'})
                dispatch({type: 'setSex', payload: 'N'})
                dispatch({type: 'setSab', payload: 'N'})
                dispatch({type: 'setDom', payload: 'N'})
                dispatch({type: 'setHora1', payload: ''})
                dispatch({type: 'setHora2', payload: ''})
                dispatch({type: 'setRecorrencia', payload: ''})
                setSelectedRow(null)
            }
            setUpdate((old) => !old);
            obtemDados(setDadosGrade, IDCliente);
        }else{
            setWarningMessage('É necessário selecionar um Vendedor')
            setOpenWarningModa(true)
        }
    }
        

    const handleClickNovo =()=>{
        dispatch({type: 'setModo', payload:'I'})
        dispatch({type: 'setVendedor', payload:{IDUsuario: '', TipoUsuario: ''}})
        dispatch({type: 'setDescontoComercial', payload:''})
        dispatch({type: 'setDescontoVolume', payload:''})
        dispatch({type: 'setIDClienteVendedor', payload:null})
        dispatch({type: 'setSeg', payload: 'N'})
        dispatch({type: 'setTer', payload: 'N'})
        dispatch({type: 'setQua', payload: 'N'})
        dispatch({type: 'setQui', payload: 'N'})
        dispatch({type: 'setSex', payload: 'N'})
        dispatch({type: 'setSab', payload: 'N'})
        dispatch({type: 'setDom', payload: 'N'})
        dispatch({type: 'setHora1', payload: ''})
        dispatch({type: 'setHora2', payload: ''})
        dispatch({type: 'setRecorrencia', payload: ''})
        setSelectedRow(null)
    }

    useEffect(() => {
        obtemDados(setDadosGrade, IDCliente);
        dispatch({type: 'setIDCliente', payload:IDCliente})
    }, [])

    return (
        <Main>
            <ComboVClienteVendedorCombo value={state.IDUsuario} width='100%' margin='0px 0px 15px 0px' dispatch={{dispatch: dispatch, type: 'setVendedor'}} />
            <ComboCascata value={state.IDCascata} width='38%' dispatch={{dispatch: dispatch, type: 'setDescontoComercial'}} />
            <ComboVolume value={state.IDVolume} width='38%' dispatch={{dispatch: dispatch, type: 'setDescontoVolume'}} />
            <ButtonActionBlue title={state.Modo === 'I' ? 'Incluir': state.Modo === 'A' ? 'Salvar': ''} onClick={handleInsertButton} />
            <ButtonActionBlue title='Novo' onClick={handleClickNovo} margin='0px' />
            <TableWrap>
                <GradeClienteXVendedores 
                    IDCliente={IDCliente}
                    dispatch={dispatch} 
                    selectedRow={selectedRow} 
                    setSelectedRow={setSelectedRow} 
                    state={state}
                    setOpenConfirmModal={setOpenConfirmModal}
                    setUpdate={setUpdate}
                    update={update}
                />
            </TableWrap>
            <ClienteVisita state={state} dispatch={dispatch} />
            <WarningModal openModal={openWarningModal} setOpenModal={setOpenWarningModa} header='Dados Clientes' action={warningMessage} />
            <ConfirmModal openModal={openConfirmModal} setOpenModal={setOpenConfirmModal} header='Dados Clientes' action='Tem certeza que deseja excluir esse registro?' caseYes={{func: handleDelete, param: [dispatch, state.IDClienteVendedor, setSelectedRow, setDadosGrade, IDCliente, setIsAuthenticated, setUpdate]}} />
        </Main>
    )
}

export default ClienteXVendedores