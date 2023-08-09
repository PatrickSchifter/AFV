import { useState, createContext, useReducer } from 'react';

export const ContentContext = createContext();

export const ContentProvider = ({ children }) => {

    const [openContent, setOpenContent] = useState(false);

    const popUpState = {
        popUpContent: null,
        openPopUp: false,
        header: '',
        width:'0px',
        height: '0px'
    }

    const reducer = (state, action) => {
        switch(action.type){
            case 'setPopUpContent':
                return {...state, popUpContent: action.payload};
            case 'setOpenPopUp':
                return {...state, openPopUp: action.payload};
            case 'setHeader':
                return {...state, header: action.payload};
            case 'setWidth':
                return {...state, width: action.payload};
            case 'setHeight':
                return {...state, height: action.payload};
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(reducer, popUpState);

    return (
        <ContentContext.Provider 
            value={
                { 
                    setOpenContent, 
                    openContent, 
                    state,
                    dispatch
                }
            }   
        >
            {children}
        </ContentContext.Provider>
    )
}
