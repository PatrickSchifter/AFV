import React, {useReducer, useState, useContext} from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../auth';
import { fetchItems } from '../../utils/fetch';
import { configPopUp } from '../../components/PopUp/service';
import { ContentContext } from '../../contexts/contentContext';

import Input from '../../components/Input';
import ButtonSearchBlue from '../../components/ButtonSearchBlue';
import ButtonCleanBlue from '../../components/ButtonCleanBlue';
import ButtonNewBlue from '../../components/ButtonNewBlue';
import Divisor from '../../components/Divisor';
import SelectSituacao from '../../components/SelectSituacao';
import GradeLocalVenda from './GradeLocalVenda';
import DadosLocaisDeVenda from './DadosLocaisDeVenda';
import WrapDadosLocaisDeVenda from './WrapDadosLocaisDeVenda';

const Main = styled.div`
    display: ${props => props.activeTab ? 'block': 'none' };
    margin: 1% 2.2%;
    width: 96%;
    height: 80vh;
`

const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`

const LocalVenda = {
  IDLocalVenda: null,
  CNPJ: null,
  Razao: null,
  Fantasia: null,
  CEP: null,
  Logradouro: null,
  Numero: null,
  Complemento: null,
  Bairro: null,
  CodIBGE: null,
  CodERP: null,
  Situacao: 'A',
  Foto: null
}

const initialState = {
  CNPJ: null,
  Razao: null,
  Fantasia: null,
  Situacao: 'A'
}

const reducer = (state, action) => { 
  switch(action.type){
    case 'setCNPJ':
      return {...state, CNPJ: action.payload === '' || action.payload === null  ? null : action.payload}
    case 'setRazao':
      return {...state, Razao: action.payload === '' || action.payload === null  ? null : action.payload.toUpperCase()}
    case 'setFantasia':
      return {...state, Fantasia: action.payload === '' || action.payload === null  ? null : action.payload.toUpperCase()}
    case 'setSituacao':
      return {...state, Situacao: action.payload === '' || action.payload === null  ? null : action.payload}
    case 'resetState':
      return initialState
    default:
      return state;
  }
}

const LocaisDeVenda = ({activeTab}) => {

  const {setIsAuthenticated} = useContext(AuthContext);
  const {dispatch} = useContext(ContentContext);
  const [state, dispatchOferta] = useReducer(reducer, initialState);
  const [localVenda, setLocalVenda] = useState([]);
  const [update, setUpdate] = useState(true);

  const handleChangeCNPJ = (event) => {
    let fValue = event.target.value 
    dispatchOferta({type:'setCNPJ', payload: fValue.replace(/[^0-9]/g, '')});
  }
  const handleChangeRazao = (event) => {
    dispatchOferta({type:'setRazao', payload: event.target.value});
  }
  const handleChangeFantasia = (event) => {
    dispatchOferta({type:'setFantasia', payload: event.target.value});
  }
  const handleChangeSituacao = (event) => {
    dispatchOferta({type:'setSituacao', payload: event.target.value});
  }

  const handleBuscar = async (CNPJ, Razao, Fantasia, Situacao) => {
    
    let url = process.env.REACT_APP_API_URL + `local-venda?`;
    if(CNPJ){
      url = url + `cnpj=${CNPJ}`
    }
    if(Razao){
      if(Razao && CNPJ){
        url = url + '&'
      }
      url = url + `razao=${Razao}`
    }
    if(Fantasia){
      if(Fantasia && CNPJ || Fantasia && Razao){
        url = url + '&'
      }
      url = url + `fantasia=${Fantasia}`
    }
    if(Situacao){
      if(Situacao && CNPJ || Situacao && Razao || Situacao && Fantasia){
        url = url + '&'
      }
      url = url + `situacao=${Situacao}`
    }

    const dados = await fetchItems(url, 'GET', null, setIsAuthenticated)
    if(dados.status === 404){
      setLocalVenda([{IDLocalVenda: '', Razao:'', Fantasia: '', CNPJ: '', CodERP: '', Situacao: ''}])
    }else{
      setLocalVenda(dados.data)
    }
  }

  const handleNew = () => {
    configPopUp(dispatch, <WrapDadosLocaisDeVenda Modo={'I'} setUpdate={setUpdate} LocalVenda={LocalVenda} />, true, 'Dados Locais de Venda', '850px', '507px')
  }

  const handleClean = async () =>{
    dispatchOferta({type: 'resetState'});  
    handleBuscar(null, null, null, null);
  }

  return (
    <Main activeTab={activeTab}>
      <InputContainer>
        <Input name='cnpj' type='text' description='CNPJ' mask='CPFCNPJ' value={state.CNPJ} onChange={handleChangeCNPJ} width='13%' margin='0px 20px 0px 0px' maxLength={18} />
        <Input name='razao' type='text' description='Razão Social' value={state.Razao} onChange={handleChangeRazao} width='22.7%' margin='0px 20px 0px 0px' />
        <Input name='fantasia' type='text' description='Fantasia' value={state.Fantasia} onChange={handleChangeFantasia} width='22.7%' margin='0px 20px 0px 0px' />
        <SelectSituacao value={state.Situacao} width={'8%'} margin='0px 20px 0px 0px' description={'Situação'} onChange={handleChangeSituacao} />
        <ButtonSearchBlue onClick={() => handleBuscar(state.CNPJ, state.Razao, state.Fantasia, state.Situacao)} margin='0px 20px 0px 0px' width={'8%'} />
        <ButtonCleanBlue onClick={handleClean} margin='0px 20px 0px 0px' width={'9.7%'} />
        <ButtonNewBlue onClick={handleNew} margin='0px' width={'8%'} />
      </InputContainer>
      <Divisor />
      <GradeLocalVenda localVenda={localVenda} setLocalVenda={setLocalVenda} update={update} setUpdate={setUpdate} />
    </Main>
  )
}

export default LocaisDeVenda;