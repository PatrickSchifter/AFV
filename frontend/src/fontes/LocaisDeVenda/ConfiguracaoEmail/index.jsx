import React, {useReducer, useContext, useEffect, useState} from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../../auth';
import { fetchItems } from '../../../utils/fetch';
import { LocalVendaContext } from '../../../contexts/localVendaContext';

import Input from '../../../components/Input';
import Divisor from '../../../components/Divisor';
import ComboTipoEmail from '../../../components/Combo/ComboTipoEmail';
import ButtonActionBlue from '../../../components/ButtonActionBlue';
import WarningModal from '../../../components/Modal/WarningModal';
import SucessModal from '../../../components/Modal/SucessModal';

const ContainerInputs = styled.div`
    display: flex;
    width: 97%;
`

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const LocalEmailDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 1%;
    width: 97%;
`


const DivTextArea = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    width: ${props => props.width};
`
const LabelCarimbo = styled.label`
    width: 100%;
    margin-bottom: 5px;
    font-family: sans-serif;
    font-size: 14px;
`

const DescricaoTextArea = styled.textarea`
    width: 100%;
    height: ${props => props.height};
    border: 1px solid rgb(211, 210, 210);
    border-radius: 5px;
    background-color: ${props => props.disabled ? '#E9ECEF' : '#fff'};
    vertical-align: top;
`


