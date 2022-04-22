import React, { useEffect, useState } from 'react'
import './Home.css'
import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { getIndicators } from '../../Providers/Endpoints';
import { Crypto } from '../../Components/Crypto/Crypto';

export const Home = () => {
  const location = useLocation();
  const { name } = location.state;

  // const [loader, setLoader] = useState(true)
  const [indicators, setIndicators] = useState([])

  const fetchIndicators = async () => {
    const callEndpoint = await getIndicators();

    let result = [];
    const keys = Object.keys(callEndpoint);
    keys.forEach(function (key) {
      if (typeof callEndpoint[key] !== "string")
        result.push(callEndpoint[key]);
    });

    setIndicators(result)
  }

  useEffect(() => {
    fetchIndicators()
    return () => {
    }
  }, [])


  return (
    <div className='home-container'>
      <h3>Hola {name}</h3>
      <p>Te presento los indicadores de criptomonedas al dia de hoy:</p>
      {indicators.length < 0
        ?
        <Box sx={{ width: '100%' }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box>
        :
        indicators.map((indicator) => <div key={indicator.codigo}><Crypto indicator={indicator} /></div>)
      }

    </div>
  )
}
