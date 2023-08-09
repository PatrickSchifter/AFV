import React, {useContext, useEffect, useState} from 'react';
import { fetchItems } from '../../../utils/fetch';
import { AuthContext } from '../../../auth'
import styled from 'styled-components';
import Combo from '..'

const Main = styled.div`
    display: flex;
    flex-direction: column;
    width: ${props => props.width ? props.width : '100px'};
    margin: ${props => props.margin ? props.margin : '0px 20px 15px 0px' };
`

const Label = styled.label`
    width: 100%;
    font-family: sans-serif;
    font-size: 14px;
    height: 20px;
`

const Select = styled.select`
    height: 37px;
    border-radius: 5px;
    background-color: ${props => props.disabled ? '#E9ECEF' : '#fff'};
    border: 1px solid #CED4DA;
`


const ComboVClienteVendedorCombo = ({value, width, margin, disabled, dispatch}) => {

    const [data, setData] = useState([]);
    const url = process.env.REACT_APP_API_URL + `v-cliente-vendedor-combo`;
    const {setIsAuthenticated} = useContext(AuthContext)

    useEffect(() => {
        async function obtemDados(){
            const response = await fetchItems(url, 'GET', null, setIsAuthenticated)
            setData(response.data)
        }
        obtemDados()
    }, [])

    const handleChange = (event) => {
        let selectedOption = data.find((option) => option.IDUsuario.toString() === event.target.value) 
        dispatch.dispatch({type: dispatch.type, payload: {IDUsuario: parseInt(event.target.value), TipoUsuario: selectedOption.TipoUsuario}})
    }
    /*
        Esse dispatch envia no payload um objeto com o IDUsuario que veio da seleção e o TipoUsuario que veio da consulta do combo.
    */

    if(data.length < 1){
        return (
            
            <Combo 
                data={[]} 
                description='Carregando...' 
                value={value} 
                width={width} 
                disabled={disabled} 
                margin={margin} 
            />
        )
    }else{
        return (
            <Main width={width} margin={margin}>
                <Label>Vendedor</Label>
                <Select value={value} disabled={disabled} onChange={handleChange}>
                    {data.map((info) => <option key={info['IDUsuario']} value={info['IDUsuario']}>{info['Nome']}</option> )}
                    <option value=""></option>
                </Select>
            </Main>
        )
    }
}

export default ComboVClienteVendedorCombo;