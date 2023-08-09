import { LocalVendaProvider } from '../../../contexts/localVendaContext';

import DadosLocaisDeVenda from '../DadosLocaisDeVenda';

const WrapDadosLocaisDeVenda = ({LocalVenda, Modo, setUpdate}) => {
    return (
        <LocalVendaProvider>
            <DadosLocaisDeVenda LocalVenda={LocalVenda} Modo={Modo} setUpdate={setUpdate} />
        </LocalVendaProvider>
    )
}

export default WrapDadosLocaisDeVenda;