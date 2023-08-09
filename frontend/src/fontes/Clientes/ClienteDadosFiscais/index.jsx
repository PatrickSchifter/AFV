import { useEffect, useReducer, useContext } from "react";
import {fetchItems} from '../../../utils/fetch'
import { AuthContext } from "../../../auth";

import styled from "styled-components";

import Input from '../../../components/Input';
import Frame from '../../../components/Frame';
import Combo from "../../../components/Combo";
import Flag from "../../../components/Flag";
import ComboNaturezaJuridica from "../../../components/Combo/ComboNaturezaJuridica";
import ComboSituacaoFiscal from "../../../components/Combo/ComboSituacaoFiscal";
import ComboDestinacao from "../../../components/Combo/ComboDestinacao";



const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    
    height: 90%;
    width: 97%;
    margin-top: 10px;
`

const DivCarimbo = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const DivInputsCarimbo = styled.div`
    width: 100%;
    display: flex;
`

const LabelCarimbo = styled.label`
    width: 100%;
`
const CarimboERP = styled.input`
    width: 15%;
    height: 35px;
    border: 1px solid rgb(211, 210, 210);
    margin-right: 15px;
    border-radius: 5px;
    background-color: ${props => props.disabled ? '#E9ECEF' : '#fff'};
`

const DescricaoCarimbo = styled.textarea`
    width: ${props => props.width};
    height: 100px;
    border: 1px solid rgb(211, 210, 210);
    border-radius: 5px;
    background-color: ${props => props.disabled ? '#E9ECEF' : '#fff'};
    vertical-align: top;
`

const initialState = {
        IDCliente: null,
		CNAEPrincipal: null,
		InscEstadual: null,
		InscMunicipal: null,
		NatJuridica: null,
		SitFiscal: null,
		Destinacao: null,
		ContribuinteICMS: null,
		OrgaoPublico: null,
		RegSuframa: null,
		DataRegSuframa: null,
		DataValSuframa: null,
		RegTare: null,
		DataRegTare: null,
		DataValTare: null,
		Carimbo: null,
        DescricaoCarimbo: null,
        DescComplementar: null
}

const reducer = (state, action) => {
    switch(action.type){
        case 'setDados':
            return {...state, ...action.payload}
    }
}

const ClienteDadosFiscais = ({IDCliente}) => {

    const [state, dispatch] = useReducer(reducer, initialState)
    const {setIsAuthenticated} = useContext(AuthContext)

    const url = process.env.REACT_APP_API_URL;
    useEffect(() => {
        async function getData(){
            const urlClienteEspecial = url + `cliente-especial/idcliente=${IDCliente}`;
            const urlClienteDadosFiscais = url + `cliente-fiscal/idcliente=${IDCliente}`;
            const clienteEspecial = await fetchItems(urlClienteEspecial, 'GET', setIsAuthenticated) ;
            const clienteDadosFiscais = await fetchItems(urlClienteDadosFiscais, 'GET', setIsAuthenticated);

            if(clienteEspecial.data[0].Carimbo){
                const urlCarimbo = url + `carimbo/idcarimbo=${clienteEspecial.data[0].Carimbo}`;
                const carimbo = await fetchItems(urlCarimbo, 'GET', setIsAuthenticated) ;
                dispatch({type: 'setDados', payload:{...clienteEspecial.data[0], ...clienteDadosFiscais.data[0], ...carimbo.data[0]}})
            }else{
                dispatch({type: 'setDados', payload:{...clienteEspecial.data[0], ...clienteDadosFiscais.data[0]}})
            }
        }
        getData();
        
    }, [])
    
    return (
        <Wrapper>
            <Input name='cnaprincipal' type='text' description='CNAE Principal' value={state.CNAEPrincipal} width='16%' disabled={true} margin='0px 20px 15px 0px' />
            <Input name='inscricaoestadual' type='text' description='Inscrição Estadual' value={state.InscEstadual} width='31%' disabled={true} margin='0px 20px 15px 0px' />
            <Input name='inscricaomunicipal' type='text' description='Inscrição Municipal' value={state.InscMunicipal} width='49%' disabled={true} margin='0px 0px 15px 0px' />
            <ComboNaturezaJuridica value={state.NatJuridica} width='16.2%' disabled={true} margin='0px 20px 0px 0px' />
            <ComboSituacaoFiscal value={state.SitFiscal} disabled={true} width='14.5%' margin='0px 20px 0px 0px' />
            <ComboDestinacao value={state.Destinacao} width='14.5%' disabled={true} margin='0px 20px 0px 0px' />
            <Flag value={state.ContribuinteICMS} disabled={true} name='contribuinteicms' description='Contribuinte ICMS' width='18%' />
            <Flag value={state.OrgaoPublico} disabled={true} name='orgaopublico' description='Órgão Público' width='20%' />
            <Frame title='Tipo de Regime Especial' width='100%' height='260px' left='100px' margin='20px 0 0 0'>
                <Frame title='SUFRAMA' width='48.8%' height='90%' left='60px' margin='20px 20px 0 0'>
                    <Input name='numeroregistros' type='text' description='Número de Registro' value={state.RegSuframa} width='30.6%' disabled={true} inputMode='numeric' margin='15px 20px 0px 0px' />
                    <Input name='dataregistros' type='text' description='Data de Registro' value={state.DataRegSuframa} width= '30.6%' disabled={true} margin='15px 20px 0px 0px' />
                    <Input name='datavalidades' type='text' description='Data de Validade' value={state.DataValSuframa} width='30.6%' disabled={true} margin='15px 0px 0px 0px' />
                    <DivCarimbo>
                        <LabelCarimbo for="carimboERP descricaoERP">Carimbo na Nota</LabelCarimbo>
                        <DivInputsCarimbo>
                            <CarimboERP id="carimboERP" disabled={true} value={state.Carimbo} />
                            <DescricaoCarimbo width='82%' id="descricaoERP" disabled={true} value={state.DescricaoCarimbo} />
                        </DivInputsCarimbo>
                    </DivCarimbo>
                </Frame>
                <Frame title='TARE' width='48.8%' height='90%' left='40px' margin='20px 0 0 0'>
                    <Input name='numeroregistrot' type='text' description='Número de Registro' value={state.RegTare} width='30.6%' disabled={true} inputMode='numeric' margin='15px 20px 0px 0px' />
                    <Input name='dataregistrot' type='text' description='Data de Registro' value={state.DataRegTare} width= '30.6%' disabled={true} margin='15px 20px 0px 0px' />
                    <Input name='datavalidadet' type='text' description='Data de Validade' value={state.DataValTare} width='30.6%' disabled={true} margin='15px 0px 0px 0px' />
                    <DivCarimbo>
                        <LabelCarimbo for="carimboERP descricaoERP">Descrição Adicional do Carimbo</LabelCarimbo>
                        <DivInputsCarimbo>
                            <DescricaoCarimbo width='100%' id="descricaoERP" disabled={true} value={state.DescComplementar} />
                        </DivInputsCarimbo>
                    </DivCarimbo>
                </Frame>
            </Frame>
        </Wrapper>
    )   
}

export default ClienteDadosFiscais

