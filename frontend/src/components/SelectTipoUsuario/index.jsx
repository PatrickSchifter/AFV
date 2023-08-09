import styled from 'styled-components';

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: ${props => props.width ? props.width : '100px'};
  margin: ${props => props.margin ? props.margin : '0px 20px 15px 0px' };
`

const Label = styled.label`
  width: 100%;
  font-family: sans-serif;
  font-size: 14px;
  height: 20px;
`

const Select = styled.select`
  height: 37px;
  border-radius: 5px;
  background-color: ${props => props.disabled ? '#E9ECEF' : '#fff'};
`

const SelectTipoUsuario = ({description, value, disabled, width, margin}) => {
  return (
    <Main width={width} margin={margin}>
        <Label>{description}</Label>
        <Select value={value} disabled={disabled}>
          <option value=""></option>
          <option value="R">REPRESENTANTE</option>
          <option value="V">VENDEDOR</option>
        </Select>
    </Main>
  )
}

export default SelectTipoUsuario;