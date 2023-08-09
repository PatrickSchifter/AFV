import React, {useContext, useEffect, useState} from 'react';
import { fetchItems } from '../../../utils/fetch';
import { AuthContext } from '../../../auth';

import Combo from '..'

const ComboRegiaoVenda = ({value, width, margin, disabled, dispatch}) => {

    const [data, setData] = useState([]);
    const url = process.env.REACT_APP_API_URL + `regiao-venda`;
    const {setIsAthenticated} = useContext(AuthContext)

    useEffect(() => {
        async function obtemDados(){
            const response = await fetchItems(url, 'GET', null, setIsAthenticated)
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
                description='Região de Vendas' 
                config={{value: 'IDRegiao,', descricao: 'DesRegiao'}} 
                value={value} 
                width={width} 
                disabled={disabled} 
                margin={margin} 
                dispatch={dispatch}
            />
        )
    }
}

export default ComboRegiaoVenda;