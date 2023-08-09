import React, {useState, useEffect, useContext, useCallback} from "react";
import styled from 'styled-components'

import {AuthContext} from '../../../auth'
import { fetchItems } from "../../../utils/fetch";
import { handleColorRowGrade } from "../../../utils/utils";
import { LocalVendaContext } from "../../../contexts/localVendaContext";

import PopUpSecondary from '../../../components/PopUpSecondary';
import ButtonDelete from '../../../components/ButtonDelete';
import ConfiguracaoEmail from '../ConfiguracaoEmail'


const Table = styled.table`
    display: block;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    border-radius: 10px;
    border: none;
    border-collapse: collapse;
    width: 100%;
    margin-top: 15px;
    min-height: 300px;
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


function GradeLocalEmail({ update, setUpdate, LocalVenda, setMessage, setOpenConfirm, dispatchLocalVenda}) {

  const [selectedRow, setSelectedRow] = useState(null);
  const [localEmail, setLocalEmail] = useState([{
    Descricao: null,
    EmailResposta: null,
    Assunto:null
  }]);
  const [local, setLocal] = useState({EmailResposta: null, Assunto: null, Corpo: null, Assinatura: null, IDTipoEmail: null});
  const {setIsAuthenticated} = useContext(AuthContext);
  const {updateGradeLocalEmail, setLocalEmailPopUp, setOpenPopUp, setModoPopUp} = useContext(LocalVendaContext);
  const url = process.env.REACT_APP_API_URL + `g-local-email?idlocalvenda=${LocalVenda.IDLocalVenda}`;


  const getData = useCallback(async () => {
    const dados = await fetchItems(url, 'GET', null, setIsAuthenticated)
    if(dados.status === 404){
      setLocalEmail([{Descricao: null, EmailResposta: null, Assunto: null}]);
      setSelectedRow(null);
    }else{
      setLocalEmail(dados.data)
    }
  },[])

  useEffect(() => {
    getData();
  }, [updateGradeLocalEmail])

  const handleClickGrade =(index)=>{
    setSelectedRow(index)
  }

  const handleDoubleClickGrade = (Local) =>{
    setLocalEmailPopUp(Local);
    setOpenPopUp(true);
    setModoPopUp('A');
  }

  const handleClickDelete =(IDTipoEmail)=> {
    setMessage('Tem certeza que deseja excluir esse registro?');
    dispatchLocalVenda({type:'setIDTipoEmail', payload:IDTipoEmail})
    setOpenConfirm(true);
  }

  return (
      <Table>
        <thead>
          <tr style={{ height : "35px"}}>
            <TableTH style={{ borderRadius : "5px 0px 0px 0px"}}>Descrição</TableTH>
            <TableTH >E-mail Resposta</TableTH>
            <TableTH >Assunto</TableTH>
            <TableTH style={{  borderRadius : "0px 5px 0px 0px"}}>Excluir</TableTH>
          </tr>
        </thead>
        {localEmail.length > 0 ?
        <tbody>
          {localEmail.map((local, index) => (
            <tr key={index} style={{height : "35px", backgroundColor: handleColorRowGrade(index, selectedRow)}} onClick={() => handleClickGrade(index)} onDoubleClick={() => handleDoubleClickGrade(local)}>
              <TableTD width='120px' >{local.Descricao}</TableTD>
              <TableTD width='250px' >{local.EmailResposta}</TableTD>
              <TableTD width='370px' >{local.Assunto}</TableTD>
              <TableTD>{local.Descricao === null ? <></> : <ButtonDelete onClick={() => handleClickDelete(local.IDTipoEmail)} />}</TableTD>
            </tr>
          ))}
        </tbody>
        : <></>}
      </Table>
  );
}

export default GradeLocalEmail;
