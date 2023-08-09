import React, {useState, useReducer, useContext, useEffect} from 'react'
import styled from 'styled-components'
import { fetchItems } from '../../../utils/fetch'
import { AuthContext } from '../../../auth'
import { cleanMask } from '../../../utils/utils'

import Input from '../../../components/Input'
import ButtonActionBlue from '../../../components/ButtonActionBlue'
import GradeClienteContatos from '../GradeClienteContatos'
import WarningModal from '../../../components/Modal/WarningModal'

const Main = styled.div`
  width: 97%;
  height: 99%; 
  margin-top: 1%;
`

const InputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const ClienteContatos = ({IDCliente}) => {
  const [update, setUpdate] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const {setIsAutenticated} = useContext(AuthContext)

  const initialState = {
    IDCliente: IDCliente,
    Nome: null,
    DataNascimento: null,
    Funcao: null,
    Departamento: null,
    EmailCorp: null,
    EmailPessoal: null,
    TelFixo: null,
    TelCelular: null,
    NumWhats: null
  }

  const reducer = (state, action) => {
    switch(action.type){
      case 'setNome':
        return {... state, Nome: action.payload}
      case 'setDataNascimento':
        return {... state, DataNascimento: action.payload}
      case 'setFuncao':
        return {... state, Funcao: action.payload}
      case 'setDepartamento':
        return {... state, Departamento: action.payload}
      case 'setEmailCorp':
        return {... state, EmailCorp: action.payload}
      case 'setEmailPessoal':
        return {... state, EmailPessoal: action.payload}
      case 'setTelFixo':
        let telFixo = cleanMask(action.payload)
        return {... state, TelFixo: telFixo}
      case 'setTelCelular':
        let cel = cleanMask(action.payload)
        return {... state, TelCelular: cel}
      case 'setNumWhats':
        let numWhats = cleanMask(action.payload)
        return {... state, NumWhats: numWhats}
      case 'resetState':
        return initialState;
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);


  const handleInsert = async () => {
    if(!state.Nome){
      setOpenModal(true)
    }else{
      try {
        let url = process.env.REACT_APP_API_URL + 'cliente-contato';
        await fetchItems(url, 'POST', {dados_contato: state}, setIsAutenticated);

      } catch (error) {
          console.error(error);
      }
    }
/*
    dispatch({type: 'setNome', payload: ''});
    dispatch({type: 'setDataNascimento', payload: ''});
    dispatch({type: 'setFuncao', payload: ''});
    dispatch({type: 'setDepartamento', payload: ''});
    dispatch({type: 'setEmailCorp', payload: ''});
    dispatch({type: 'setEmailPessoal', payload: ''});
    dispatch({type: 'setTelFixo', payload: ''});
    dispatch({type: 'setTelCelular', payload: ''});
    dispatch({type: 'setNumWhats', payload: ''});
*/
    await setUpdate((old) => !old);
  }

  return (
    <Main>
      <InputContainer>
        <Input name='contatocliente' type='text' description='Contato do Cliente' value={state.Nome} width='30%' onChange={(event) => dispatch({type: 'setNome', payload:event.target.value})} margin='0px 20px 15px 0px' />
        <Input name='datanascimento' type='date' description='Data de Nascimento' value={state.DataNascimento} onChange={(event) => dispatch({type: 'setDataNascimento', payload:event.target.value})} width='15%' disabled={false} margin='0px 20px 15px 0px' />
        <Input name='funcao' type='text' description='Função' value={state.Funcao} onChange={(event) => dispatch({type: 'setFuncao', payload:event.target.value})} width='19%' disabled={false} margin='0px 20px 15px 0px' />
        <Input name='departamento' type='text' description='Departamento' value={state.Departamento} onChange={(event) => dispatch({type: 'setDepartamento', payload:event.target.value})} width='19%' disabled={false} margin='0px 20px 15px 0px' />
        <ButtonActionBlue title='Incluir' justButton margin='21px 0px 15px 0px' onClick={handleInsert} />
        <Input name='emailcorporativo' type='text' description='Email Corporativo' value={state.EmailCorp} onChange={(event) => dispatch({type: 'setEmailCorp', payload:event.target.value})} width='25%' disabled={false} margin='0px 20px 15px 0px' />
        <Input name='emailpessoa' type='text' description='Email Pessoal' value={state.EmailPessoal} onChange={(event) => dispatch({type: 'setEmailPessoal', payload:event.target.value})} width='14%' disabled={false} margin='0px 20px 15px 0px' />
        <Input name='telefonefixo' type='text' mask='TelFixo' description='Telefone Fixo' value={state.TelFixo} onChange={(event) => dispatch({type: 'setTelFixo', payload:event.target.value})} width='15%' disabled={false} margin='0px 20px 15px 0px' />
        <Input name='telefonecelular' type='text' mask='TelCel' description='Telefone Celular' value={state.TelCelular} onChange={(event) => dispatch({type: 'setTelCelular', payload:event.target.value})} width='19%' disabled={false} margin='0px 20px 15px 0px' />
        <Input name='whatsapp' type='text' description='WhatsApp' mask='TelCel' value={state.NumWhats} onChange={(event) => dispatch({type: 'setNumWhats', payload:event.target.value})} width='19%' disabled={false} margin='0px 0px 15px 0px' />
      </InputContainer>
      <GradeClienteContatos IDCliente={IDCliente} update={update} />
      <WarningModal openModal={openModal} setOpenModal={setOpenModal} header='Dados Clientes' action='Campo Nome deve ser preenchido' />
    </Main>
  )
}

export default ClienteContatos