import React, {useEffect, useState, useContext} from 'react';
import { fetchItems } from '../../../utils/fetch';
import { AuthContext } from '../../../auth'

import Combo from '..'

const ComboCascata = ({value, width, margin, disabled, dispatch}) => {

    const {setIsAuthenticated} = useContext(AuthContext)
    const [data, setData] = useState([]);
    const url = process.env.REACT_APP_API_URL + `cascata`;

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
                description='Desconto Comercial' 
                config={{value: 'IDCascata', descricao: 'DesCascata'}} 
                value={value} 
                width={width} 
                disabled={disabled} 
                margin={margin} 
                dispatch={dispatch}
            />
        )
    }
}

export default ComboCascata;