import React, { useState, useContext } from "react";

import { configPopUp } from "../../../components/PopUpSecondary/service";

import { ContentContext } from "../../../contexts/contentContext"; 
import {obtemDadosCliente} from '../services'

import './style.css'

function GradeListaCliente({ clientes, setDadosCliente }) {

  const [selectedLine, setSelectedLine] = useState(null);

  const {setOpenContent, dispatch} = useContext(ContentContext)

  const handleClickGrade = (idCliente) => {
    if (idCliente === selectedLine) {
      setSelectedLine(null)
    } else {
      setSelectedLine(idCliente)
    }
  }

  const handleDoubleClick = (CodERP) =>{
    console.log(CodERP)
    obtemDadosCliente({type: 'coderp', payload: CodERP}, setDadosCliente, setOpenContent) 
    configPopUp(dispatch, null, false, '', '0', '0')
  }

  const handleSituacao = (Situacao) => {
    console.log('Situacao')
  }

  return (
    <table className='g-lcliente' >
      <thead>
        <tr style={{ height: "35px" }}>
          <th style={{ width: "10%", borderRadius: "5px 0px 0px 0px" }}>Código ERP</th>
          <th style={{ width: "10%" }}>CNPJ</th>
          <th style={{ width: "40%" }}>Razão</th>
          <th style={{ width: "30%" }}>Fantasia</th>
          <th style={{ width: "10%", borderRadius: "0px 5px 0px 0px" }}>Situação</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((clientes, index) => (
          <tr
            className={selectedLine === clientes.IDCliente ? 'row-selected' : index % 2 === 0 ? " row-white" : " row-dark"}
            key={clientes.IDCliente}
            onClick={() => handleClickGrade(clientes.IDCliente)}
            onDoubleClick={() => handleDoubleClick(clientes.CodERP)}
          >
            <td style={{ width: "10%" }}>{clientes.CodERP}</td>
            <td style={{ width: "10%" }}>{clientes.CNPJCPF}</td>
            <td style={{ width: "35%" }}>{clientes.Razao}</td>
            <td style={{ width: "35%" }}>{clientes.Fantasia}</td>
            <td style={{ width: "10%" }}>{clientes.Situacao}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default GradeListaCliente;
