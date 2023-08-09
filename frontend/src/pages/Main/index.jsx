import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../auth';
import styled from 'styled-components';
import { MenuProvider } from '../../contexts/menuContext';

import { Sidebar } from '../../components/Sidebar';
import Header from '../../components/Header';

import Content from '../../components/Content';

const MainDiv = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`
const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const Main = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  return (
    <>
      {isAuthenticated ? (
        <MenuProvider>
          <MainDiv> 
            <Sidebar />
            <ContentDiv>
              <Header />
              <Content />
            </ContentDiv>
          </MainDiv>
        </MenuProvider>
        
      ) : (
        <div>Sua sessão expirou.</div>
      )}
    </>
  )
}

export default Main

/*Esse componente é o principal da aplicação. A visualização dele é controlada pelo context isAuthenticated que é true se o usuário foi autenticado no momento do login. É composto 
pelos componentes Sidebar, Header e Content. Sendo o Sidebar como o Menu à esquerda que é feito a manipulação pelo Header e o content é onde será mostrado todo o conteúdo. 
O MenuProvider é responsável por prover os estados do menu*/ 