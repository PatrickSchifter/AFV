import React, {useContext, useRef, useState} from 'react';

import { ContentProvider, ContentContext } from '../../contexts/contentContext';

import PopUpMenuUser from '../PopUpMenuUser';
import Tabs from '../Tabs';
import { MenuContext } from '../../contexts/menuContext';

import Clientes from '../../fontes/Clientes';
import GraficosDashboard from '../../fontes/GraficosDashboard';
import Representada from '../../fontes/Representadas';
import CadastroDeProdutos from '../../fontes/CadastroDeProdutos';
import TabelasDePrecos from '../../fontes/TabelasDePrecos';
import WorkFlowDeOrcamentos from '../../fontes/WorkFlowDeOrcamentos';
import CarteiraDePedido from '../../fontes/CarteiraDePedido';
import EmpresaControladora from '../../fontes/EmpresaControladora';
import LocaisDeVenda from '../../fontes/LocaisDeVenda';
import Ofertas from '../../fontes/Ofertas';
import PoliticasDeComissoes from '../../fontes/PoliticasDeComissoes';
import ComissoesXDesconto from '../../fontes/ComissoesXDesconto';
import PrecoXEstrutura from '../../fontes/PrecoXEstrutura';
import PrecoXPrazo from '../../fontes/PrecoXPrazo';
import DescontoVolume from '../../fontes/DescontoVolume';
import DescontoPorTipoDeCliente from '../../fontes/DescontoPorTipoDeCliente';
import FreteCIF from '../../fontes/FreteCIF';
import TipoDePedido from '../../fontes/TipoDePedido';
import CondicoesDePagamento from '../../fontes/CondicaoDePagamento';
import PrazoDePagamento from '../../fontes/PrazoDePagamento';
import DescontoComercial from '../../fontes/DescontoComercial';
import LinhasDeProdutos from '../../fontes/LinhaDeProduto';
import Margens from '../../fontes/Margens';
import RegrasDePrecos from '../../fontes/RegrasDePrecos';
import Mensagens from '../../fontes/Mensagens';
import RegioesDeVendas from '../../fontes/RegioesDeVendas';
import WorkFlow from '../../fontes/WorkFlow';
import PerfilDeAcesso from '../../fontes/PerfilDeAcesso';
import Usuarios from '../../fontes/Usuarios';
import PopUp from '../PopUp';

const Content = () => {

  const {activeTab, menuTabs} = useContext(MenuContext);

  const windowW = window.innerWidth / 4;
  const windowH = window.innerHeight / 4;

  const [popUp, setPopUp] = useState(0)

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState([{popUp: 0, x: windowW, y: windowH }]);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const divRef = useRef(null);

  const handleMouseMove = (event) => {
    event.preventDefault();
    if (!isDragging) return;

    const newPosition = {
      popUp: popUp,
      x: event.clientX - startPosition.x,
      y: event.clientY - startPosition.y
    };

    const { offsetWidth, offsetHeight } = divRef.current;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;


    // Verifica se a nova posição ultrapassa os limites da janela
    if (newPosition.x < 0) {
        newPosition.x = 0;
    } else if (newPosition.x + offsetWidth > windowWidth) {
        newPosition.x = windowWidth - offsetWidth;
    }

    if (newPosition.y < 0) {
        newPosition.y = 0;
    } else if (newPosition.y + offsetHeight > windowHeight) {
        newPosition.y = windowHeight - offsetHeight;
    }

    const newArrayPosition = [...position];
    newArrayPosition[popUp] = newPosition;
    setPosition(newArrayPosition);
};

const handleMouseUp = () => {
    setIsDragging(false);
};

  return (
    <div 
      className='content-container' 
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <PopUpMenuUser />
      <ContentProvider> 
        <Tabs />
        {menuTabs.includes(2) ? <GraficosDashboard activeTab={activeTab === 2} />: <></>}
        {menuTabs.includes(4) ? <Clientes activeTab={activeTab === 4} />: <></>}
        {menuTabs.includes(5) ? <Representada activeTab={activeTab === 5} />: <></>}
        {menuTabs.includes(7) ? <CadastroDeProdutos activeTab={activeTab === 7} />: <></>}
        {menuTabs.includes(9) ? <TabelasDePrecos activeTab={activeTab === 9} />: <></>}
        {menuTabs.includes(11) ? <WorkFlowDeOrcamentos activeTab={activeTab === 11} />: <></>}
        {menuTabs.includes(12) ? <CarteiraDePedido activeTab={activeTab === 12} />: <></>}
        {menuTabs.includes(14) ? <EmpresaControladora activeTab={activeTab === 14} />: <></>}
        {menuTabs.includes(15) ? <LocaisDeVenda activeTab={activeTab === 15} />: <></>}
        {menuTabs.includes(17) ? <Ofertas activeTab={activeTab === 17} />: <></>}
        {menuTabs.includes(18) ? <PoliticasDeComissoes activeTab={activeTab === 18} />: <></>}
        {menuTabs.includes(19) ? <ComissoesXDesconto activeTab={activeTab === 19} />: <></>}
        {menuTabs.includes(20) ? <PrecoXEstrutura activeTab={activeTab === 20} />: <></>}
        {menuTabs.includes(21) ? <PrecoXPrazo activeTab={activeTab === 21} />: <></>}
        {menuTabs.includes(22) ? <DescontoVolume activeTab={activeTab === 22} />: <></>}
        {menuTabs.includes(23) ? <DescontoPorTipoDeCliente activeTab={activeTab === 23} />: <></>}
        {menuTabs.includes(24) ? <FreteCIF activeTab={activeTab === 24} />: <></>}
        {menuTabs.includes(38) ? <TipoDePedido activeTab={activeTab === 38} />: <></>}
        {menuTabs.includes(26) ? <CondicoesDePagamento activeTab={activeTab === 26} />: <></>}
        {menuTabs.includes(27) ? <PrazoDePagamento activeTab={activeTab === 27} />: <></>}
        {menuTabs.includes(28) ? <DescontoComercial activeTab={activeTab === 28} />: <></>}
        {menuTabs.includes(29) ? <LinhasDeProdutos activeTab={activeTab === 29} />: <></>}
        {menuTabs.includes(30) ? <Margens activeTab={activeTab === 30} />: <></>}
        {menuTabs.includes(31) ? <RegrasDePrecos activeTab={activeTab === 31} />: <></>}
        {menuTabs.includes(32) ? <Mensagens activeTab={activeTab === 32} />: <></>}
        {menuTabs.includes(33) ? <RegioesDeVendas activeTab={activeTab === 33} />: <></>}
        {menuTabs.includes(34) ? <WorkFlow activeTab={activeTab === 34} />: <></>}
        {menuTabs.includes(36) ? <PerfilDeAcesso activeTab={activeTab === 36} />: <></>}
        {menuTabs.includes(37) ? <Usuarios activeTab={activeTab === 37} />: <></>}
        {position.map(popUp =>
          <PopUp 
          setIsDragging={setIsDragging}
          position={position}
          setPosition={setPosition}
          startPosition={startPosition}
          setStartPosition={setStartPosition}
          divRef={divRef}
          popUp={popUp.popUp}
          />
        )}
        
      </ContentProvider>
    </div>
  )
}

export default Content