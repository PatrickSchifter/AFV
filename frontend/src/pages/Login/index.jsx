import React, { useState, useContext } from "react";
import md5 from 'js-md5';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth';
import { AiOutlineCloseCircle } from 'react-icons/ai'

import './style.css'

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState('');
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    let url = process.env.REACT_APP_API_URL + `login`;  

    if (email !== "" && password !== "") {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
        .then(response => response.json())
        .then((data) => {
          if (data.authenticated) {
            localStorage.setItem('token', '');
            localStorage.setItem('token', data.token);
            localStorage.setItem('connetion_id', data.connection_id);
            localStorage.setItem('idusuario', data.user_data.IDUsuario);
            localStorage.setItem('userData', JSON.stringify(data.user_data));
            setIsAuthenticated(data.authenticated)
            navigate('/main')
          } else {
            setIsAuthenticated(data.authenticated)
            setAlert(data.info);
            openModal();
          }
        })
        .catch(error => console.error(error));
    } else {
      if (email === "") {
        setAlert("É necessário preencher o Email");
        openModal();
      } else {
        setAlert("É necessário preencher a Senha");
        openModal();
      }
    }
  }

  return (
    <div className="main-login">
      <form onSubmit={handleSubmit} className='main-container-login'>
        <img src='/assets/logo-login-eversales.gif' />
        <div className="container-afv">
          <div className="container-left">
            <p>AFV 5.0 | </p>
          </div>
          <div className="container-right">
            <p>Automação da</p>
            <p>Força de Vendas</p>
          </div>

        </div>
        <div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            onChange={(event) => setPassword(md5(event.target.value))}
          />
        </div>
        <div className="button-info">
          <button type="submit">Entrar</button>
          <p>Desenvolvido por ACOM Sistemas</p>
          <p>v 1.0.0.1</p>
        </div>
        
        <Modal isOpen={isOpen} onRequestClose={closeModal} ariaHideApp={false} className='login-modal'>
          <AiOutlineCloseCircle id="login-icon" />
          <h2>AFV - Automação do força de</h2>
          <h2>vendas</h2>
          <p>{alert}</p>
          <button onClick={closeModal}>Ok</button>
        </Modal>
      </form>
    </div>

  );
}

export default Login;