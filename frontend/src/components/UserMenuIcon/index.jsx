import React, {useContext, useCallback, useRef} from 'react';
import { FaUserAlt, FaSortDown } from "react-icons/fa";
import { MenuContext } from '../../contexts/menuContext';

import './style.css'

const UserMenuIcon = () => {
    const {userMenuOpen ,setUserMenuOpen, setUserMenuRef} = useContext(MenuContext);

    //const userData = JSON.parse(localStorage.getItem('userData'));
    //const userName = userData.Nome;

    const handleClickUserIcon = (e) => {
      setUserMenuOpen(!userMenuOpen);
      setUserMenuRef(menuRef.current);
    };

    let menuRef = useRef()

  return (
    <div className='user-container' onClick={handleClickUserIcon} ref={menuRef}>    
        <div className='user-icon-wrap'>
            <FaUserAlt id='user-icon'/>
        </div>
        <p>Olá, Patrick<FaSortDown id='arrow-user' /></p>
    </div>
    
  )
}

export default UserMenuIcon