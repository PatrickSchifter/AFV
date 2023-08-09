import styled from 'styled-components';

const Button = styled.button`
  color: white;
  background-color: #ea5c11;
  border-radius: 5px;
  box-shadow: none;
  border: #ea5c11;
  cursor: pointer;
  width: 100%;
  height: 35px;
`

const Main = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: flex-end;

  height: ${props => props.justButton ? '35px' : '57px'};
  width: ${props => props.width ? props.width : '100px'};
  margin: ${props => props.margin ? props.margin : '0px 20px 15px 0px' };
`

const ButtonActionOrange = ({title, onClick, width, justButton, margin, disabled}) => {
  return (
    <Main width={width} justButton={justButton} margin={margin}>
      <Button onClick={onClick} disabled={disabled} >{title}</Button>
    </Main> 

  )
}

export default ButtonActionOrange;