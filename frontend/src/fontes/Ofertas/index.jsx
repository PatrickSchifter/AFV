import React, {useReducer, useState, useContext} from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../auth';
import { fetchItems } from '../../utils/fetch';
import { configPopUp } from '../../components/PopUp/service';
import { ContentContext } from '../../contexts/contentContext';

import Input from '../../components/Input';
import Flag from '../../components/Flag';
import ButtonSearchBlue from '../../components/ButtonSearchBlue';
import ButtonCleanBlue from '../../components/ButtonCleanBlue';
import ButtonNewBlue from '../../components/ButtonNewBlue';
import Divisor from '../../components/Divisor';
import GradeOferta from './GradeOferta';
import CadastroOfertas from './CadastroOfertas';

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

const Frame = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid #dfdfdf;  
    border-radius: 10px;
    width: ${props => props.width ? props.width : '100px'};
    height: ${props => props.height ? props.height : '70px'};
    margin: ${props => props.margin ? props.margin : '0'};

    position: relative;
`

const Title = styled.p`
    font-family: MS Sans Serif, sans-serif;
    font-size: 16px;
    position: absolute;
    top: -10px; /* ajuste o valor conforme necessário para posicionar o título na borda superior */
    left: ${props => props.left ? props.left : '0px'};
    transform: translateX(-50%);
    background-color: rgba(255, 255, 255, 0.8);
    padding: 0 10px;
    
`
const Wrapper = styled.div`
    display: flex;
    width: 97%;
    height: calc(100%);
`

const initialState = {
  Descricao: null,
  Vigente: 'S',
  Vencido: 'S'
}

const reducer = (state, action) => { 
  switch(action.type){
    case 'setDescricao':
      return {...state, Descricao: action.payload === '' || action.payload === null  ? null : action.payload.toUpperCase()}
    case 'setVigente':
      return {...state, Vigente: state.Vigente === 'N' ? 'S' : 'N'}
    case 'setVencido':
      return {...state, Vencido: state.Vencido === 'N' ? 'S' : 'N'}
    case 'clean':
      return {...state, Vencido: 'S', Vigente: 'S', Descricao:null}
    default:
      return state;
  }
}

const Ofertas = ({activeTab}) => {

  const {setIsAuthenticated} = useContext(AuthContext);
  const {dispatch} = useContext(ContentContext);
  const [state, dispatchOferta] = useReducer(reducer, initialState);
  const [oferta, setOferta] = useState([]);
  const [update, setUpdate] = useState(true);

  const handleChangeDescricao = (event) => {
    dispatchOferta({type:'setDescricao', payload: event.target.value});
  }

  const handleBuscar = async (Descricao, Vigente, Vencido) => {
    let url = process.env.REACT_APP_API_URL + `oferta`;
    if(Descricao || Vigente || Vencido){
      url = url + '?'
      if(Descricao){
        url = url + `descricao=${Descricao}`
      }
      if(Vencido === 'S' && Vigente  === 'S'){
      }else{
        if(Vigente === 'S'){
          if(Vigente === 'S' && Descricao){
            url = url + '&';
          }
          url = url + `vigente=${Vigente}`
        }
        if(Vencido === 'S'){
          if(Vencido === 'S' && Descricao){
            url = url + '&';
          }
          url = url + `vencido=${Vencido}`
        }
      }
    }
    const dados = await fetchItems(url, 'GET', null, setIsAuthenticated)
    if(dados.status === 404){
      setOferta([{IDOferta: null, Descricao:null, DtInicial: null, DtFinal: null}])
    }else{
      setOferta(dados.data)
    }
  }

  const handleNew = () => {
    configPopUp(dispatch, <CadastroOfertas Modo={'I'} setUpdate={setUpdate} />, true, 'Cadastro de Ofertas', '1125px', '628px')
  }

  const handleClean = async () =>{
    dispatchOferta({type: 'clean'});  
    handleBuscar(null, 'S', 'S');
  }

  return (
    <Main activeTab={activeTab}>
      <InputContainer>
        <Input name='descricao' type='text' description='Descrição' value={state.Descricao} onChange={handleChangeDescricao} width='53%' margin='0px 20px 0px 0px' />
        <Frame height={'55px'} width={'17%'} margin={'0px'}>
            <Wrapper>
                <Title left={'50px'}>Vigência</Title>
                <Flag value={state.Vigente} name={'vigente'} description={'Vigente'} width={'40%'} margin='0 5% 5% 10%' dispatch={{dispatch: dispatchOferta, type: 'setVigente'}} />
                <Flag value={state.Vencido} name={'vencido'} description={'Vencido'} width={'40%'} margin='0 0 7% 0' dispatch={{dispatch: dispatchOferta, type: 'setVencido'}} />
            </Wrapper>
        </Frame>
        <ButtonSearchBlue onClick={() => handleBuscar(state.Descricao, state.Vigente, state.Vencido)} margin='0px 20px 0px 20px' width={'8%'} />
        <ButtonCleanBlue onClick={handleClean} margin='0px 20px 0px 0px' width={'8%'} />
        <ButtonNewBlue onClick={handleNew} margin='0px' width={'8%'} />
      </InputContainer>
      <Divisor />
      {update ? <GradeOferta oferta={oferta} setOferta={setOferta} setUpdate={setUpdate} /> : <></>}
    </Main>
  )
}

export default Ofertas;