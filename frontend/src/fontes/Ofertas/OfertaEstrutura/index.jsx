import React, {useReducer, useContext, useEffect} from 'react'
import styled from 'styled-components'
import { AuthContext } from '../../../auth';

import { handleBlurPercentualMaximo } from '../../../utils/utils';
import { fetchItems } from '../../../utils/fetch';

import ComboProduto from '../../../components/Combo/ComboProduto';
import ComboFamilia from '../../../components/Combo/ComboFamilia';
import ComboGrandeGrupo from '../../../components/Combo/ComboGrandeGrupo';
import ComboGrupo from '../../../components/Combo/ComboGrupo';
import ComboSubGrupo from '../../../components/Combo/ComboSubGrupo';
import ComboMarca from '../../../components/Combo/ComboMarca';
import ComboCategoria from '../../../components/Combo/ComboCategoria';
import ComboFabricante from '../../../components/Combo/ComboFabricante';
import ComboLinhaProduto from '../../../components/Combo/ComboLinhaProduto';
import Input from '../../../components/Input';
import ButtontActionBlue from '../../../components/ButtonActionBlue'

const Main = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    width: 97%;
`
const defaultMargin = '0.5% 0.5%'

const reducer = (state, action) => {
    switch(action.type){
        case 'setIDProduto':
            return {...state, IDProduto: action.payload}
        case 'setIDFamilia':
            return {...state, IDFamilia: action.payload}
        case 'setIDGrandeGrupo':
            return {...state, IDGGrupo: action.payload}     
        case 'setIDGrupo':
            return {...state, IDGrupo: action.payload}
        case 'setIDSubGrupo':
            return {...state, IDSgrupo: action.payload}
        case 'setIDMarca':
            return {...state, IDMarca: action.payload}
        case 'setIDCategoria':
            return {...state, IDCategoria: action.payload}  
        case 'setIDFabricante':
            return {...state, IDFabricante: action.payload}  
        case 'setIDLinha':
            return {...state, IDLinha: action.payload}    
        case 'setDesOferta1':
            return {...state, DesOferta:action.payload ? parseFloat(action.payload) : null}
        case 'setDesOferta2':
            return {...state, DesOferta2: action.payload ? parseFloat(action.payload) : null} 
        case 'setQtdOferta':
            return {...state, QtdOferta: parseInt(action.payload)}  
        case 'setQtdMinima':
            return {...state, QtMinima: parseInt(action.payload)}  
        case 'setQtdMaxima':
            return {...state, QtMaxima: parseInt(action.payload)}  
        case 'resetState':
            return action.payload
        case 'setIDOferta':
            return {...state, IDOferta: action.payload}  
        default:
            return state
    }
}

const OfertaEstrutura = ({IDOferta, Modo, dadosGrade, setDadosGrade, setMessage, setOpenWarning, setUpdate}) => {

    const initialState = {
        IDProduto: null,
        IDFamilia: null,
        IDGGrupo: null,
        IDGrupo: null,
        IDSgrupo: null,
        IDMarca: null,
        IDCategoria: null,
        IDFabricante: null,
        IDLinha: null,
        DesOferta: null,
        DesOferta2: null,
        QtdOferta: null,
        QtMinima: null,
        QtMaxima: null,
        IDOferta: IDOferta,
        IDOfertaEstrutura: null
    }

    const [state, dispatch] = useReducer(reducer, initialState);
    const {setIsAuthenticated} = useContext(AuthContext);

    const itemExistente = dadosGrade.find((item) => {
        return (
            item.IDProduto === state.IDProduto &&
            item.IDFamilia === state.IDFamilia &&
            item.IDGGrupo === state.IDGGrupo &&
            item.IDGrupo === state.IDGrupo &&
            item.IDSGrupo === state.IDSGrupo &&
            item.IDMarca === state.IDMarca &&
            item.IDCategoria === state.IDCategoria &&
            item.IDFabricante === state.IDFabricante &&
            item.IDLinha === state.IDLinha
        );
    });

    const handleChangeDesOferta1 = (event) => {
        dispatch({type: 'setDesOferta1', payload: event.target.value})
    }
    const handleChangeDesOferta2 = (event) => {
        dispatch({type: 'setDesOferta2', payload: event.target.value})
    }
    const handleChangeQtdOferta = (event) => {
        dispatch({type: 'setQtdOferta', payload: event.target.value})
    }
    const handleChangeQtdMinima = (event) => {
        dispatch({type: 'setQtdMinima', payload: event.target.value})
    }
    const handleChangeQtdMaxima = (event) => {
        dispatch({type: 'setQtdMaxima', payload: event.target.value})
    }

    const handleInserir = async () => {
        if(!state.IDProduto){
            setMessage('É necessário selecionar um Produto');
            setOpenWarning(true);
        }else if(!state.DesOferta   ){
            setMessage('É necessário preencher o Percentual de Desconto');
            setOpenWarning(true);
        }else if(!state.QtdOferta){
            setMessage('É necessário preencher a Quantidade Ofertada');
            setOpenWarning(true);
        }else if(!state.QtMinima){
            setMessage('É necessário preencher a Quantidade Minima');
            setOpenWarning(true);
        }else if(!state.QtMaxima){
            setMessage('É necessário preencher a Quantidade Maxima');
            setOpenWarning(true);
        }else{
            if( itemExistente){
                setMessage('Estrutura já cadastrada');
                setOpenWarning(true);
            }else{
                const url = process.env.REACT_APP_API_URL + `oferta-estrutura`;
                await fetchItems(url, 'POST', {dados_oferta_estrutura: state}, setIsAuthenticated);
                dispatch({type: 'resetState', payload: initialState})
                setUpdate((old) => !old);
            }
        }
    }

    useEffect(()=>{
        dispatch({type: 'setIDOferta', payload: IDOferta})
    }, [IDOferta])

    return (
        <Main>
            <ComboProduto value={state.IDProduto} width={'100%'} description={'Produto'} margin={defaultMargin} disabled={Modo === 'I'} dispatch={{dispatch: dispatch, type: 'setIDProduto'}} />
            <ComboFamilia value={state.IDFamilia} width={'24%'} description={'Famlia'} margin={defaultMargin} disabled={Modo === 'I'} dispatch={{dispatch: dispatch, type: 'setIDFamilia'}} />
            <ComboGrandeGrupo value={state.IDGGrupo} width={'24%'} description={'Grande Grupo'} margin={defaultMargin} disabled={Modo === 'I'} dispatch={{dispatch: dispatch, type: 'setIDGrandeGrupo'}} />
            <ComboGrupo value={state.IDGrupo} width={'24%'} description={'Grupo'} margin={defaultMargin} disabled={Modo === 'I'} dispatch={{dispatch: dispatch, type: 'setIDGrupo'}} />
            <ComboSubGrupo value={state.IDSgrupo} width={'24%'} description={'Sub Grupo'} margin={defaultMargin} disabled={Modo === 'I'} dispatch={{dispatch: dispatch, type: 'setIDSubGrupo'}} />
            <ComboMarca value={state.IDMarca} width={'24%'} description={'Marca'} margin={defaultMargin} disabled={Modo === 'I'} dispatch={{dispatch: dispatch, type: 'setIDMarca'}} />
            <ComboCategoria value={state.IDCategoria} width={'24%'} description={'Categoria'} margin={defaultMargin} disabled={Modo === 'I'} dispatch={{dispatch: dispatch, type: 'setIDCategoria'}} />
            <ComboFabricante value={state.IDFabricante} width={'24%'} description={'Fabricante'} margin={defaultMargin} disabled={Modo === 'I'} dispatch={{dispatch: dispatch, type: 'setIDFabricante'}} />
            <ComboLinhaProduto value={state.IDLinha} width={'24%'} description={'Linha'} margin={defaultMargin} disabled={Modo === 'I'} dispatch={{dispatch: dispatch, type: 'setIDLinha'}} />
            <Input name='desoferta1' type='text' description='% Desconto' value={state.DesOferta} width='15.6%' disabled={Modo === 'I'} onChange={handleChangeDesOferta1}  margin={defaultMargin} inputMode='decimal' onBlur={() => handleBlurPercentualMaximo(state.DesOferta, dispatch, 'setDesOferta1')} />
            <Input name='desoferta2' type='text' description='% Desconto 2' value={state.DesOferta2} width='15.6%' disabled={Modo === 'I'} onChange={handleChangeDesOferta2}  margin={defaultMargin} inputMode='decimal' onBlur={() => handleBlurPercentualMaximo(state.DesOferta2, dispatch, 'setDesOferta2')}  />
            <Input name='qtdofertada' type='text' description='Qtd. Ofertada' value={state.QtdOferta} width='15.6%' disabled={Modo === 'I'} onChange={handleChangeQtdOferta}  margin={defaultMargin} inputMode='numeric' />
            <Input name='qtdminimo' type='text' description='Qtd. Minima' value={state.QtMinima} width='15.6%' disabled={Modo === 'I'} onChange={handleChangeQtdMinima}  margin={defaultMargin} inputMode='numeric' />
            <Input name='qtdmaximo' type='text' description='Qtd. Maxima' value={state.QtMaxima} width='15.6%' disabled={Modo === 'I'} onChange={handleChangeQtdMaxima}  margin={defaultMargin} inputMode='numeric' />
            <ButtontActionBlue title={'Inserir'} disabled={Modo === 'I'} margin={'0.5% 0 0 7.3%'} onClick={handleInserir} />
        </Main>
    )
}

export default OfertaEstrutura;