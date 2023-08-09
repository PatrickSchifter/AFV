import React, {useContext, useEffect, useState} from "react";
import styled from 'styled-components';

import { fetchItems } from "../../../utils/fetch";
import {AuthContext} from '../../../auth'
import { obtemDados } from "../ClienteXVendedores/service";

import ButtonDelete from "../../../components/ButtonDelete";
import ButtonView from "../../../components/ButtonView";
import EventosDeDescontoComercial from "../EventosDescontoComercial";
import DescontoVolumeFinanceiro from '../DescontoVolumeFinanceiro';
import PopUpSecondary from "../../../components/PopUpSecondary";

const Table = styled.table`
    display: block;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    border-radius: 10px;
    border-collapse: collapse;
    height: 100%;
    white-space: nowrap;
`

const TableTH = styled.th`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 14px;
    font-weight: 500;
    background-color: #00909E;
    color: white;
    padding: 0px 20px;
    text-align: left;
    width: 15%;
`

const TableTD = styled.td`
  padding: 0px 20px;
  height: 33px;
  width: 15%;
`

const TableTDDiv = styled.div`
  display: flex;
  justify-content: space-between;
`

function GradeClienteXVendedores({dispatch, selectedRow, setSelectedRow, state, setOpenConfirmModal, IDCliente, update}) {
  const {setIsAuthenticated} = useContext(AuthContext);
  const [dadosGrade, setDadosGrade] = useState([]);
  const [openSecondaryPopUp, setOpenSecondaryPopUp] = useState(false);
  const [componentPopUp, setComponentPopUp] = useState(null);
  const [font, setFont] = useState(null);

  const dispatchDadosClienteVisita =( dadosClienteVisita ) => {
    dispatch({type: 'setSeg', payload: dadosClienteVisita.Seg})
    dispatch({type: 'setTer', payload: dadosClienteVisita.Ter})
    dispatch({type: 'setQua', payload: dadosClienteVisita.Qua})
    dispatch({type: 'setQui', payload: dadosClienteVisita.Qui})
    dispatch({type: 'setSex', payload: dadosClienteVisita.Sex})
    dispatch({type: 'setSab', payload: dadosClienteVisita.Sab})
    dispatch({type: 'setDom', payload: dadosClienteVisita.Dom})
    dispatch({type: 'setHora1', payload: dadosClienteVisita.Hora1})
    dispatch({type: 'setHora2', payload: dadosClienteVisita.Hora2})
    dispatch({type: 'setRecorrencia', payload: dadosClienteVisita.Recorrencia})
  }

  async function obtemDadosClienteVisita(url, IDClienteVendedor){
    let response
    try{
      response = await fetchItems(url, 'GET')
      let dadosClienteVisita;
    
      if(response.sucess){
        dadosClienteVisita = response.data[0]
        dispatchDadosClienteVisita(dadosClienteVisita)

      }else if(response.status === 404){
        const urlPost = process.env.REACT_APP_API_URL + `cliente-visita`;
        let responsePost = await fetchItems(urlPost, 'POST', {dados_cliente_visita: {IDClienteVendedor: IDClienteVendedor}}, setIsAuthenticated)
        let responseGet = await fetchItems(url, 'GET', {},setIsAuthenticated)

        if(responseGet.sucess === false){
          responsePost = await fetchItems(urlPost, 'POST', {dados_cliente_visita: {IDClienteVendedor: IDClienteVendedor}}, setIsAuthenticated)
          responseGet = await fetchItems(url, 'GET', {}, setIsAuthenticated)
        }

        dadosClienteVisita = responseGet.data[0]
        dispatchDadosClienteVisita(dadosClienteVisita)
      }
    }catch(error){
      console.log('Error:', error)
    }

  }
  
  async function handleClickGrade (index, IDUsuario, TipoUsuario, IDCascata, IDVolume, IDClienteVendedor){

    const url = process.env.REACT_APP_API_URL + `cliente-visita/idclientevendedor=${IDClienteVendedor}`;
    dispatch({type: 'setModo', payload:'A'});
    dispatch({type: 'setVendedor', payload:{IDUsuario: IDUsuario === null ? '' : IDUsuario, TipoUsuario: TipoUsuario === null ? '' : TipoUsuario}});
    dispatch({type: 'setDescontoComercial', payload:IDCascata === null ? '' : IDCascata});
    dispatch({type: 'setDescontoVolume', payload:IDVolume === null ? '' : IDVolume});
    await dispatch({type: 'setIDClienteVendedor', payload: IDClienteVendedor});
    setSelectedRow(index);
    obtemDadosClienteVisita(url, IDClienteVendedor);
  } 

  const handleColorRow = (index) => {
    if(index === selectedRow){
      return '#BBCAEF'
    }else if(index % 2 === 0){
      return '#ffffff'
    }else{
      return '#E9E8E8'
    }
  }

  const handleDelete = (IDClienteVendedor) => {
    dispatch({type: 'setIDClienteVendedor', payload: IDClienteVendedor})
    setOpenConfirmModal(true)
  }

  const handleClickViewCascata = (IDCascata) =>{
    setFont('EventosDeDescontoComercial')
    setComponentPopUp(<EventosDeDescontoComercial IDCascata={IDCascata} Modo={'V'} />)
    setOpenSecondaryPopUp(true);
  }

  const handleClickViewVolume = (IDVolume) =>{
    setFont('DescontoVolumeFinanceiro')
    setComponentPopUp(<DescontoVolumeFinanceiro IDVolume={IDVolume} />)
    setOpenSecondaryPopUp(true);
  }

  useEffect(() => {
    obtemDados(setDadosGrade, IDCliente);
  }, [update])

  return (
    <>
      <Table>
        <thead>
          <tr style={{ height : "35px"}}>
            <TableTH>Código ERP</TableTH>
            <TableTH>Nome</TableTH>
            <TableTH>Tipo do Usuário</TableTH>
            <TableTH>Equipe</TableTH>
            <TableTH>Linha</TableTH>
            <TableTH>Desconto Comercial</TableTH>
            <TableTH>Desconto por Volume</TableTH>
            <TableTH>Excluir</TableTH>
          </tr>
        </thead>
        {dadosGrade.length === 0? <></> :
          <tbody>
          {dadosGrade.map((dados, index) => (
            <tr key={dados.IDClienteVendedor} style={{ backgroundColor: handleColorRow(index)}} onClick={() => handleClickGrade(index, dados.IDUsuario, dados.TipoUsuario, dados.IDCascata, dados.IDVolume, dados.IDClienteVendedor)}>
              <TableTD>{dados.CodERP}</TableTD>
              <TableTD>{dados.Nome}</TableTD>
              <TableTD>{dados.TipoUsuario === 'V'? 'VENDEDOR': dados.TipoUsuario === 'R' ? 'REPRESENTADA': '' }</TableTD>
              <TableTD>{dados.DesEquipe}</TableTD>
              <TableTD>{dados.DesLinha}</TableTD>
              <TableTD><TableTDDiv>{dados.DesCascata}<ButtonView onClick={() => handleClickViewCascata(dados.IDCascata)} /></TableTDDiv></TableTD>
              <TableTD><TableTDDiv>{dados.DesVolume}<ButtonView onClick={() => handleClickViewVolume(dados.IDVolume)} /></TableTDDiv></TableTD>
              <TableTD><ButtonDelete onClick={() => handleDelete(dados.IDClienteVendedor)} /></TableTD>
            </tr>
          ))} 
        </tbody>
        }
      </Table>
      <PopUpSecondary
        openPopUp={openSecondaryPopUp}
        setOpenPopUp={setOpenSecondaryPopUp}
        width={font === 'EventosDeDescontoComercial' ? '681px' : '885px'}
        height={font === 'EventosDeDescontoComercial' ? '307px' : '315px'}
        header={font === 'EventosDeDescontoComercial' ? 'Eventos de Desconto Comercial': 'Desconto Por Volume Financeiro'}
      >
        {componentPopUp}
      </PopUpSecondary>
    </>
  );
}

export default GradeClienteXVendedores;
