import styled from 'styled-components'
import { mask as maskFunc } from '../../utils/utils'
import { useState } from 'react'

const InputComp = styled.input`
    width: calc(100% - 15px);
    height: 35px;
    border-radius: 3px;
    font-size: 14px;
    border-width: 1px;
    box-shadow: none;
    border: 1px solid rgb(211, 210, 210);
    border-radius: 5px;
    background-color: ${props => props.disabled ? '#E9ECEF' : '#fff'};
    padding-left: 15px;
`

const LabelComp = styled.label`
    width: 100%;
    font-family: sans-serif;
    font-size: 14px;
    height: 20px;
`

const DivComp = styled.div`
    display: flex;
    flex-direction: column; 

    width: ${props => props.width ? props.width : '100px' };
    margin: ${props => props.margin ? props.margin : '0px 20px 15px 0px' };
`

const Input = ({name,type, description, value, inputMode, onBlur, onChange, onKeyDown, width, disabled, margin, autoComplete, maxLength, mask, onlyUppercase}) => {
    if(inputMode === 'numeric' && value !== null){  
        let newValue = toString(value);
        newValue =  newValue.replace(/[^0-9]/g, '');
        return(
            <DivComp width={width} margin={margin}>
                <LabelComp>{description}</LabelComp>
                <InputComp 
                    name={name} 
                    type={type} 
                    value={value} 
                    inputMode={inputMode} 
                    onBlur={onBlur} 
                    onChange={onChange} 
                    onKeyDown={onKeyDown} 
                    disabled={disabled}
                    autoComplete={autoComplete ? 'on': 'off'}
                    maxLength={maxLength === undefined ? 50: maxLength}
                />
            </DivComp>
        )
    }else if(inputMode === 'decimal'){
        return(
            <DivComp width={width} margin={margin}>
                <LabelComp>{description}</LabelComp>
                <InputComp 
                    name={name} 
                    type='text' 
                    value={value === null || value === '' ? '': value} 
                    inputMode={inputMode} 
                    onBlur={onBlur} 
                    onChange={onChange} 
                    onKeyDown={onKeyDown} 
                    disabled={disabled}
                    autoComplete={autoComplete ? 'on': 'off'}
                    maxLength={maxLength === undefined ? 50: maxLength}
                />
            </DivComp>
        )
    }else if(onlyUppercase && value !== null){
        return(
            <DivComp width={width} margin={margin}>
                <LabelComp>{description}</LabelComp>
                <InputComp 
                    name={name} 
                    type={type} 
                    value={value.toUpperCase()} 
                    inputMode={inputMode} 
                    onBlur={onBlur} 
                    onChange={onChange} 
                    onKeyDown={onKeyDown} 
                    disabled={disabled}
                    autoComplete={autoComplete ? 'on': 'off'}
                    maxLength={maxLength === undefined ? 50: maxLength}
                />
            </DivComp>
        )
    }else if(mask && value !== null){
        return(
            <DivComp width={width} margin={margin}>
                <LabelComp>{description}</LabelComp>
                <InputComp 
                    name={name} 
                    type={type} 
                    value={maskFunc(mask, value)} 
                    inputMode={inputMode} 
                    onBlur={onBlur} 
                    onChange={onChange} 
                    onKeyDown={onKeyDown} 
                    disabled={disabled}
                    autoComplete={autoComplete ? 'on': 'off'}
                    maxLength={maxLength === undefined ? 50: maxLength}
                />
            </DivComp>
        )
    }else{
        return(
            <DivComp width={width} margin={margin}>
                <LabelComp>{description}</LabelComp>
                <InputComp 
                    name={name} 
                    type={type} 
                    value={value} 
                    inputMode={inputMode} 
                    onBlur={onBlur} 
                    onChange={onChange} 
                    onKeyDown={onKeyDown} 
                    disabled={disabled}
                    autoComplete={autoComplete ? 'on': 'off'}
                    maxLength={maxLength === undefined ? 50: maxLength}
                />
            </DivComp>
        )
    }
}

export default Input