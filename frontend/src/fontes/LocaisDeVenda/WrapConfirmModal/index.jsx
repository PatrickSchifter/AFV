import {useContext} from 'react';
import { LocalVendaContext } from '../../../contexts/localVendaContext';

import ConfirmModal from '../../../components/Modal/ConfirmModal';


const WrapConfirmModal = ({openConfirm, setOpenConfirm, message, handleDelete, dispatch, state, setIsAuthenticated}) => {
    const {setUpdateGradeLocalEmail} = useContext(LocalVendaContext);

    return (
        <ConfirmModal 
        openModal={openConfirm} 
        setOpenModal={setOpenConfirm} 
        header={'Dados Local de Venda'} 
        action={message} 
        caseYes={{
            func:handleDelete, 
            param:[
                dispatch, 
                state.IDLocalVenda, 
                state.IDTipoEmail, 
                setIsAuthenticated, 
                setUpdateGradeLocalEmail
            ]
        }} 
        />
        )
}

export default WrapConfirmModal;