import React, {useState, useEffect, useContext} from "react";
import styled from 'styled-components'

import {AuthContext} from '../../../../auth'
import { fetchItems } from "../../../../utils/fetch";
import { handleSituacao, handleColorRowGrade } from "../../../../utils/utils";
import {configPopUp} from '../../../../components/PopUpSecondary/service';
import { ContentContext } from "../../../../contexts/contentContext";

import EventosDeDescontoComercial from "../../EventosDeDescontoComercial";

const Table = styled.table`
    display: block;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    border-radius: 10px;
    border: none;
    border-collapse: collapse;
    width: 100%;
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
    width: ${props => props.width ? props.width  : '50px'};
`


function GradeDescontoComercial({desconto, setDesconto, setUpdate}) {

  const [selectedRow, setSelectedRow] = useState(null);

  const {dispatch} = useContext(ContentContext);
  const {setIsAuthenticated} = useContext(AuthContext);
  const url = process.env.REACT_APP_API_URL + `cascata`;

  useEffect(() => {
    async function getData(){
      const dados = await fetchItems(url, 'GET', null, setIsAuthenticated)
      if(dados.status === 404){
        setDesconto([{IDCascata: '', DesCascata:'', Situacao: ''}])
      }else{
        setDesconto(dados.data)
      }
    }
    getData();
  }, [])

  const handleClickGrade =(index)=>{
    setSelectedRow(index)
  }

  const handleDoubleClickGrade =(IDCascata)=>{
    configPopUp(dispatch, <EventosDeDescontoComercial IDCascata={IDCascata} Modo={'A'} setUpdate={setUpdate} />, true, 'Eventos de Desconto Comercial', '681px', '443px')
  }

  return (
    <Table>
      <thead>
        <tr style={{ height : "35px"}}>
          <TableTH style={{ borderRadius : "5px 0px 0px 0px"}}>Código</TableTH>
          <TableTH >Descrição</TableTH>
          <TableTH style={{  borderRadius : "0px 5px 0px 0px"}}>Situação</TableTH>
        </tr>
      </thead>
      <tbody>
        {desconto.map((desconto, index) => (
          <tr key={index} style={{height : "35px", backgroundColor: handleColorRowGrade(index, selectedRow)}} onClick={() => handleClickGrade(index)} onDoubleClick={() => handleDoubleClickGrade(desconto.IDCascata)}>
            <TableTD width='100px' >{desconto.IDCascata}</TableTD>
            <TableTD width='300px'>{desconto.DesCascata}</TableTD>
            <TableTD width='200px'>{handleSituacao(desconto.Situacao)}</TableTD>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default GradeDescontoComercial;
