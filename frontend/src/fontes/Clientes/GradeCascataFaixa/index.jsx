import React, {useState, useEffect, useContext} from "react";
import styled from 'styled-components'

import {AuthContext} from '../../../auth'
import { fetchItems } from "../../../utils/fetch";
import { handleColorRowGrade } from "../../../utils/utils";

import ButtonDelete from "../../../components/ButtonDelete";
import FlagGrade from "../../../components/FlagGrade";

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
    min-width: 100px;
`

const TableTD = styled.td`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;
    text-align: center;
    align-items: center;
    width: ${props => props.width ? props.width  : '40px'};
`


function GradeCascataFaixa({IDCascata}) {


  const [selectedRow, setSelectedRow] = useState(null);
  const {setIsAuthenticated} = useContext(AuthContext);
  const [faixa, setFaixa] = useState([]);

  useEffect(() => {
    if(IDCascata !== null){
      async function getData(){
        const url = process.env.REACT_APP_API_URL + `cascata-faixa/idcascata=${IDCascata}`;
        const dados = await fetchItems(url, 'GET', null, setIsAuthenticated)
        if(dados.status === 404){
          setFaixa([])
        }else{
          setFaixa(dados.data)
        }
      }
      getData();
    }
  }, [IDCascata])

  return (
    <Table>
      <thead>
        <tr style={{ height : "35px"}}>
          <TableTH style={{ borderRadius : "5px 0px 0px 0px"}}>Sigla</TableTH>
          <TableTH >Maximo (%)</TableTH>
          <TableTH style={{ borderRadius : "0px 5px 0px 0px"}}>Desconto Cascata</TableTH>
        </tr>
      </thead>
      {faixa.length > 0 ?
      <tbody>
        {faixa.map((faixa, index) => (
          <tr key={index} style={{height : "35px", backgroundColor: handleColorRowGrade(index, selectedRow)}}>
            <TableTD width='80px' >{faixa.Sigla}</TableTD>
            <TableTD width='80px'>{parseFloat(faixa.PerMaximo).toFixed(2)}</TableTD>
            <TableTD width='80px'><FlagGrade disabled={true} value={faixa.TipoCascata} margin='0px 0px 0px 50px' /></TableTD>
          </tr>
        ))}
      </tbody>
      :<></>}
    </Table>
  );
}

export default GradeCascataFaixa;
