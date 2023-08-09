import styled from "styled-components";
import { FaTimesCircle } from 'react-icons/fa';

const Button = styled.button`
    color: red;
    background-color: transparent;
    border: none;
    cursor: pointer;
    align-content: center;
    margin: 0;
    padding-left: 15px;
`

const ButtonDelete =({onClick, disabled})=> {
    return <Button disabled={disabled} onClick={onClick}>{<FaTimesCircle />}</Button>
}

export default ButtonDelete;