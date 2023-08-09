import React from 'react';
import styled from 'styled-components';

const Main = styled.div`
  display: ${props => props.activeTab ? 'flex' : 'none' } ;
  width: 100%;
  background-color: gray;
`

const GraficosDashboard = ({activeTab}) => {
  return (
    <Main activeTab={activeTab} >GraficosDashboard</Main>
  )
}

export default GraficosDashboard;