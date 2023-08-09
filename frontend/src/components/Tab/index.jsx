import React, {useContext} from 'react';
import { MenuContext } from '../../contexts/menuContext';
import { ContentContext } from '../../contexts/contentContext'
import {AiOutlineClose, AiOutlineExpand} from 'react-icons/ai'


import './style.css';

const Tab = ({titulo, idMenu}) => {

    const {menuTabs, setMenuTabs, activeTab, setActiveTab} = useContext(MenuContext);
    const {setOpenContent} = useContext(ContentContext);
    
    const handleTabClick = (index) => {
        setActiveTab(index)
    }

    function handleCloseTab (index){

        let tabs = menuTabs.filter(menu => menu !== index);
        console.log(tabs, menuTabs);
        setMenuTabs(tabs);

        if(index === activeTab){
          let tabs = menuTabs
          if(menuTabs.length === 1){
            setOpenContent(false)
          }
          if(menuTabs.length > 0){
            if(tabs[tabs.length -1] === index){
              tabs.pop()
              const newActive = tabs.length > 0 ? tabs[tabs.length -1] : 0
              setActiveTab(newActive);
            }else{
              const newActive = tabs.length > 0 ? tabs[tabs.length -1] : 0  
              setActiveTab(newActive);          
            }
          }else{
            const newActive = 0
            setActiveTab(newActive);
          }
        }
    }

  return (
    <div 
      className={activeTab === idMenu?'tab active':'tab'} 
      key={idMenu} 
    >
      <div className="tab-description" onClick={() => handleTabClick(idMenu)}>
        {titulo}
      </div>
      <div className='tab-icon-box' onClick={() => handleCloseTab(idMenu)}>  
        <AiOutlineClose 
          className='tab-action-icon' 
        />
      </div>
        
    </div>
  )
}

export default Tab