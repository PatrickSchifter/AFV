import { fetchItems } from "../../../utils/fetch";

export async function salvarDados(state) {
    try {
        const token = localStorage.getItem('token');
        let url = process.env.REACT_APP_API_URL + 'cliente-perfil';
        let data;

        data = await fetchItems(url, token, 'POST', {dados_cliente: state[0]}, state[1]);

    } catch (error) {
        console.error(error);
    }
}