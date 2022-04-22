import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import './index.css'
import { useNavigate } from "react-router-dom";

export const Index = () => {
  let navigate = useNavigate();

  const [name, setName] = useState("")

  const handleChangeName = (event) => {
    const { target } = event
    setName(target.value)
  }

  const handleSubmit = () => {
    navigate("/home", { state: { name } });
  }

  return (
    <div className='container-index'>
      <h1>Bienvenido</h1>
      <p>Cual es tu nombre?</p>
      <TextField autoComplete='off' variant="outlined" className='input-name' onChange={handleChangeName} />
      <div className='button-bar'>
        <Button
          variant='contained'
          className='button-next'
          onClick={handleSubmit}
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}
