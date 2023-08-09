import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import styled from 'styled-components';

const FlagContainer = styled.label`
    display: flex;
    align-items: flex-end;
    cursor: pointer;
    height: 45px;
    width: ${props => props.width ? props.width : '50px'};
    margin: ${props => props.margin ? props.margin : '0'};
`;

const FlagDescription = styled.p`
    margin-left: 8px;
    font-family: sans-serif;
    font-size: 14px;
`

const FlagInput = styled.input`
    display: block;
    width: 16px;
    height: 16px;
`;


const Flag = ({value, disabled, name, description, width, margin, dispatch}) => {

    function handleInputChange (event) {
        dispatch.dispatch({type: dispatch.type, payload: event.target.value === 'S' ? 'N' : 'S'})
    }

    function handleChange(){
        return
    }

    return (
        <FlagContainer width={width} margin={margin}>
            <FlagInput
                type="checkbox"
                value={value}
                checked={value === 'S'}
                onClick={handleInputChange}
                disabled={disabled}
                name={name}
                onChange={handleChange}
            />
            <FlagDescription>{description}</FlagDescription>
        </FlagContainer>
    );
};

export default Flag;
