import { fetchItems } from "../../../utils/fetch";

export async function handleDelete (params){
    await params[3](false)
    const url = process.env.REACT_APP_API_URL + `cascata-faixa`;

    await fetchItems(url, 'DELETE', {dados_cascata_faixa: {IDCascataFaixa: params[1]}},params[2])
    params[0]({type: 'setIDCascataFaixa', payload:null})
    await params[3](true)
}