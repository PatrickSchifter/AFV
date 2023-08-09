import React, {useContext, useState, useEffect} from 'react';
import { fetchItems } from '../../../utils/fetch';
import { AuthContext } from '../../../auth';
import styled from 'styled-components';

import Select from 'react-select';

const SelectCombo = styled(Select)`
    height: 37px;
    border-radius: 5px;
    background-color: ${props => props.disabled ? '#E8E8E8' : '#fff'};
    border: 1px solid #CED4DA;
    box-shadow: none;
`

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

const ComboProduto = ({width, margin, description, disabled, dispatch, value}) => {
    const [options, setOptions] = useState([]); 
    const [isLoading, setIsLoading] = useState(false); 
    const [input, setInput] = useState('');
    const {setIsAuthenticated} = useContext(AuthContext);
    const url = input === '' ? process.env.REACT_APP_API_URL + `cidade?pagina=1` : process.env.REACT_APP_API_URL + `cidade?pesquisa=${input}`

    useEffect(() => {
        async function obtemDados(){
            setIsLoading(true);
            const response = await fetchItems(url, 'GET', null, setIsAuthenticated)

            let array = [{value: null, label: ''}]
            
            response.data.map((cidade)=>{
                array.push({value: cidade.CodIBGE, label: cidade.DesCidade}) 
            })
            if(value){
                const urlCodIBGE = process.env.REACT_APP_API_URL + `cidade?codibge=${value}`
                const responseCodIBGE = await fetchItems(urlCodIBGE, 'GET', null, setIsAuthenticated);
                array.push({value: responseCodIBGE.data[0].CodIBGE, label: responseCodIBGE.data[0].DesCidade})
            }

            setOptions(array);
            
            setIsLoading(false);
        }
        obtemDados();
    }, [input]);

    const handleChange =(valueInput)=>{
        dispatch.dispatch({type: dispatch.type, payload: valueInput ? valueInput.value : null});
    }

    return (
        <Main width={width} margin={margin}>
            <Label>{description}</Label>
            <SelectCombo
            options={options}
            isSearchable
            isLoading={isLoading}
            onInputChange={(event) => setInput(event)}
            isDisabled={disabled}
            onChange={handleChange} 
            isClearable
            placeholder=''
            value={options.find((item) => item.value === value)}
            />
        </Main>
    );
};  

export default ComboProduto;
