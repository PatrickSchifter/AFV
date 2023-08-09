import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
      width: ${props => props.width ? props.width : '100%'};
      height: 3px;
      background-color: #2c3d5b;
      margin-top: 0.9%;
      margin-bottom: 0.3%;
`

const Divisor = ({width}) => {
  return (
    <Div width={width}></Div>
  )
}

export default Divisor