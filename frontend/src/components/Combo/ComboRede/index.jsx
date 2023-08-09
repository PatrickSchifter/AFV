import React, {useContext, useEffect, useState} from 'react';
import { fetchItems } from '../../../utils/fetch';
import { AuthContext } from '../../../auth'

import Combo from '..'

const ComboRede = ({value, width, margin, disabled, dispatch}) => {

    const [data, setData] = useState([]);
    const url = process.env.REACT_APP_API_URL + `rede`;
    const {setIsAuthenticated} = useContext(AuthContext)

    useEffect(() => {
        async function obtemDados(){
            const response = await fetchItems(url, 'GET', null, setIsAuthenticated)
            setData(response.data)
        }
        obtemDados()
    }, [])

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
            <Combo 
                data={data} 
                description='Rede (Marca)' 
                config={{value: 'IDRede,', descricao: 'Descricao'}} 
                value={value} 
                width={width} 
                disabled={disabled} 
                margin={margin} 
                dispatch={dispatch}
            />
        )
    }
}

export default ComboRede;