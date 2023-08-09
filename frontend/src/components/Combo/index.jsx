import React from 'react'
import styled from 'styled-components'

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
    background-color: ${props => props.disabled ? '#E8E8E8' : '#fff'};
    border: 1px solid #CED4DA;
`

const Combo = ({data, config, width, value, disabled, description, margin, dispatch}) => {

    /*
    data - Array de objetos
    config - Objeto contendo Value e Descrição. Exemplo {value: IDCliente, descricao: Fantasia}
    dispatch - Objeto contendo Dispatch e Type. Exemplo {dispatch: dispatch, type: 'setIDPrecoRegra'} sendo o primeiro item do objeto o dispatch do useReducer
    */

    const handleChange = (e) => {
        dispatch.dispatch({type: dispatch.type, payload: parseInt(e.target.value)})
    }

    return (
        <Main width={width} margin={margin}>
            <Label>{description}</Label>
            <Select value={value === null ? '' : value} disabled={disabled} onChange={handleChange}>
                {data.map((info) => <option value={info[config.value]}>{info[config.descricao]}</option> )}
                <option value=''> </option>
            </Select>
        </Main>
    )
}

export default Combo