import React, {useState, useEffect, useContext} from "react";
import styled from 'styled-components'

import { AuthContext } from "../../../auth";
import { fetchItems } from "../../../utils/fetch";

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
    font-size: 14px;
    text-align: center;
`


function GradeClienteEndereco({IDCliente}) {

  const [enderecos, setEnderecos] = useState([{
    IDEndereco: null,
    TipoEndereco: null,  
    Logradouro: null,
    CEP: null,
    Numero: null,
    Bairo: null,
    Complemento: null
  }])

  const {setIsAuthenticated} = useContext(AuthContext)
  const url = process.env.REACT_APP_API_URL + `cliente-endereco/idcliente=${IDCliente}`;

  useEffect(() => {
    async function getData(){
      const dados = await fetchItems(url, 'GET', null, setIsAuthenticated)
      if(dados.status !== 404){
        setEnderecos(dados.data)
      }
    }
    getData();
  }, [])

  return (
    <Table>
      <thead>
        <tr style={{ height : "35px"}}>
          <TableTH style={{ width : "10%", borderRadius : "5px 0px 0px 0px"}}>Tipo de Endereço</TableTH>
          <TableTH style={{ width : "10%"}}>Logradouro</TableTH>
          <TableTH style={{ width : "10%"}}>CEP</TableTH>
          <TableTH style={{ width : "10%"}}>Número</TableTH>
          <TableTH style={{ width : "10%"}}>Bairro</TableTH>
          <TableTH style={{ width : "10%", borderRadius : "0px 5px 0px 0px"}}>Complemento</TableTH>
        </tr>
      </thead>
      <tbody>
        {enderecos.map((endereco, index) => (
          <tr key={endereco.IDEndereco} style={{ backgroundColor: index % 2 === 0 ? "#ffffff":"#E9E8E8"}}>
            <TableTD style={{ width : "10%"}}>{endereco.TipoEndereco === 'F'? 'Faturamento': ''}</TableTD>
            <TableTD style={{ width : "20%"}}>{endereco.Logradouro}</TableTD>
            <TableTD style={{ width : "10%"}}>{endereco.CEP}</TableTD>
            <TableTD style={{ width : "10%"}}>{endereco.Numero}</TableTD>
            <TableTD style={{ width : "10%"}}>{endereco.Bairro}</TableTD>
            <TableTD style={{ width : "10%"}}>{endereco.Complemento}</TableTD>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default GradeClienteEndereco;
