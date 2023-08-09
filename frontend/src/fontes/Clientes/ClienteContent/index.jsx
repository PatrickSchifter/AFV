import React, {useState, useContext} from 'react';
import styled from 'styled-components';

import SelectSituacao from '../../../components/SelectSituacao';
import ButtonActionOrange from '../../../components/ButtonActionOrange';
import Input from '../../../components/Input';
import Frame from '../../../components/Frame';
import ClienteDadosFiscais from '../ClienteDadosFiscais';
import ClienteEnderecos from '../ClienteEnderecos';
import ClientePerfilEPolitica from '../ClientePerfilEPolitica';
import ClienteXVendedores from '../ClienteXVendedores';
import ClienteContatos from '../ClienteContatos';

import { configPopUp } from '../../../components/PopUpSecondary/service';
import { ContentContext } from '../../../contexts/contentContext';



import './style.css';

const Main = styled.main`
  display: flex;
  justify-content: center;

  border: 1px solid rgb(211, 210, 210);
  border-radius: 5px;
  height: 76%;
`
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: flex-end;
  align-items: flex-end;

  width: 50%;
  height: 47px;
`

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  
  height: 75%;
  width: 97%;
  margin-top: 10px;
`

const ComponenteTeste = () => {
  return (
    <div>Componente Teste</div>
  )
}

const buttonMargin = '0px 20px 0px 0px'


const ClienteContent = ({ dadosCliente }) => {

  const {dispatch} = useContext(ContentContext);

  const handleClickEnderecos = () =>{
    configPopUp(dispatch, <ClienteEnderecos IDCliente={dadosCliente.IDCliente} />, true, 'Clientes - Endereços', '1085px', '482px')    
  }   

  const handleClickDadosFiscais = () => {
    configPopUp(dispatch, <ClienteDadosFiscais IDCliente={dadosCliente.IDCliente} />, true, 'Clientes - Dados Fiscais', '1104px', '478px')    
  }

  const handleClickPerfilEPolitica = () => {
    configPopUp(dispatch, <ClientePerfilEPolitica IDCliente={dadosCliente.IDCliente} />, true, 'Clientes - Perfil e Política', '1117px', '457px')    
  }

  const handleClickClienteXVendedores = () => {
    configPopUp(dispatch, <ClienteXVendedores IDCliente={dadosCliente.IDCliente} />, true, 'Clientes - Cliente x Vendedores', '1117px', '516px')    
  }

  const handleClickContatos = () => {
    configPopUp(dispatch, <ClienteContatos IDCliente={dadosCliente.IDCliente} />, true, 'Clientes - Contatos', '1093px', '454px')    
  }

  return (
    <Main>
      <Wrapper>
        <Input name='coderp' type='text' description='Código ERP' value={dadosCliente.CodERP} width='8.5%' disabled={true} />
        <Input name='cpfcnpj' type='text' description='CPF/CNPJ' value={dadosCliente.CNPJCPF} width='19%' disabled={true} mask='CPFCNPJ' />
        <Input name='razaosocial' type='text' description='Razão Social' value={dadosCliente.Razao} width='48.5%' disabled={true} />
        <SelectSituacao description={'Situação'} value={dadosCliente.Situacao} disabled={true} width='10%' />
        <ButtonActionOrange title='Atualizar' width='8.5%' margin='0' />
        <Input name='fantasia' type='text' description='Fantasia' value={dadosCliente.Fantasia} width='79%' disabled={true} />
        <Input name='incricaoestadual' type='text' description='Inscrição Estadual' value={dadosCliente.InscEstadual} width='19.5%' disabled={true} margin='0' />
        <Input name='logradouro' type='text' description='Logradouro' value={dadosCliente.Logradouro} width='53.7%' disabled={true} />
        <Input name='numero' type='text' description='Número' value={dadosCliente.Numero} width='10%' disabled={true} />
        <Input name='cep' type='text' description='CEP' value={dadosCliente.CEP} width='12.5%' disabled={true} mask='CEP' />
        <Input name='complemento' type='text' description='Complemento' value={dadosCliente.Complemento} width='19.5%' disabled={true} margin='0' />
        <Input name='bairro' type='text' description='Bairro' value={dadosCliente.Bairro} width='26.2%' disabled={true} />
        <Input name='cidade' type='text' description='Cidade' value={dadosCliente.Cidade} width='26.2%' disabled={true} />
        <Input name='uf' type='text' description='UF' value={dadosCliente.UFCliente} width='4%' disabled={true} />
        <Input name='email' type='text' description='Email' value={dadosCliente.Email} width='39.5%' disabled={true} margin='0' />
        <Input name='telcelular' type='text' mask='TelCel' description='Telefone Celular' value={dadosCliente.TelCelular} width='15%' disabled={true} margin='17px 20px 0px 0px' />
        <Input name='telfixo' type='text' mask='TelFixo' description='Telefone Fixo' value={dadosCliente.TelFixo} width='15%' disabled={true} margin='17px 20px 0px 0px' />
        <Input name='datafundacao' type='text' description='Data Fundação' value={dadosCliente.DataFundacao} width='15%' disabled={true} margin='17px 20px 0px 0px' />
        <Frame title='Usuário Vinculado' width='50.8%' height='80px' left='80px'>
          <Input name='usuarioERP' type='text' description='Usuário ERP' value={dadosCliente.UsuarioERP} width='20%' disabled={true} margin='10px 20px 0px 0px' />
          <Input name='nomeusuario' type='text' description='Nome do Usuário' value={dadosCliente.NomeUsuario} width='77%' disabled={true} margin='10px 0px 0px 0px' />
        </Frame>
        <ButtonsWrapper>
          <ButtonActionOrange title={'Dados Fiscais'} width='18%' justButton={true} onClick={handleClickDadosFiscais} margin={buttonMargin} />
          <ButtonActionOrange title={'Endereços'} width='18%' justButton={true} onClick={handleClickEnderecos} margin={buttonMargin} />
          <ButtonActionOrange title={'Perfil e Politica'} width='18%' justButton={true} onClick={handleClickPerfilEPolitica} margin={buttonMargin} />
          <ButtonActionOrange title={'Cliente x Vendedores'} width='18%' justButton={true} onClick={handleClickClienteXVendedores} margin={buttonMargin} />
          <ButtonActionOrange title={'Contatos'} width='18%' justButton={true} onClick={handleClickContatos} margin={buttonMargin} />
        </ButtonsWrapper>
      </Wrapper>
    </Main>
  )
}

export default ClienteContent