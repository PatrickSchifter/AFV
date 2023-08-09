import React, { useState } from 'react';
import styled from 'styled-components';

const FlagInput = styled.input`
    display: block;
    width: 16px;
    height: 16px;
    margin: ${props => props.margin ? props.margin : '0px'};
`;


const FlagGrade = ({value, disabled, name, onClick, margin, onChange}) => {
    
    return (
        <FlagInput
                type="checkbox"
                value={value}
                checked={value === 'S'} 
                onClick={onClick}
                disabled={disabled}
                name={name}
                margin={margin}
                onChange={onChange}
        />

    );
};

export default FlagGrade;
