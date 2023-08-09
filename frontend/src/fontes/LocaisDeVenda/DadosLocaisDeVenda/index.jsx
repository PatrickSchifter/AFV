import React, {useEffect, useState, useContext, useCallback, useReducer} from 'react';
import {AuthContext} from '../../../auth';
import {fetchItems} from '../../../utils/fetch';
import { convertBinaryToImage, arrayBufferToHexString } from '../../../utils/utils';
import { handleDelete, reducer } from './services';
import { LocalVendaContext } from '../../../contexts/localVendaContext';

import Input from '../../../components/Input';
import SelectSituacao from '../../../components/SelectSituacao';
import ComboCidade from '../../../components/Combo/ComboCidade';
import ButtonActionBlue from '../../../components/ButtonActionBlue';
import ButtonConfiguracao from '../../../components/ButtonConfiguracao';
import SucessModal from '../../../components/Modal/SucessModal';
import WarningModal from '../../../components/Modal/WarningModal';
import Divisor from '../../../components/Divisor';
import ButtonNewBlue from '../../../components/ButtonNewBlue';
import GradeLocalEmail from '../GradeLocalEmail';
import WrapConfirmModal from '../WrapConfirmModal';
import WrapSecondaryPopUp from '../WrapSecondaryPopUp';
import MenuUploadImage from '../../../components/MenuUploadImage';
import PopUpSecondary from '../../../components/PopUpSecondary';

import {Main, TabContainer, Tab, Dados, ConfigEmail, Img, ContainerImage, ContainerImageLabel, Section, ContainerInputs } from './components'
import ConfiguracaoLocalVenda from '../ConfiguracaoLocalVenda';