const ConfiguracaoEmail = ({LocalVenda, Modo, setUpdate, LocalEmail}) => {

    const initialState = {
        CodERP:LocalVenda.CodERP,
        CNPJ:LocalVenda.CNPJ,
        Razao:LocalVenda.Razao,
        IDLocalVenda:LocalVenda.IDLocalVenda,
        EmailResposta: LocalEmail.EmailResposta ? LocalEmail.EmailResposta : null,
        Assunto: LocalEmail.Assunto ? LocalEmail.Assunto : null,
        Corpo: LocalEmail.Corpo ? LocalEmail.Corpo : null,
        Assinatura: LocalEmail.Assinatura ? LocalEmail.Assinatura : null,
        IDTipoEmail: LocalEmail.IDTipoEmail ? LocalEmail.IDTipoEmail : null,
        Modo: Modo
    }

    
const reducer = (state, action) => {
    switch(action.type){
        case 'setEmailResposta':
            return {...state, EmailResposta: action.payload}
        case 'setTipoEmail':
            return {...state, IDTipoEmail: action.payload}
        case 'setAssunto':
            return {...state, Assunto: action.payload}
        case 'setCorpo':
            return {...state, Corpo: action.payload}
        case 'setAssinatura':
            return {...state, Assinatura: action.payload}
        case 'setModo':
            return {...state, Modo: action.payload}
        case 'resetState':
            return initialState;
        case 'setDados':
            return {
                ...state,
                EmailResposta: action.payload.EmailResposta,
                IDTipoEmail: action.payload.IDTipoEmail,
                Assunto: action.payload.Assunto,
                Corpo: action.payload.Corpo,
                Assinatura: action.payload.Assinatura
            }
        default:
            return state
    }
}

    const [state, dispatch] = useReducer(reducer, initialState);
    const {setIsAuthenticated} = useContext(AuthContext);
    const {setUpdateGradeLocalEmail, updateGradeLocalEmail} = useContext(LocalVendaContext);
    const [openWarning, setOpenWarning] = useState(false);
    const [openSucess, setOpenSucess] = useState(false);
    const [message, setMessage] = useState('');
    const [localEmail, setLocalEmail] = useState(LocalEmail)

    const handleChange = (event, type) => {
        dispatch({type: type, payload: event.target.value});
    }

    const handleSalvar = async () => {
        if(!state.IDTipoEmail){
            setMessage('É necessário selecionar o Tipo E-Mail');
            setOpenWarning(true);
        }else if(!state.EmailResposta){
            setMessage('É necessário preencher o E-Mail Resposta');
            setOpenWarning(true);
        }else if(!state.Assunto){
            setMessage('É necessário preencher o Assunto');
            setOpenWarning(true);
        }else if(!state.Corpo){
            setMessage('É necessário preencher o Corpo');
            setOpenWarning(true);
        }else if(!state.Assinatura){
            setMessage('É necessário preencher a Assinatura');
            setOpenWarning(true);
        }else{
            if(state.Modo === 'I'){
                const urlGet = process.env.REACT_APP_API_URL + `local-email?idlocalvenda=${state.IDLocalVenda}&idtipoemail=${state.IDTipoEmail}`;
                const dados = await fetchItems(urlGet, 'GET', null, setIsAuthenticated);
                if(dados.status !== 404){
                    setMessage('Tipo de email já cadastrado para esse Local de Venda');
                    setOpenWarning(true);
                }else{
                    const urlPost = process.env.REACT_APP_API_URL + `local-email`;
                    await fetchItems(urlPost, 'POST', {dados_local_email: state}, setIsAuthenticated);
                    setMessage('Email cadastrado com sucesso');
                    setOpenSucess(true);
                    setUpdateGradeLocalEmail();
                    setLocalEmail(state);
                    dispatch({type: 'setModo', payload: 'A'});
                }
            }else{
                if(state.IDTipoEmail !== localEmail.IDTipoEmail){
                    const urlGet = process.env.REACT_APP_API_URL + `local-email?idlocalvenda=${state.IDLocalVenda}&idtipoemail=${state.IDTipoEmail}`;
                    const dados = await fetchItems(urlGet, 'GET', null, setIsAuthenticated);
                    if(dados.status !== 404){
                        setMessage('Tipo de email já cadastrado para esse Local de Venda');
                        setOpenWarning(true);
                    }else{
                        const urlPatch = process.env.REACT_APP_API_URL + `local-email`;
                        await fetchItems(urlPatch, 'PATCH', {dados_local_email: {...state, IDTipoEmailAntigo: localEmail.IDTipoEmail}}, setIsAuthenticated);
                        setMessage('Email alterado com sucesso');
                        setUpdateGradeLocalEmail();
                        setOpenSucess(true);
                    }
                }else{
                    const urlPatch = process.env.REACT_APP_API_URL + `local-email`;
                    await fetchItems(urlPatch, 'PATCH', {dados_local_email: {...state, IDTipoEmailAntigo: state.IDTipoEmail}}, setIsAuthenticated);
                    setMessage('Email alterado com sucesso');
                    setUpdateGradeLocalEmail();
                    setOpenSucess(true);
                }
            }
        }
    }

    useEffect(() => {
        console.log(Modo)
        if(state.Modo === 'A'){
            const getDados = async () => {
                const urlGet = process.env.REACT_APP_API_URL + `local-email?idlocalvenda=${LocalVenda.IDLocalVenda}&idtipoemail=${localEmail.IDTipoEmail}`;
                const dados = await fetchItems(urlGet, 'GET', null, setIsAuthenticated);
                dispatch({type: 'setDados', payload: dados.data[0]});
            }
            dispatch({type: 'setDados', payload: LocalEmail});
            setLocalEmail(LocalEmail);
            getDados();
        }else{
            dispatch({type: 'resetState'});
        }
    }, [LocalEmail, Modo])

    return (
        <Main>
            <ContainerInputs>
                <Input name='codigo' type='text' description='Código' value={state.CodERP} disabled={true} width='10%'  margin='4px 20px 4px 0px' inputMode={'numeric'} />
                <Input name='cnpj' type='text' description='CNPJ' mask='CPFCNPJ' value={state.CNPJ} disabled={true} width='20%' margin='4px 20px 4px 0px' maxLength={18} />
                <Input name='razao' type='text' description='Razão Social' value={state.Razao} disabled={true} width='67.5%' margin='4px 0px 4px 0px' />
            </ContainerInputs>
            <Divisor width={'97.5%'} />
            <LocalEmailDiv>
                <ComboTipoEmail width={'30%'} description={'Tipo E-mail'} dispatch={{dispatch: dispatch, type:'setTipoEmail'}} value={state.IDTipoEmail} />
                <Input name='emailresposta' type='text' description='E-mail Resposta' value={state.EmailResposta} onChange={(event) => handleChange(event, 'setEmailResposta')} width='67.7%' margin='4px 0px 4px 0px' />
                <Input name='assunto' type='text' description='Assunto' value={state.Assunto} onChange={(event) => handleChange(event, 'setAssunto')} width='100%' margin='4px 0px 20px 0px' />
                <DivTextArea width='100%' >
                    <LabelCarimbo for="corpoEmail">Corpo do E-mail - HTML</LabelCarimbo>
                    <DescricaoTextArea id="corpoEmail" value={state.Corpo} height={'160px'} onChange={(event) => handleChange(event, 'setCorpo')} />
                </DivTextArea>
                <DivTextArea width='86%'>
                    <LabelCarimbo for="assinaturaEmail">Assinatura - HTML</LabelCarimbo>
                    <DescricaoTextArea id="assinaturaEmail" value={state.Assinatura} height={'80px'} onChange={(event) => handleChange(event, 'setAssinatura')} />
                </DivTextArea>
                <ButtonActionBlue title={'Salvar'} width={'12%'} justButton margin={'67px 0px 0px 15px'} onClick={handleSalvar} />
            </LocalEmailDiv>
            <WarningModal openModal={openWarning} setOpenModal={setOpenWarning} action={message} header={'Configuração E-mail'} />
            <SucessModal openModal={openSucess} setOpenModal={setOpenSucess} action={message} header={'Configuração E-mail'} />
        </Main>
    )
}

export default ConfiguracaoEmail