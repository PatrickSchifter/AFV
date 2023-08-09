import React, {useReducer, useCallback, useEffect, useContext, useState} from 'react'
import styled from 'styled-components';
import { fetchItems } from '../../../utils/fetch';
import { AuthContext } from '../../../auth';
import { formatarData } from '../../../utils/utils';
import { handleDelete } from './services';

import Input from '../../../components/Input';
import ButtonActionBlue from '../../../components/ButtonActionBlue';
import ButtonActionOrange from '../../../components/ButtonActionOrange';
import SucessModal from '../../../components/Modal/SucessModal';
import WarningModal from '../../../components/Modal/WarningModal';
import ConfirmModal from '../../../components/Modal/ConfirmModal';
import OfertaEstrutura from '../OfertaEstrutura';
import GradeOfertaEstrutura from '../GradeOfertaEstrutura';

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
`
const ContainerInputs = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 98%;
    margin:1% 1% 0 1%;
    min-height: 80px;
    border: 1px solid #dfdfdf;  
    border-radius: 10px;
`

const WrapperGrade = styled.div`
    max-width: 96%;
    min-height: 200px;
    margin-top: 10px;
`

const reducer = (state, action) => {
    switch(action.type){
        case 'setDados':
            let stateFormatado = action.payload;
            stateFormatado = {...stateFormatado, DtFinal: formatarData(stateFormatado.DtFinal), DtInicial: formatarData(stateFormatado.DtInicial)}
            return {...state, ...stateFormatado}
        case 'setDescricao':
            return {...state, Descricao: action.payload.toUpperCase()}
        case 'setDtInicial':
            return {...state, DtInicial: action.payload}
        case 'setDtFinal':
            return {...state, DtFinal: action.payload}
        case 'setModo':
            return {...state, Modo: action.payload}
        case 'setIDOferta':
            return {...state, IDOferta: action.payload}
        case 'setIDOfertaEstrutura':
            return {...state, IDOfertaEstrutura: action.payload} 
        default:
            return state
    }
}

const CadastroOfertas = ({Modo, IDOferta, setUpdate}) => {

    const initialState = {
        Modo: Modo,
        IDOferta: IDOferta ? IDOferta : null,
        Descricao: null,
        DtInicial: null,
        DtFinal: null,
        IDOfertaEstrutura: null
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const {setIsAuthenticated} = useContext(AuthContext);
    const [openWarning, setOpenWarning] = useState(false);
    const [openSucess, setOpenSucess] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [message, setMessage] = useState('');
    const [dadosGrade, setDadosGrade] = useState([]);
    const [updateG, setUpdateG] = useState(false);

    const getData = useCallback(async () => {
        let url = process.env.REACT_APP_API_URL + `oferta?idoferta=${IDOferta}`;
        const dados = await fetchItems(url, 'GET', null, setIsAuthenticated)
        if(dados.status === 404){
            dispatch({type: 'setDados', payload: initialState});
        }else{
            dispatch({type: 'setDados', payload: dados.data[0]});
        }
    }, [IDOferta])

    useEffect(()=>{
        if(IDOferta){
            getData();
        }
    }, [IDOferta])

    const handleClickSalvar = async () => {
        if(!state.Descricao){
            setMessage('É necessário preencher a Descrição');
            setOpenWarning(true);
        }else if(!state.DtInicial){
            setMessage('É necessário selecionar a Data Inicial');
            setOpenWarning(true);
        }else if(!state.DtFinal){
            setMessage('É necessário selecionar a Data Final');
            setOpenWarning(true);
        }else{
            if(state.Modo === 'A'){
                setUpdate(false);
                const url = process.env.REACT_APP_API_URL + `oferta`;
                await fetchItems(url, 'PATCH', {dados_oferta: state}, setIsAuthenticated);
                setMessage(state.Modo === 'I' ? 'Oferta inserida com sucesso.' : 'Oferta alterada com sucesso.');
                setOpenSucess(true);
                setUpdate(true);  
            }else{
                setUpdate(false);
                const url = process.env.REACT_APP_API_URL + `oferta`;
                const response = await fetchItems(url, 'POST', {dados_oferta: state}, setIsAuthenticated);
                setMessage(state.Modo === 'I' ? 'Oferta inserida com sucesso.' : 'Oferta alterada com sucesso.');
                setOpenSucess(true);
                dispatch({type: 'setModo', payload: 'A'});
                dispatch({type: 'setIDOferta', payload: response.data.recordset[0].IDOferta});
                setUpdate(true);    
            }

        }
    }

    return (
        <Main>
            <ContainerInputs>
                <Input name='codigo' type='text' description='Código' value={state.IDOferta} disabled={true} width='8%' margin='0px 20px 0px 5px' />
                <Input name='descricao' type='text' description='Descrição' value={state.Descricao} onChange={(e)=>dispatch({type:'setDescricao', payload:e.target.value})} width='34%' margin='0px 20px 0px 0px' />
                <Input name='datainicial' type='date' description='Data Inicial' value={state.DtInicial} onChange={(event) => dispatch({type: 'setDtInicial', payload:event.target.value})} width='13%' disabled={false} margin='0px 20px 0px 0px' />
                <Input name='datafinal' type='date' description='Data Final' value={state.DtFinal} onChange={(event) => dispatch({type: 'setDtFinal', payload:event.target.value})} width='13%' disabled={false} margin='0px 20px 0px 0px' />
                <ButtonActionBlue title={state.Modo === 'A' ? 'Salvar' : 'Incluir'} margin='0px 20px 0px 0px' onClick={handleClickSalvar} width={'10%'} />
                <ButtonActionOrange title={'Local de Venda'} margin='0px 5px 0px 0px' disabled={(state.Modo === 'I')} width={'10%'} />
            </ContainerInputs>
            <OfertaEstrutura IDOferta={state.IDOferta} Modo={state.Modo} setOpenWarning={setOpenWarning} dadosGrade={dadosGrade} setDadosGrade={setDadosGrade} setMessage={setMessage} setUpdate={setUpdateG} />
            <WrapperGrade>
                <GradeOfertaEstrutura update={updateG} IDOferta={state.IDOferta} Modo={state.Modo} dispatch={dispatch} dadosGrade={dadosGrade} setDadosGrade={setDadosGrade} setMessage={setMessage} setOpenConfirmModal={setOpenConfirm} />
            </WrapperGrade>
            <WarningModal openModal={openWarning} setOpenModal={setOpenWarning} header={'Cadastro de Ofertas'} action={message} />
            <SucessModal openModal={openSucess} setOpenModal={setOpenSucess} header={'Cadastro de Ofertas'} action={message}  />
            <ConfirmModal openModal={openConfirm} setOpenModal={setOpenConfirm} header={'Cadastro de Ofertas'} action={message} caseYes={{func: handleDelete, param:[dispatch,state.IDOfertaEstrutura, setIsAuthenticated, setUpdateG]}}  />
        </Main>

    )
}

export default CadastroOfertas;