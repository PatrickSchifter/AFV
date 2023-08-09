import { fetchItems } from "../../../utils/fetch";

export async function handleDelete (params){
    const url = process.env.REACT_APP_API_URL + `oferta-estrutura`;

    await fetchItems(url, 'DELETE', {dados_oferta_estrutura: {IDOfertaEstrutura: params[1]}},params[2])
    params[0]({type: 'setIDOfertaEstrutura', payload:null})
    await params[3]((old)=>!old)
}