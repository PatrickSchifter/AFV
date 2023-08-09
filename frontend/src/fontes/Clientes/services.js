import { fetchItems } from "../../utils/fetch";
import GradeListaCliente from './GradeListaCliente';
import { configPopUp } from "../../components/PopUpSecondary/service";


export async function obtemDadosCliente(config, setDadosCliente, setOpenContent, setAlert, openModal, dispatch, setIsAuthenticated) {
  try {
    const token = localStorage.getItem('token');
    let url = process.env.REACT_APP_API_URL + 'cliente';
    let data;
    
    switch (config.type) {
      case "coderp":
        url = url + `/coderp=${config.payload}`;
        data = await fetchItems(url, 'GET',null, setIsAuthenticated);
        
        if (data.sucess) {
          setDadosCliente(data.data[0]);
          setOpenContent(true);
        } else {
          setAlert('Cliente não encontrado');
          openModal(true);
        }
        break;
      case "cnpjcpf":
        url = url + `/cnpjcpf=${config.payload}`;
        console.log(setIsAuthenticated)
        data = await fetchItems(url, 'GET', null, setIsAuthenticated);

        if (data.sucess) {
          setDadosCliente(data.data[0]);
          setOpenContent(true);
        } else {
          setAlert('Cliente não encontrado');
          openModal(true);
        }
        break;
      case "id":
        url = url + `/id=${config.payload}`;
        data = await fetchItems(url, 'GET', null, setIsAuthenticated);

        if (data.sucess) {
          setDadosCliente(data.data[0]);
          setOpenContent(true);
        } else {
          setAlert('Cliente não encontrado');
          openModal(true);
        }
        break;
      case "pesquisa":
        url = url + `/pesquisa=${config.payload}`;
        data = await fetchItems(url, 'GET', null, setIsAuthenticated);

        if(data.sucess){
          configPopUp(dispatch, <GradeListaCliente clientes={data.data} setDadosCliente = {setDadosCliente} />, true, 'Lista de Clientes', '951px', '572px')
        }

        break;
    }

  } catch (error) {
    console.error(error);
  }
}

