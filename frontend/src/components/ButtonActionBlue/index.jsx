import React from 'react'
import './style.css'

const ButtonActionBlue = ({aditionalClass, title, onClick}) => {
  return (
    <button className={'button-action-blue  ' + aditionalClass} onClick={onClick}>{title}</button>
  )
}

export default ButtonActionBlue;