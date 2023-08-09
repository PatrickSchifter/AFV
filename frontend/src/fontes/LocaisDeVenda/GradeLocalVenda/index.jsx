import React, {useState, useEffect, useContext, useCallback} from "react";
import styled from 'styled-components'

import {AuthContext} from '../../../auth'
import { fetchItems } from "../../../utils/fetch";
import { handleSituacao, handleColorRowGrade } from "../../../utils/utils";
import {configPopUp} from '../../../components/PopUpSecondary/service';
import { ContentContext } from "../../../contexts/contentContext";
import { mask } from "../../../utils/utils";

import WrapDadosLocaisDeVenda from "../WrapDadosLocaisDeVenda";


const Table = styled.table`
    display: block;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    border-radius: 10px;
    border: none;
    border-collapse: collapse;
    width: 100%;
    margin-top: 15px;
`

const TableTH = styled.th`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 14px;
    font-weight: 500;
    background-color: #00909E;
    color: white;
    text-align: center;
`

const TableTD = styled.td`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;
    text-align: center;
    min-width: 80px;
    width: ${props => props.width ? props.width  : '80px'};
`


function GradeLocalVenda({localVenda, setLocalVenda, update, setUpdate}) {

  const [selectedRow, setSelectedRow] = useState(null);

  const {dispatch} = useContext(ContentContext);
  const {setIsAuthenticated} = useContext(AuthContext);
  const url = process.env.REACT_APP_API_URL + `local-venda`;

  const getData = useCallback(async () => {
    const dados = await fetchItems(url, 'GET', null, setIsAuthenticated)
    if(dados.status === 404){
      setLocalVenda([{IDLocalVenda: '', Razao:'', Fantasia: '', CNPJ: '', CodERP: '', Situacao: ''}])
    }else{
      setLocalVenda(dados.data)
    }
  },[])

  useEffect(() => {
    getData();
  }, [update])

  const handleClickGrade =(index)=>{
    setSelectedRow(index)
  }

  const handleDoubleClickGrade =(LocalVenda)=>{
    configPopUp(dispatch, <WrapDadosLocaisDeVenda LocalVenda={LocalVenda} Modo={'A'} setUpdate={setUpdate} /> , true, 'Dados Locais de Venda', '850px', '507px')
  }

  return (
    <Table>
      <thead>
        <tr style={{ height : "35px"}}>
          <TableTH style={{ borderRadius : "5px 0px 0px 0px"}}>Código ERP</TableTH>
          <TableTH >CNPJ</TableTH>
          <TableTH >Razão</TableTH>
          <TableTH >Fantasia</TableTH>
          <TableTH style={{  borderRadius : "0px 5px 0px 0px"}}>Situação</TableTH>
        </tr>
      </thead>
      <tbody>
        {localVenda.map((local, index) => (
          <tr key={local.IDLocalVenda} style={{height : "35px", backgroundColor: handleColorRowGrade(index, selectedRow)}} onClick={() => handleClickGrade(index)} onDoubleClick={() => handleDoubleClickGrade(local)}>
            <TableTD width='10%' >{local.CodERP}</TableTD>
            <TableTD width='15%'>{mask('CPFCNPJ', local.CNPJ)}</TableTD>
            <TableTD width='34%'>{local.Razao}</TableTD>
            <TableTD width='34%'>{local.Fantasia}</TableTD>
            <TableTD>{handleSituacao(local.Situacao)}</TableTD>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default GradeLocalVenda;