const DadosLocaisDeVenda = ({LocalVenda, Modo, setUpdate}) => {
    const initialState = {
        IDLocalVenda: LocalVenda.IDLocalVenda ? LocalVenda.IDLocalVenda : null,
        CNPJ: LocalVenda.CNPJ ? LocalVenda.CNPJ : null,
        Razao: LocalVenda.Razao ? LocalVenda.Razao : null,
        Fantasia: LocalVenda.Fantasia ? LocalVenda.Fantasia : null,
        CEP: LocalVenda.CEP ? LocalVenda.CEP : null,
        Logradouro: LocalVenda.Logradouro ? LocalVenda.Logradouro : null,
        Numero: LocalVenda.Numero ? LocalVenda.Numero : null,
        Complemento: LocalVenda.Complemento ? LocalVenda.Complemento : null,
        Bairro: LocalVenda.Bairro ? LocalVenda.Bairro : null,
        CodIBGE: LocalVenda.CodIBGE ? LocalVenda.CodIBGE : null,
        CodERP: LocalVenda.CodERP ? LocalVenda.CodERP : null,
        Situacao: LocalVenda.Situacao ? LocalVenda.Situacao : null,
        Foto: null,
        Modo: Modo,
        IDTipoEmail:null
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    const {setIsAuthenticated} = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState(1);
    const [message, setMessage] = useState('');
    const [openWarning, setOpenWarning] = useState(false);
    const [openSucess, setOpenSucess] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [showMenuImg, setShowMenuImg] = useState(false);
    const {setLocalEmailPopUp, setModoPopUp, setOpenPopUp} = useContext(LocalVendaContext);
    const [openPopUpS, setOpenPopUpS] = useState(false);

    const obtemFoto = useCallback( async() => {
        const url = process.env.REACT_APP_API_URL + `f-local-venda?idlocalvenda=${LocalVenda.IDLocalVenda}`;
        const dados = await fetchItems(url, 'GET', null, setIsAuthenticated);
        if(dados.data[0].Foto){
            dispatch({type: 'setFoto', payload:dados.data[0].Foto.data});
        }
    },[LocalVenda])

    useEffect(()=>{
        if(Modo === 'A'){
            obtemFoto();
        }
    }, [])

    const handleChange = (event, type) => {
        dispatch({type:type, payload: event.target.value});
    }

    const handleClickDados = () => {
        if(activeTab === 1 ){
            return
        }else{
            setActiveTab(1);
        }
    }

    const handleClickConfiguracao = () => {
        if(activeTab === 2 ){
            return
        }else{
            setActiveTab(2);
        }
    }

    const handleBlurCodERP = async () => {
        if(state.CodERP && state.CodERP !== initialState.CodERP){
            const urlGetCodERP = process.env.REACT_APP_API_URL + `local-venda?coderp=${state.CodERP}`;
            const dados = await fetchItems(urlGetCodERP, 'GET', null, setIsAuthenticated);
            if(dados.status !== 404){
                dispatch({type:'setCodERP', payload:' '});
                setMessage('Código já existente');
                setOpenWarning(true);
            }
        }
    }

    const handleSalvar = async () => {
        console.log(state)
        if(!state.CodERP || state.CodERP === ' '){
            setMessage('É necessário preencher o Código')
            setOpenWarning(true)
        }else if(!state.CNPJ){
            setMessage('É necessário preencher o CNPJ')
            setOpenWarning( );
        }else if(!state.Razao){
            setMessage('É necessário preencher a Razão')
            setOpenWarning(true);
        }else if(!state.Fantasia){
            setMessage('É necessário preencher a Fantasia')
            setOpenWarning(true);
        }else if(!state.CEP){
            setMessage('É necessário preencher o CEP')
            setOpenWarning(true);
        }else if(!state.Logradouro){
            setMessage('É necessário preencher o Logradouro')
            setOpenWarning(true);
        }else if(!state.Numero){
            setMessage('É necessário preencher o Numero')
            setOpenWarning(true);
        }else if(!state.Bairro){
            setMessage('É necessário preencher o Bairro')
            setOpenWarning(true);
        }else if(!state.CodIBGE){
            setMessage('É necessário selecionar uma Cidade')
            setOpenWarning(true);
        }else if(!state.Situacao){
            setMessage('É necessário selecionar uma Situação')
            setOpenWarning(true);
        }else{
            if(state.Modo == 'I'){
                const urlPost = process.env.REACT_APP_API_URL + `local-venda`;
                const response = await fetchItems(urlPost, 'POST', {dados_local_venda: {...state, Foto: arrayBufferToHexString(state.Foto)}}, setIsAuthenticated);
                dispatch({type:'setIDLocalVenda', payload:{IDLocalVenda: response.data.recordset[0].IDLocalVenda}})
            }
            if(state.Modo == 'A'){
                const urlPost = process.env.REACT_APP_API_URL + `local-venda`;
                await fetchItems(urlPost, 'PATCH', {dados_local_venda: {...state, Foto: arrayBufferToHexString(state.Foto)}}, setIsAuthenticated);
            }
            setMessage(state.Modo === 'I' ? 'Local de Venda inserido com sucesso':'Local de Venda alterado com sucesso');
            setOpenSucess(true);
            setUpdate((old)=>!old);
            dispatch({type: 'setModo'});
            setActiveTab(2);
        }
    }

    const handleClickNovo = () => {
        setOpenPopUp(true);
        setModoPopUp('I');
        setLocalEmailPopUp({
            EmailResposta: null,
            Assunto: null,
            Corpo: null,
            Assinatura: null,
            IDTipoEmail: null
        })
    }

    const handleClickButtonConfiguracao = () => {
        setOpenPopUpS(true)
    }

    return (
            <Main>  
                <TabContainer>
                    <Tab activeTab={activeTab === 1} onClick={handleClickDados} width={'74px'} >Dados</Tab>
                    <Tab activeTab={activeTab === 2} onClick={handleClickConfiguracao} width={'181px'} >Configuração de Email</Tab>
                    <Tab activeTab={false} width={'593px'} ></Tab>
                </TabContainer>
                <Dados activeTab={activeTab === 1}>
                    <Section>
                        <Input name='codigo' type='text' description='Código' value={state.CodERP} width='20%' onChange={(event) => handleChange(event, 'setCodERP')} margin='4px 20px 4px 0px' inputMode={'numeric'} onBlur={handleBlurCodERP} />
                        <Input name='cnpj' type='text' description='CNPJ' mask='CPFCNPJ' value={state.CNPJ} onChange={(event) => handleChange(event, 'setCNPJ')} width='43%' margin='4px 20px 4px 0px' maxLength={18} />
                        <SelectSituacao value={state.Situacao} width={'27%'} margin='2px 0px 2px 0px' description={'Situação'} onChange={(event) => handleChange(event, 'setSituacao')} />
                        <Input name='razao' type='text' description='Razão Social' value={state.Razao} onChange={(event) => handleChange(event, 'setRazao')} width='100%' margin='4px 20px 4px 0px' />
                        <Input name='fantasia' type='text' description='Fantasia' value={state.Fantasia} onChange={(event) => handleChange(event, 'setFantasia')} width='100%' margin='4px 20px 4px 0px' />
                    </Section>
                    <ContainerImageLabel>
                        <p>Foto</p>
                        <ContainerImage onMouseEnter={() => setShowMenuImg(true)} onMouseLeave={() => setShowMenuImg(false)}>
                            <Img src={state.Foto ? convertBinaryToImage(state.Foto) : ''} />
                            <MenuUploadImage show={showMenuImg} dispatch={dispatch} setShowMenuImg={setShowMenuImg} />
                        </ContainerImage>
                    </ContainerImageLabel>
                    <Input name='logradouro' type='text' description='Logradouro' value={state.Logradouro} onChange={(event) => handleChange(event, 'setLogradouro')} width='64%' margin='5px 20px 5px 0px' />
                    <Input name='numero' type='text' description='Número' value={state.Numero} onChange={(event) => handleChange(event, 'setNumero')} width='13%' margin='5px 20px 5px 0px' />
                    <Input name='cep' type='text' description='CEP' mask={'CEP'} value={state.CEP} onChange={(event) => handleChange(event, 'setCEP')} maxLength={8} width='13%' margin='5px 20px 5px 0px' />
                    <Input name='complemento' type='text' description='Complemento' value={state.Complemento} onChange={(event) => handleChange(event, 'setComplemento')} width='60%' margin='5px 20px 5px 0px' />
                    <Input name='bairro' type='text' description='Bairro' value={state.Bairro} onChange={(event) => handleChange(event, 'setBairro')} width='32.5%' margin='5px 20px 5px 0px' />
                    <ComboCidade value={state.CodIBGE} width={'62.8%'} margin='5px 20px 5px 0px' description={'Cidade'} dispatch={{dispatch: dispatch, type: 'setCodIBGE'}} />
                    <ButtonConfiguracao width={'120px'} margin='5px 20px 5px 0px' onClick={handleClickButtonConfiguracao} />
                    <ButtonActionBlue title={'Salvar'} onClick={handleSalvar} width={'115px'} margin='5px 20px 5px 0px' />
                </Dados >
                <ConfigEmail activeTab={activeTab === 2}>
                    <ContainerInputs>
                        <Input name='codigo' type='text' description='Código' value={state.CodERP} width='10%' disabled={true} onChange={(event) => handleChange(event, 'setCodERP')} margin='4px 20px 4px 0px' inputMode={'numeric'} onBlur={handleBlurCodERP} />
                        <Input name='cnpj' type='text' description='CNPJ' mask='CPFCNPJ' value={state.CNPJ} disabled={true} onChange={(event) => handleChange(event, 'setCNPJ')} width='20%' margin='4px 20px 4px 0px' maxLength={18} />
                        <Input name='razao' type='text' description='Razão Social' value={state.Razao} disabled={true} onChange={(event) => handleChange(event, 'setRazao')} width='47.5%' margin='4px 20px 4px 0px' />
                        <ButtonNewBlue onClick={handleClickNovo} />
                    </ContainerInputs>
                    <Divisor width={'96.3%'} />
                    <GradeLocalEmail LocalVenda={state} setMessage={setMessage} setOpenConfirm={setOpenConfirm} dispatchLocalVenda={dispatch} />
                </ConfigEmail>
                <WrapSecondaryPopUp LocalVenda={LocalVenda} />
                <SucessModal openModal={openSucess} setOpenModal={setOpenSucess} header={'Dados Local de Venda'} action={message} />
                <WarningModal openModal={openWarning} setOpenModal={setOpenWarning} header={'Dados Local de Venda'} action={message} />
                <WrapConfirmModal openConfirm={openConfirm} setOpenConfirm={setOpenConfirm} message={message} handleDelete={handleDelete} dispatch={dispatch} state={state} setIsAuthenticated={setIsAuthenticated} />
                <PopUpSecondary openPopUp={openPopUpS} setOpenPopUp={setOpenPopUpS} width={'1022px'} height={'504px'} header={'Configuração do Local de Venda'}><ConfiguracaoLocalVenda /></PopUpSecondary>
            </Main>
    ) 
}

export default DadosLocaisDeVenda