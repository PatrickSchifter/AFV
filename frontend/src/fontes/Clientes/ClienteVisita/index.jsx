import styled from 'styled-components'

import Frame from '../../../components/Frame'
import Flag from '../../../components/Flag'
import Input from '../../../components/Input'

const Title = styled.p`
    font-family: MS Sans Serif, sans-serif;
    font-size: 16px;
    position: absolute;
    top: -10px; /* ajuste o valor conforme necessário para posicionar o título na borda superior */
    left: ${props => props.left ? props.left : '0px'};
    transform: translateX(-50%);
    background-color: rgba(255, 255, 255, 0.8);
    padding: 0 10px;
    
`
const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 97%;
    height: calc(100% - 15px);
`

const ClienteVisita = ({state, dispatch}) => {
    const disabled = state.IDClienteVendedor === null ? true: false;

    const handleChangeHora1 = (event) => {
        dispatch({type: 'setHora1', payload: event.target.value})
    }

    const handleChangeHora2 = (event) => {
        dispatch({type: 'setHora2', payload: event.target.value})
    }

    const handleChangeRecorrencia = (event) => {
        dispatch({type: 'setRecorrencia', payload: event.target.value})
    }

    const handleBlurHora1 =(event)=> {
            dispatch({type: 'updateHora1', payload: event.target.value})
    }   
    
    const handleBlurHora2 =(event)=> {
        dispatch({type: 'updateHora2', payload: event.target.value})
    }       

    const handleBlurRecorrencia =(event)=> {
            dispatch({type: 'updateRecorrencia', payload: event.target.value})
    }       

    return (
        <div 
            style={{
                height: '20%', 
                width: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                border: '1px solid #dfdfdf', 
                borderRadius: '10px',
                position: 'relative'}} 
        >
            <Wrapper>
                <Title left={'90px'}>Calendário de Visitas</Title>
                <Flag name='seg' description='Segunda' value={state.Seg} width='9%' dispatch={{dispatch: dispatch, type: 'updateSeg'}} disabled={disabled} margin='15px 0px 0px 0px' />
                <Flag name='ter' description='Terça' value={state.Ter} width='9%' dispatch={{dispatch: dispatch, type: 'updateTer'}} disabled={disabled} margin='15px 0px 0px 0px'  />
                <Flag name='qua' description='Quarta' value={state.Qua} width='9%' dispatch={{dispatch: dispatch, type: 'updateQua'}} disabled={disabled} margin='15px 0px 0px 0px'  />
                <Flag name='qui' description='Quinta' value={state.Qui} width='9%' dispatch={{dispatch: dispatch, type: 'updateQui'}} disabled={disabled} margin='15px 0px 0px 0px'  />
                <Flag name='sex' description='Sexta' value={state.Sex} width='9%' dispatch={{dispatch: dispatch, type: 'updateSex'}} disabled={disabled} margin='15px 0px 0px 0px'  />
                <Flag name='sab' description='Sabado' value={state.Sab} width='9%' dispatch={{dispatch: dispatch, type: 'updateSab'}} disabled={disabled} margin='15px 0px 0px 0px'  />
                <Flag name='dom' description='Domingo' value={state.Dom} width='9%' dispatch={{dispatch: dispatch, type: 'updateDom'}} disabled={disabled} margin='15px 0px 0px 0px'  />
                <Frame title='Horário' width='25%' left='40px' margin='10px 0px 0px 0px' >
                    <Input margin='0px 15px 10px 15px' value={state.Hora1}  disabled={disabled} maxLength={5} onChange={handleChangeHora1} onBlur={handleBlurHora1} />
                    <Input margin='0px 15px 10px 0px' value={state.Hora2} disabled={disabled} maxLength={5} onChange={handleChangeHora2} onBlur={handleBlurHora2} />
                </Frame>
                    <Input description='Recorrência' value={state.Recorrencia} margin='15px 10px 10px 10px' disabled={disabled} maxLength={12} onChange={handleChangeRecorrencia} onBlur={handleBlurRecorrencia} />
            </Wrapper>
        </div>
        
    )
}

export default ClienteVisita