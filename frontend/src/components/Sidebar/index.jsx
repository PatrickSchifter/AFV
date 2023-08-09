import styled from "styled-components";
import {useState, useContext, useEffect} from 'react'

import { MenuContext } from "../../contexts/menuContext";

const SidebarComp = styled.aside`
  display: ${props => props.open ? 'flex': 'none'};
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
  width: 400px;
  background-color: #2C3D5B;
  overflow: hidden;
`

const ContentComp = styled.div`
  height: 100%;
  width: 97%;
  overflow-y: auto;
  overflow-x: hidden;
`

const Item = styled.div`
    width: 99.1%;
    padding: 5% 0;
    font-size: 1.03rem;
    border: 1px solid #273550;
    margin-right: 2%;
    cursor: pointer;
    color: white;

    p{
      padding-left: 20px;
    }
`

const SubItem = styled.div`
  width: 83%;
  padding: 5% 0% 5% 16%;
  font-size: 1rem;
  border: 1px solid #273550;
  cursor: pointer;
  color: white;
  display: ${props => props.open ? 'block': 'none'};
`

const Logo = styled.img`
  margin-top: 10px;
  margin-left: 15px;
`
const SearchInput = styled.input`
  width: 100%;
  height: 35px;
  border-radius: 7px;
  border: 1px solid white;

  &::placeholder{
    font-size: 16px;
    padding-left: 10px;
  }
`

export const Sidebar = () => {

  const [searchValue, setSearchValue] = useState('');
  const [filteredMenu, setFilteredMenu] = useState([]);
  const {openMenu, menuTabs, setMenuTabs, activeTab, setActiveTab} = useContext(MenuContext)
  const [openMenus, setOpenMenus] = useState([])
  const [menuItens, setMenuItens] = useState([])

  useEffect(() => {
    async function fetchMenuItems() {
      try {
        const token     = localStorage.getItem('token');
        const idUsuario = localStorage.getItem('idusuario');  
        let url = process.env.REACT_APP_API_URL + `menu/idusuario=${idUsuario}`;      
        
        const response = await fetch( url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          });
        const data = await response.json();
  
        setMenuItens(data.data);
  
        await localStorage.setItem('menus', JSON.stringify(data.data))
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchMenuItems()
  }, [])

  


  const handleClickItem = (IDMenuPai) => {
    if(openMenus.includes(IDMenuPai)){
      let array = [...openMenus]
      array.splice(array.indexOf(IDMenuPai, 1))
      setOpenMenus(array)
    }else{
      setOpenMenus([...openMenus, IDMenuPai]) 
    } 
  }

  const handleMapItens = (item) => { 
    if(item.IDMenuPai > 0){
      return  <SubItem 
                open={openMenus.includes(item.IDMenuPai)} 
                key={item.IDMenu} 
                onClick={() => handleClickSubMenuItem(item.IDMenu)}
              >{item.DescMenu}
              </SubItem>; // 
    }
    return  <Item 
              key={item.IDMenu} 
              data={item.IDMenuPai} 
              onClick={() => handleClickItem(item.IDMenu)}
              ><p>{item.DescMenu}</p>
            </Item>
  } 

  const handleClickSubMenuItem = (idMenu) =>{
    if(menuTabs.length > 0){
        if(menuTabs.includes(idMenu)){
          setActiveTab(idMenu)
        }else{
          setMenuTabs([...menuTabs, idMenu])
          setActiveTab(idMenu)
        }
      }else{
      setMenuTabs([idMenu])
      setActiveTab(idMenu)
    }
    console.log(menuTabs)
  }

  const handleMapSubItens = (item) => {
    if(item.IDMenuPai > 0){
      return  <SubItem 
                open={true} 
                key={item.IDMenu} 
                onClick={() => handleClickSubMenuItem(item.IDMenu)}
              >
              {item.DescMenu}
              </SubItem>; // 
    }
  }

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    const filteredItens = menuItens.filter((item)=>
      item.DescMenu.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredMenu(filteredItens);
  };



  return(
    <SidebarComp open={openMenu}>
      <ContentComp>
        <Logo src="assets/logo-afv-sidebar.png" />
        <SearchInput type="text" placeholder="Busque no menu" onChange={handleSearch} />
        {searchValue ? filteredMenu.map(handleMapSubItens) : menuItens.map(handleMapItens)}
      </ContentComp>
    </SidebarComp>
  )
}