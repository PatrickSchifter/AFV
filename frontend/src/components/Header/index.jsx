import React, {useContext} from 'react';
import styled from 'styled-components';
import { MenuContext } from '../../contexts/menuContext';

import HamburguerMenu from '../MenuHamburguer';
import UserMenuIcon from '../UserMenuIcon';
import { FaChevronDown } from 'react-icons/fa';

const HeaderComp = styled.header`
  background-color: #2C3D5B;
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 75px;
`

const ContainerLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100px;
  color: white;
  margin-left: 20px;
`

const ConteinerRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 150px;
  margin-right: 100px;
  color: white;
`

const Header = () => {

  const {openMenu, setOpenMenu} = useContext(MenuContext)

  const handleOpenMenu = () => {
    console.log('abrir Menu')
    setOpenMenu(!openMenu)
  }

  return (
    <HeaderComp>
      <ContainerLeft>  
        <HamburguerMenu onClick={() => handleOpenMenu()} />
        <p>Sessão</p>
      </ContainerLeft>
      <ConteinerRight>
        <UserMenuIcon />
        <FaChevronDown />
      </ConteinerRight>
    </HeaderComp>
  )
}

export default Header;