import { useState, useContext } from 'react'
import styled from 'styled-components'
import { fetchItems } from '../../utils/fetch'
import { AuthContext } from '../../auth'
import { ContentContext } from '../../contexts/contentContext'
import { configPopUp } from '../../components/PopUpSecondary/service'


import Input from '../../components/Input'
import ButtonActionBlue from '../../components/ButtonActionBlue'
import Divisor from '../../components/Divisor'
import GradeDescontoComercial from './GradeDescontoComercial/GradeClienteEndereco'
import WarningModal from '../../components/Modal/WarningModal'
import EventosDeDescontoComercial from './EventosDeDescontoComercial'

const Main = styled.div`
  display: ${props => props.activeTab ? 'block' : 'none'};
  width: 96%;
  margin: 0 2%;
  
`

const ContainerInputs = styled.div`
  display: flex;
  width: 100%;
  margin-top: 15px;
`

const DescontoComercial = ({activeTab}) => {

  const [codigo, setCodigo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [desconto, setDesconto] = useState([]);
  const [openModal, setOpenModa] = useState(false);
  const [update, setUpdate] = useState(true);
  const {setIsAuthenticated} = useContext(AuthContext);
  const {dispatch} = useContext(ContentContext)

  const handleChangeCodigo =(event)=>{
    setCodigo(event.target.value)
  }

  const handleChangeDescricao =(event)=>{
    setDescricao(event.target.value)
  }

  const handleClickBuscar = async () => {
    if(codigo !== ''){
      const url = process.env.REACT_APP_API_URL + `cascata/idcascata=${codigo}`;
      const token = localStorage.getItem('token');
      const dados = await fetchItems(url, 'GET', null, setIsAuthenticated)
      if(dados.status === 404){
        setDesconto([{IDCascata: '', DesCascata:'', Situacao: ''}])
        setOpenModa(true)
      }else{
        setDesconto(dados.data)
      }
    }else if(descricao !== ''){
      if(descricao !== ''){
        const url = process.env.REACT_APP_API_URL + `cascata/descricao=${descricao}`;
        const token = localStorage.getItem('token');
        const dados = await fetchItems(url, 'GET', null, setIsAuthenticated)
        if(dados.status === 404){
          setDesconto([{IDCascata: '', DesCascata:'', Situacao: ''}])
          setOpenModa(true)
        }else{
          setDesconto(dados.data)
        }
      }else{
        handleClickLimpar();
      }
    }
  }

  const handleClickNovo =()=>{
    configPopUp(dispatch, <EventosDeDescontoComercial Modo={'I'} setUpdate={setUpdate} />, true, 'Eventos de Desconto Comercial', '681px', '443px')
  }
    
  const handleClickLimpar = async () => {
    await setUpdate(false);
    await setCodigo('')
    await setDescricao('')
    await setUpdate(true);
  }

  return (
    <Main activeTab={activeTab}>
      <ContainerInputs>
        <Input name='codigo' type='text' description='Código' value={codigo} inputMode='numeric' onChange={handleChangeCodigo} width='10%' margin='0px 20px 0px 0px' />
        <Input name='descricao' type='text' description='Descrição' value={descricao} onChange={handleChangeDescricao} width='80%' margin='0px 20px 0px 0px' onlyUppercase />
        <ButtonActionBlue title='Buscar' justButton margin='20px 15px 0px 0px' onClick={handleClickBuscar} />
        <ButtonActionBlue title='Limpar' justButton margin='20px 15px 0px 0px' onClick={handleClickLimpar} />
        <ButtonActionBlue title='Novo' justButton margin='20px 0px 0px 0px' onClick={handleClickNovo} />
      </ContainerInputs>
      <Divisor />
      {update ?  <GradeDescontoComercial desconto={desconto} setDesconto={setDesconto} setUpdate={setUpdate} /> : <></>}
      <WarningModal openModal={openModal} setOpenModal={setOpenModa} header='Eventos de Desconto Comercial' action='Nenhum desconto encontrado' />
    </Main>
  )
}

export default DescontoComercial;