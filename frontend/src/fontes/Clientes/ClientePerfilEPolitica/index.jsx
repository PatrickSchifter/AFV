import styled from "styled-components";
import { useEffect, useReducer, useState, useContext } from "react";
import { fetchItems } from '../../../utils/fetch'
import { salvarDados } from "./services";
import { AuthContext } from '../../../auth'

import Input from '../../../components/Input';
import Frame from '../../../components/Frame';
import Flag from "../../../components/Flag";
import ButtonActionBlue from "../../../components/ButtonActionBlue";
import ComboPrecoRegra from "../../../components/Combo/ComboPrecoRegra/index.jsx";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import ComboClienteTipo from "../../../components/Combo/ComboClienteTipo";
import ComboGrupoEconomico from "../../../components/Combo/ComboGrupoEconomico";
import ComboRede from "../../../components/Combo/ComboRede";
import ComboTipoPedido from "../../../components/Combo/ComboTipoPedido";
import ComboTipoFrete from "../../../components/Combo/ComboTipoFrete";
import ComboTransportador from "../../../components/Combo/ComboTransportador";
import ComboRegiaoVenda from "../../../components/Combo/ComboRegiaoVenda";
import LimiteDeCredito from "../../../components/LimiteDeCredito";


const WrapperItems = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
    height: 75%;
    margin-top: 10px;
`
const WrapperButton = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    width: 100%;
    height: 12%;
`
const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    
    width: 97%;
    height: 99%;
`

const initialState = null;

const reducerState = (state, action) => {
    switch(action.type){
        case 'set_data':
            return { ...state, ...action.payload };
        case 'setIdPrecoRegra':
            return { ...state, IDPrecoRegra: action.payload };
        case 'setPedidoMinimo':
            return { ...state, PedidoMinimo: action.payload };
        default:
            return state
    }
}


const ClientePerfilEPolitica = ({IDCliente}) => {
    let url = process.env.REACT_APP_API_URL + `cliente-perfil/idcliente=${IDCliente}`
    const token = localStorage.getItem('token');

    const {setIsAuthenticated} = useContext(AuthContext);

    const [state, dispatch] = useReducer(reducerState, initialState);
    const [openModal, setOpenModal] = useState(false)

    const handleSalvar = () => {
        setOpenModal(true);
    }


    useEffect(() => {
        async function obtemDadosPerfil(){
            try{
                const response = await fetchItems(url, 'GET', null, setIsAuthenticated)
                dispatch({type: 'set_data', payload: response.data[0]}) 
            }catch(error){
                console.error(error)
            }
        }
        obtemDadosPerfil();
    }, [])

    if(state === null){
        return <div>Carregando</div>
    }

    return (
        <Main>
            <WrapperItems>
                <ComboClienteTipo value={state.TipoCliente} width='22.6%' disabled={true} />
                <ComboGrupoEconomico value={state.GrupoEco} width='22.6%' disabled={true} />
                <ComboRede value={state.Rede} width='33.6%' disabled={true} />
                <ComboTipoPedido value={state.IDTipoPedido} width='15.66%' disabled={true} margin='0px 0px 15px 0px' />

                <ComboPrecoRegra value={state.IDPrecoRegra} dispatch = {{dispatch: dispatch, type: 'setIdPrecoRegra'}} width='47%' disabled={false} margin='0px 20px 15px 0px' />
                <Input name='prazomedio' type='text' description='Prazo Medio' value={state.PrazoMedio} width='8%' disabled={true} margin='0px 20px 15px 0px' />
                <Input name='descontocomposto' type='text' description='Desconto Composto' value={state.DesComposto} width='13%' disabled={true} margin='0px 20px 15px 0px' />
                <Input name='inscricaomunicipal' type='text' description='Desconto(%)' value={state.PerDesconto} width= '8.5%' disabled={true} margin='0px 20px 15px 0px' />
                <ComboTipoFrete value={state.TipoFrete} width='15.66%' disabled={true} margin='0px 0px 15px 0px' />

                <ComboTransportador value={state.IDTransportador} width='22.5%' disabled={true} margin='0px 20px 0px 0px' />
                <ComboRegiaoVenda value={state.IDRegiao} width='22.5%' disabled={true} margin='0px 20px 0px 0px' />
                <Input name='descricaogeral' type='text' description='Descrição Geral' value={state.DesGeral} width='51%' disabled={true} margin='0px 0px 15px 0px' />

                <Frame title='Condições Especiais' width='47%' height='26%' left='90px' margin='20px 20px 0 0'>
                    <LimiteDeCredito description='Limite de Crédito' value={state.LimiteCredito} width='50%' disabled={true} margin='10px 20px 0 0' />
                    <Flag value={state.PedidoMinimo} disabled={false} name='exigepedidominimo' description='Exige Pedido Minimo' width='40%' margin='10px 0px 0px 0px' dispatch={{dispatch: dispatch, type: 'setPedidoMinimo'}} />
                </Frame>
            </WrapperItems>
            <WrapperButton>
                <ButtonActionBlue title='Salvar' margin='0' justButton onClick={handleSalvar} />
            </WrapperButton>
            <ConfirmModal 
                openModal={openModal} 
                setOpenModal={setOpenModal} 
                header='Dados Clientes - Perfil e Política' 
                action='Tem certeza que deseja salvar?' 
                caseYes={{func: salvarDados, param: [state, setIsAuthenticated]}} 
            />
        </Main>
        
    )   
}

export default ClientePerfilEPolitica

