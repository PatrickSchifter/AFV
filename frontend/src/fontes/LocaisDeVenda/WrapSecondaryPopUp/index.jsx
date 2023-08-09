import {useContext} from 'react';
import { LocalVendaContext } from '../../../contexts/localVendaContext';

import PopUpSecondary from '../../../components/PopUpSecondary';
import ConfiguracaoEmail from '../ConfiguracaoEmail';

const WrapSecondaryPopUp = ({LocalVenda}) => {

    const {
        setUpdateGradeLocalEmail, 
        localEmailPopUp, 
        modoPopUp, 
        openPopUp,
        setOpenPopUp
    } = useContext(LocalVendaContext)

    return (
        openPopUp ? <PopUpSecondary openPopUp={openPopUp} setOpenPopUp={setOpenPopUp} width={'908px'} height={'616px'} header={'Configuração Email'} ><ConfiguracaoEmail LocalVenda={LocalVenda} Modo={modoPopUp} setUpdate={setUpdateGradeLocalEmail} LocalEmail={localEmailPopUp} /></PopUpSecondary> : <></>
    )
}

export default WrapSecondaryPopUp