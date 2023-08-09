export const configPopUp = (dispatch, componentPopUp, openPopUp, header, width, height, popUp ) => {
    dispatch({type:'setPopUpContent', payload: componentPopUp})
    dispatch({type:'setOpenPopUp', payload: openPopUp})
    dispatch({type:'setHeader', payload: header})
    dispatch({type:'setWidth', payload: width})
    dispatch({type:'setHeight', payload: height})
}