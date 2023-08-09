import { fetchItems } from "../../../utils/fetch";

export async function salvarDados(state, setIsAutenticated) {
    if(state.Modo === 'I'){
        try {
            const token = localStorage.getItem('token');
            let url = process.env.REACT_APP_API_URL + 'cliente-vendedor';
            let data;
    
            data = await fetchItems(url, 'POST', {dados_cliente: state},setIsAutenticated);
    
        } catch (error) {
            console.error(error);
        }
    }
    if(state.Modo === 'A'){
        try {
            const token = localStorage.getItem('token');
            let url = process.env.REACT_APP_API_URL + 'cliente-vendedor';
            let data;
    
            data = await fetchItems(url, 'PATCH', {dados_cliente_vendedor: state},setIsAutenticated);
    
        } catch (error) {
            console.error(error);
        }
    }
    
}


export const initialState = {
    IDCliente: null, 
    IDUsuario: '', 
    TipoUsuario: null, 
    IDCascata: '', 
    IDVolume: '',
    Modo: 'I',
    IDClienteVendedor:null,
    Seg: "N",
    Ter: 'N',
    Qua: 'N',
    Qui: 'N',
    Sex: 'N',
    Sab: 'N',
    Dom: 'N',
    Hora1:'',
    Hora2:'',
    Recorrencia:''
}

const urlPost = process.env.REACT_APP_API_URL + `cliente-visita`;
const token = localStorage.getItem('token');

export const reducer = (state, action) => {
    switch(action.type){
        case 'setVendedor':
            return {...state, IDUsuario: action.payload.IDUsuario, TipoUsuario: action.payload.TipoUsuario}
        case 'setDescontoComercial':
            return {...state, IDCascata: action.payload}
        case 'setDescontoVolume':
            return {...state, IDVolume: action.payload}
        case 'setIDCliente':
            return {...state, IDCliente: action.payload}
        case 'setModo':
            return {...state, Modo: action.payload}
        case 'setIDClienteVendedor':
            return {...state, IDClienteVendedor: action.payload}
        case 'setSeg':
            return {...state, Seg: action.payload}
        case 'setTer':
            return {...state, Ter: action.payload}
        case 'setQua':
            return {...state, Qua: action.payload}
        case 'setQui':
            return {...state, Qui: action.payload}
        case 'setSex':
            return {...state, Sex: action.payload}
        case 'setSab':
            return {...state, Sab: action.payload}
        case 'setDom':
            return {...state, Dom: action.payload}
        case 'setHora1':
            return {...state, Hora1: action.payload}
        case 'setHora2':
            return {...state, Hora2: action.payload}
        case 'setRecorrencia':
            return {...state, Recorrencia: action.payload}
        case 'updateSeg':
            fetchItems(urlPost, 'POST', {dados_cliente_visita: {...state, Seg: action.payload}})
            return {...state, Seg: action.payload}
        case 'updateTer':
            fetchItems(urlPost, 'POST', {dados_cliente_visita: {...state, Ter: action.payload}})
            return {...state, Ter: action.payload}
        case 'updateQua':
            fetchItems(urlPost, 'POST', {dados_cliente_visita: {...state, Qua: action.payload}})
            return {...state, Qua: action.payload}
        case 'updateQui':
            fetchItems(urlPost, 'POST', {dados_cliente_visita: {...state, Qui: action.payload}})
            return {...state, Qui: action.payload}
        case 'updateSex':
            fetchItems(urlPost, 'POST', {dados_cliente_visita: {...state, Sex: action.payload}})
            return {...state, Sex: action.payload}
        case 'updateSab':
            fetchItems(urlPost, 'POST', {dados_cliente_visita: {...state, Sab: action.payload}})
            return {...state, Sab: action.payload}
        case 'updateDom':
            fetchItems(urlPost, 'POST', {dados_cliente_visita: {...state, Dom: action.payload}})
            return {...state, Dom: action.payload}
        case 'updateHora1':
            fetchItems(urlPost, 'POST', {dados_cliente_visita: {...state, Hora1: action.payload}})
            return {...state, Hora1: action.payload}
        case 'updateHora2':
            fetchItems(urlPost, 'POST', {dados_cliente_visita: {...state, Hora2: action.payload}})
            return {...state, Hora2: action.payload}
        case 'updateRecorrencia':
            fetchItems(urlPost, 'POST', {dados_cliente_visita: {...state, Recorrencia: action.payload}})
            return {...state, Recorrencia: action.payload}
        default:
            return state
    }
}


export async function obtemDados(setDadosGrade, IDCliente){
    const url = process.env.REACT_APP_API_URL + `v-cliente-vendedor-linha/idcliente=${IDCliente}`;
    const response = await fetchItems(url, 'GET')
    if(response.sucess){
        const nLista = response.data.map((item)=>{
            if(item.TipoUsuario === 'VENDEDOR'){
                return {...item, TipoUsuario: 'V'}
            }else if(item.TipoUsuario === 'REPRESENTADA'){
                return {...item, TipoUsuario: 'R'}
            }
        })
        setDadosGrade(nLista)
    }else{
        setDadosGrade([])
        
    }
}

export async function handleDelete (params){
    const urlClienteVisita = process.env.REACT_APP_API_URL + `cliente-visita`;
    const urlClienteVendedor = process.env.REACT_APP_API_URL + `cliente-vendedor`;

    await fetchItems(urlClienteVisita, 'DELETE', {dados_cliente_visita: {IDClienteVendedor: params[1]}},params[5])
    await fetchItems(urlClienteVendedor, 'DELETE', {dados_cliente_vendedor: {IDClienteVendedor: params[1]}},params[5])
    params[0]({type: 'setModo', payload:'I'})
    params[0]({type: 'setVendedor', payload:{IDUsuario: '', TipoUsuario: ''}})
    params[0]({type: 'setDescontoComercial', payload:''})
    params[0]({type: 'setDescontoVolume', payload:''})
    params[0]({type: 'setIDClienteVendedor', payload:null})
    params[0]({type: 'setSeg', payload: 'N'})
    params[0]({type: 'setTer', payload: 'N'})
    params[0]({type: 'setQua', payload: 'N'})
    params[0]({type: 'setQui', payload: 'N'})
    params[0]({type: 'setSex', payload: 'N'})
    params[0]({type: 'setSab', payload: 'N'})
    params[0]({type: 'setDom', payload: 'N'})
    params[0]({type: 'setHora1', payload: ''})
    params[0]({type: 'setHora2', payload: ''})
    params[0]({type: 'setRecorrencia', payload: ''})
    params[2](null)
    obtemDados(params[3], params[4])
    await params[6]((old) => !old);
}