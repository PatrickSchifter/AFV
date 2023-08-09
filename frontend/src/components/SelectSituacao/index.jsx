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
  border: 1px solid rgb(211, 210, 210);
  background-color: ${props => props.disabled ? '#E9ECEF' : '#fff'};
`

const SelectSituacao = ({description, value, disabled, width, margin, onChange}) => {
  return (
    <Main width={width} margin={margin}>
        <Label>{description}</Label>
        <Select value={value === null? '' : value} disabled={disabled} onChange={onChange}>
          <option value=""></option>
          <option value="A">ATIVO</option>
          <option value="C">CANCELADO</option>
          <option value="B">BLOQUEADO</option>
        </Select>
    </Main>
  )
}

export default SelectSituacao;