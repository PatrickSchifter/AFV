import { fetchItems } from "../../../utils/fetch";

export async function handleDelete (params){
    const url = process.env.REACT_APP_API_URL + `local-email`;

    await fetchItems(url, 'DELETE', {dados_local_email: {IDLocalVenda: params[1], IDTipoEmail: params[2], }},params[3]);
    params[0]({type: 'setIDTipoEmail', payload:null});
    await params[4]();

}

/*
params[0] = dispatch
params[1] = IDLocalVenda
params[2] = IDTipoEmail
params[3] = setIsAuthenticated
params[4] = setUpdateGrade
*/

export const reducer = (state, action) => {
    switch(action.type){
        case 'setCNPJ':
            return {...state, CNPJ: action.payload === '' || action.payload === null  ? null : action.payload}
        case 'setRazao':
            return {...state, Razao: action.payload === '' || action.payload === null  ? null : action.payload.toUpperCase()}
        case 'setFantasia':
            return {...state, Fantasia: action.payload === '' || action.payload === null  ? null : action.payload.toUpperCase()}
        case 'setSituacao':
            return {...state, Situacao: action.payload === '' || action.payload === null  ? null : action.payload}
        case 'setFoto':
            return {...state, Foto: action.payload}
        case 'setCodERP':
            return {...state, CodERP: action.payload === '' || action.payload === null  ? null : action.payload}
        case 'setLogradouro':
            return {...state, Logradouro: action.payload === '' || action.payload === null  ? null : action.payload.toUpperCase()}
        case 'setNumero':
            return {...state, Numero: action.payload === '' || action.payload === null  ? null : action.payload.toUpperCase()}
        case 'setCEP':
            return {...state, CEP: action.payload === '' || action.payload === null  ? null : action.payload}
        case 'setComplemento':
            return {...state, Complemento: action.payload === '' || action.payload === null  ? null : action.payload.toUpperCase()}
        case 'setBairro':
            return {...state, Bairro: action.payload === '' || action.payload === null  ? null : action.payload.toUpperCase()}
        case 'setCodIBGE':
            return {...state, CodIBGE: action.payload === '' || action.payload === null  ? null : action.payload}
        case 'setModo':
            return {...state, Modo:'A'}
        case 'setIDLocalVenda':
            return {...state, IDLocalVenda: action.payload === '' || action.payload === null  ? null : action.payload}
        case 'setIDTipoEmail':
            return {...state, IDTipoEmail: action.payload === '' || action.payload === null  ? null : action.payload}
        default:
            return state;
    }
}