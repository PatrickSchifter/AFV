import React, {useContext, useEffect, useState} from "react";
import styled from 'styled-components';

import { fetchItems } from "../../../utils/fetch";
import {AuthContext} from '../../../auth'

import ButtonDelete from "../../../components/ButtonDelete";


const Table = styled.table`
    display: block;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    border-radius: 10px;
    border-collapse: collapse;
    height: 100%;
    white-space: nowrap;
    overflow: auto;
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

const TableBody = styled.tbody`
  
`

const TableHead = styled.thead`
  width: 100%;
`

function GradeOfertaEstrutura({setOpenConfirmModal, IDOferta, dispatch, dadosGrade, setDadosGrade, setMessage, update}) {
  const {setIsAuthenticated} = useContext(AuthContext);
  const [selectedRow, setSelectedRow] = useState(null);

  const url = process.env.REACT_APP_API_URL + `g-oferta-estrutura?idoferta=${IDOferta}`;

  useEffect(() => {
    if(IDOferta){
      const obtemDados = async () => {
        const response = await fetchItems(url, 'GET', null, setIsAuthenticated)
        
        if(response.status === 404){
          setDadosGrade([])
        }else{
          setDadosGrade(response.data)
        }
      }
      obtemDados();
    }
  }, [IDOferta, update]);


  function handleClickGrade (index){
    setSelectedRow(index);
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

  const handleDelete = (IDOfertaEstrutura) => {
    dispatch({type: 'setIDOfertaEstrutura', payload: IDOfertaEstrutura})
    setMessage('Tem certeza que deseja excluir o registro selecionado?');
    setOpenConfirmModal(true)
  }

  return (
      <Table>
        <TableHead>
          <tr style={{ height : "35px"}}>
            <TableTH>SKU</TableTH>
            <TableTH>Produto</TableTH>
            <TableTH>Familia</TableTH>
            <TableTH>Grande Grupo</TableTH>
            <TableTH>Grupo</TableTH>
            <TableTH>Sub Grupo</TableTH>
            <TableTH>Marca</TableTH>
            <TableTH>Categoria</TableTH>
            <TableTH>Fabricante</TableTH>
            <TableTH>Linha</TableTH>
            <TableTH>Qtd. Ofertada</TableTH>
            <TableTH>Qtd. Minima</TableTH>
            <TableTH>Qtd. Maxima</TableTH>
            <TableTH>% Desconto</TableTH>
            <TableTH>% Desconto 2</TableTH>
            <TableTH>Excluir</TableTH>
          </tr>
        </TableHead>
        {dadosGrade.length === 0 ? <></> : 
          <TableBody>
          {dadosGrade.map((dados, index) => (
            <tr key={dados.IDOfertaEstrutura} style={{ backgroundColor: handleColorRow(index)}} onClick={() => handleClickGrade(index)}>
              <TableTD>{dados.SKU}</TableTD>
              <TableTD>{dados.DesProduto}</TableTD>
              <TableTD>{dados.DesFamilia}</TableTD>
              <TableTD>{dados.DesGrandeGrupo}</TableTD>
              <TableTD>{dados.DesGrupo}</TableTD>
              <TableTD>{dados.DesSubGrupo}</TableTD>
              <TableTD>{dados.DesMarca}</TableTD>
              <TableTD>{dados.DesCategoria}</TableTD>
              <TableTD>{dados.DesFabricante}</TableTD>
              <TableTD>{dados.DesLinha}</TableTD>
              <TableTD>{dados.QtOferta}</TableTD>
              <TableTD>{dados.QtMinima}</TableTD>
              <TableTD>{dados.QtMaxima}</TableTD>
              <TableTD>{dados.DesOferta ? parseFloat(dados.DesOferta).toFixed(2) : ''}</TableTD>
              <TableTD>{dados.DesOferta2 ? parseFloat(dados.DesOferta2).toFixed(2)  : ''}</TableTD>
              <TableTD><ButtonDelete onClick={() => handleDelete(dados.IDOfertaEstrutura)} /></TableTD>
            </tr>
          ))} 
        </TableBody>
        }
      </Table>
  );
}

export default GradeOfertaEstrutura;
