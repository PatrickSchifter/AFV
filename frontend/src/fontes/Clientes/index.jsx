import React, { useState, useContext } from 'react';
import Modal from 'react-modal'
import styled from 'styled-components';

import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { ContentContext } from '../../contexts/contentContext';
import { AuthContext } from '../../auth';
import { obtemDadosCliente } from './services';

import ButtonActionBlue from '../../components/ButtonActionBlue';
import Divisor from '../../components/Divisor';
import ClienteContent from './ClienteContent';
import Input from '../../components/Input';

import './style.css'

const Main = styled.div`
    display: ${props => props.activeTab ? 'block': 'none' };
    margin: 1% 2.2%;
    width: 96%;
    height: 80vh;
`

const Clientes = ({activeTab}) => {

  const {openContent, setOpenContent, dispatch} = useContext(ContentContext)
  const {setIsAuthenticated} = useContext(AuthContext)

  const [isOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState('');
  const [codERP, setCodERP] = useState('');
  const [cpfCNPJ, setCPFCNPJ] = useState('');
  const [pesquisar, setPesquisar] = useState('');
  const [dadosCliente, setDadosCliente] = useState({});


  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function removeNonNumeric(str) {
    return str.replace(/[^0-9]/g, '');
  }

  const handleChangeCodERP = (event) => {
    const inputValue = event.target.value;
    const numericValue = removeNonNumeric(inputValue);
    setCodERP(numericValue);
  };

  const handleChangeCpfCnpj = (event) => {
    const inputValue = event.target.value;
    const numericValue = removeNonNumeric(inputValue);
    setCPFCNPJ(numericValue);
  };

  const handleChangePesquisar = (event) => {
    setPesquisar(event.target.value)
  };

  const handleClickButtonLimpar = () => {
    setOpenContent(false);
    setCodERP('');
    setPesquisar('');
    setCPFCNPJ('');
  }

  const handleBlur = () => {
    if (codERP !== ''){
      obtemDadosCliente({type: 'coderp', payload: codERP}, setDadosCliente, setOpenContent, setAlert, openModal,null, setIsAuthenticated);
    }
    else if (cpfCNPJ !== ''){
      obtemDadosCliente({type: 'cnpjcpf', payload: cpfCNPJ}, setDadosCliente, setOpenContent, setAlert, openModal,null, setIsAuthenticated);
    }
    else if (pesquisar !== ''){
      obtemDadosCliente({type: 'pesquisa', payload: pesquisar},setDadosCliente,setOpenContent,null,null,dispatch, setIsAuthenticated);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.target.blur();
    }
  }

  return (
    <Main activeTab={activeTab}>
      <section className="cliente-inputs">
        <Input
          type='text'
          name='coderp'
          value={codERP}
          onBlur={handleBlur}
          onChange={handleChangeCodERP}
          onKeyDown={handleKeyDown}
          inputMode="numeric"
          description='Código ERP'
          width='10%'
          margin='0px 20px 0px 0px'
        />
        <Input 
          type="text"
          id="cpfcnpj"
          name="cpfcnpj"
          value={cpfCNPJ}
          onChange={handleChangeCpfCnpj}
          onBlur={handleBlur}
          inputMode="numeric"
          description='CPF/CNPJ'
          width='14%'
          margin='0px 20px 0px 0px'
        />
        <Input 
          type="text"
          id="pesquisar"  
          name="pesquisar"
          value={pesquisar}
          onChange={handleChangePesquisar}
          onBlur={handleBlur}
          width='65%'
          description='Pesquisar'
          margin='0px 20px 0px 0px'
        />
        <ButtonActionBlue
          aditionalClass={'cliente-botao-limpar'}
          onClick={handleClickButtonLimpar}
          title={'Limpar'}
          margin='0px 0px 0px 0px'
        />
      </section>
      <Divisor />
      {openContent ? <ClienteContent className={'cliente-content-open'} dadosCliente={dadosCliente} /> : <></>}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className='cliente-modal'
        overlayClassName="cliente-overlay"
      >
        <AiOutlineExclamationCircle id='cliente-icon-alert' />
        <h2>Cliente</h2>
        <p>{alert}</p>
        <button onClick={closeModal}>Fechar</button>
      </Modal>
    </Main>
  )
}

export default Clientes;