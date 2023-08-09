import React, {useContext, useState, useEffect} from "react";
import styled from 'styled-components';
import { fetchItems } from "../../../utils/fetch";
import {AuthContext} from '../../../auth';
import { handleSituacao } from "../../../utils/utils";

const Table = styled.table`
    display: block;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    border-radius: 10px;
    border-collapse: collapse;
    height: 60%;
    white-space: nowrap;
    overflow-y: auto;
`

const TableTH = styled.th`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 14px;
    font-weight: 500;
    background-color: #00909E;
    color: white;
    padding: 0px 20px;
    text-align: left;
    width: 10%;
`

const TableTD = styled.td`
  padding: 0px 20px;
  height: 33px;
  width: 10%;
`

function GradeClienteContatos({IDCliente, update}) {
  const {setIsAuthenticated} = useContext(AuthContext)
  const [dadosContato, setDadosContato] = useState([{
    IDContato: null,
    IDCliente: null,
    Nome: null,
    DataNascimento: null,
    Funcao: null,
    Departamento: null,
    TelFixo: null,
    TelCelular: null,
    NumWhats: null,
    EmailCorp: null,
    PedidoCorp: null,
    EmailPessoal: null,
    PedidoPessoal: null,
    Situacao: null
  }])
  const [selectedRow, setSelectedRow] = useState(null)
  const url = process.env.REACT_APP_API_URL + `cliente-contato/idcliente=${IDCliente}`;

  const handleColorRow = (index) => {
    if(index === selectedRow){
      return '#BBCAEF'
    }else if(index % 2 === 0){
      return '#ffffff'
    }else{
      return '#E9E8E8'
    }
  }

  useEffect(() => {
    async function getData(){
      const dados = await fetchItems(url, 'GET', null, setIsAuthenticated)
      if(dados.data){
        setDadosContato(dados.data)
      }else{
        setDadosContato([])
      }
    }
    getData();
  }, [update])


  return (
    <Table>
      <thead>
        <tr style={{ height : "35px"}}>
          <TableTH>Telefone Fixo</TableTH>
          <TableTH>Nome</TableTH>
          <TableTH>Email Pessoal</TableTH>
          <TableTH>Data de Nascimento</TableTH>
          <TableTH>Telefone Celular</TableTH>
          <TableTH>Email Corporativo</TableTH>
          <TableTH>Situação</TableTH>
        </tr>
      </thead>
      {dadosContato.length === 0 ? <></> :
        <tbody>
        {dadosContato.map((dados, index) => (
          <tr key={index} style={{ backgroundColor: handleColorRow(index)}}>
            <TableTD>{dados.TelFixo}</TableTD>
            <TableTD>{dados.Nome}</TableTD>
            <TableTD>{dados.EmailPessoal}</TableTD>
            <TableTD>{dados.DataNascimento}</TableTD>
            <TableTD>{dados.TelCelular}</TableTD>
            <TableTD>{dados.EmailCorp}</TableTD>
            <TableTD>{handleSituacao(dados.Situacao)}</TableTD>
          </tr>
        ))} 
      </tbody>
      }
      
    </Table>
  );
}

export default GradeClienteContatos;
