import React from 'react'
import './Crypto.css'

import { useNavigate } from 'react-router-dom'

export const Crypto = ({ indicator }) => {

  const navigate = useNavigate();

  const { nombre, codigo, fecha, unidad_medida, valor } = indicator
  const strDate = new Date(fecha);


  const unitValue = () => {
    switch (unidad_medida) {
      case "Pesos":
        return `$${valor.toLocaleString('es-CL')}`
      case "Porcentaje":
        return `${valor}%`
      case "Dólar":
        return `USD$${valor.toLocaleString('en-US')}`
      default:
        break;
    }
  }

  const handleClickIndicator = () => {
    navigate('/crypto-details', { state: { code: codigo } })
  }

  return (
    <div className='crypto-container' onClick={handleClickIndicator}>
      <div className='first-row'>
        <h4>{nombre}</h4>
        <h2>{unitValue()}</h2>
      </div>
      <div className='second-row'>
        Al {strDate.toLocaleDateString('en-GB')}
      </div>

    </div>
  )
}
