import React, {useState, useEffect, useContext} from "react";
import styled from 'styled-components'

import {AuthContext} from '../../../auth'
import { fetchItems } from "../../../utils/fetch";
import { handleColorRowGrade } from "../../../utils/utils";
import { numberFormatter } from "../../../utils/utils";

const Table = styled.table`
    display: block;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    border-radius: 10px;
    border: none;
    border-collapse: collapse;
    width: 48%;
    margin: 2%;
`

const TableTH = styled.th`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 14px;
    font-weight: 500;
    background-color: #00909E;
    color: white;
    text-align: center;
    min-width: 133px;
`

const TableTD = styled.td`
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;
    text-align: center;
    align-items: center;
    width: ${props => props.width ? props.width  : '40px'};
`


function GradeVolumeFaixa({IDVolume}) {


  const [selectedRow, setSelectedRow] = useState(null);
  const {setIsAuthenticated} = useContext(AuthContext);
  const [faixa, setFaixa] = useState([]);

  useEffect(() => {
    if(IDVolume !== null){
      async function getData(){
        const url = process.env.REACT_APP_API_URL + `volume-faixa/idvolume=${IDVolume}`;
        const dados = await fetchItems(url, 'GET', null, setIsAuthenticated)
        if(dados.status === 404){
          setFaixa([])
        }else{
          setFaixa(dados.data)
        }
      }
      getData();
    }
  }, [IDVolume])

  return (
    <Table>
      <thead>
        <tr style={{ height : "35px"}}>
          <TableTH style={{ borderRadius : "5px 0px 0px 0px"}}>Compras de...</TableTH>
          <TableTH >Até...</TableTH>
          <TableTH style={{ borderRadius : "0px 5px 0px 0px"}}>Desconto(%)</TableTH>
        </tr>
      </thead>
      {faixa.length > 0 ?
      <tbody>
        {faixa.map((faixa, index) => (
          <tr key={faixa.IDVolumeFaixa} style={{height : "35px", backgroundColor: handleColorRowGrade(index, selectedRow)}}>
            <TableTD width='80px' >{numberFormatter(faixa.VlComprasDE)}</TableTD>
            <TableTD width='80px'>{numberFormatter(faixa.VlComprasATE)}</TableTD>
            <TableTD width='80px'>{parseFloat(faixa.PerDesconto).toFixed(2) }</TableTD>
          </tr>
        ))}
      </tbody>
      :<></>}
    </Table>
  );
}

export default GradeVolumeFaixa;

