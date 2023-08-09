import { useState, createContext } from 'react';

export const LocalVendaContext = createContext();

export const LocalVendaProvider = ({ children }) => {

    const [updateGradeLocalEmail, setUpdateGLocalEmail] = useState(false);
    const [localEmailPopUp, setLocalEmailPopUp] = useState({});
    const [modoPopUp, setModoPopUp] = useState(null);
    const [openPopUp, setOpenPopUp] = useState(false);

    const setUpdateGradeLocalEmail = () => {
        setUpdateGLocalEmail(!updateGradeLocalEmail);
    }

    return (
        <LocalVendaContext.Provider 
            value={
                { 
                    setUpdateGradeLocalEmail, 
                    updateGradeLocalEmail,
                    localEmailPopUp, 
                    setLocalEmailPopUp,
                    modoPopUp, 
                    setModoPopUp, 
                    openPopUp,
                    setOpenPopUp
                }
            }   
        >
            {children}
        </LocalVendaContext.Provider>
    )
}
