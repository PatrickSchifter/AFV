import styled from "styled-components";
import { FaRegEye  } from 'react-icons/fa';

const Button = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    align-content: center;
    margin: 0;
    padding-left: 15px;

`

const ButtonView =({onClick})=> {
    return <Button onClick={onClick}>{<FaRegEye />}</Button>
}

export default ButtonView;