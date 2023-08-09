import React, {useState, useEffect, useContext, useCallback} from "react";
import styled from 'styled-components'

import {AuthContext} from '../../../auth'
import { fetchItems } from "../../../utils/fetch";
import { handleSituacao, handleColorRowGrade } from "../../../utils/utils";
import {configPopUp} from '../../../components/PopUpSecondary/service';
import { ContentContext } from "../../../contexts/contentContext";

import CadastroOfertas from "../CadastroOfertas";

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
    width: ${props => props.width ? props.width  : '50px'};
`


function GradeOferta({oferta, setOferta, setUpdate}) {

  const [selectedRow, setSelectedRow] = useState(null);

  const {dispatch} = useContext(ContentContext);
  const {setIsAuthenticated} = useContext(AuthContext);
  const url = process.env.REACT_APP_API_URL + `oferta`;

  const getData = useCallback(async () => {
    const dados = await fetchItems(url, 'GET', null, setIsAuthenticated)
    if(dados.status === 404){
      setOferta([{IDOferta: '', Descricao:'', DtInicial: '', DtFinal: ''}])
    }else{
      setOferta(dados.data)
    }
  },[])

  useEffect(() => {
    getData();
  }, [])

  const handleClickGrade =(index)=>{
    setSelectedRow(index)
  }

  const handleDoubleClickGrade =(IDOferta)=>{
    configPopUp(dispatch, <CadastroOfertas IDOferta={IDOferta} Modo={'A'} />, true, 'Cadastro de Ofertas', '1125px', '628px')
  }

  return (
    <Table>
      <thead>
        <tr style={{ height : "35px"}}>
          <TableTH style={{ borderRadius : "5px 0px 0px 0px"}}>Código</TableTH>
          <TableTH >Descrição da Oferta</TableTH>
          <TableTH >Data Inicial</TableTH>
          <TableTH style={{  borderRadius : "0px 5px 0px 0px"}}>Data Final</TableTH>
        </tr>
      </thead>
      <tbody>
        {oferta.map((oferta, index) => (
          <tr key={oferta.IDOferta} style={{height : "35px", backgroundColor: handleColorRowGrade(index, selectedRow)}} onClick={() => handleClickGrade(index)} onDoubleClick={() => handleDoubleClickGrade(oferta.IDOferta)}>
            <TableTD width='150px' >{oferta.IDOferta}</TableTD>
            <TableTD width='52%'>{oferta.Descricao}</TableTD>
            <TableTD width='300px'>{oferta.DtInicial}</TableTD>
            <TableTD width='200px'>{handleSituacao(oferta.DtFinal)}</TableTD>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default GradeOferta;
