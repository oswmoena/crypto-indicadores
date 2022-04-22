import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { getIndicatorByCode } from '../../Providers/Endpoints';
import './CryptoDetails.css'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import frLocale from 'date-fns/locale/fr';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const CryptoDetails = () => {
  const location = useLocation();
  const { code } = location.state;
  const [indicator, setIndicator] = useState(null)
  const [date, setDate] = React.useState(new Date());

  const fetchIndicatorsByCode = async () => {
    const callEndpoint = await getIndicatorByCode(code);

    setIndicator(callEndpoint)

  }

  useEffect(() => {
    fetchIndicatorsByCode()
    return () => {
    }
    // eslint-disable-next-line
  }, [])

  const formatDate = (date) => {
    const newDate = new Date(date)
    return newDate.toLocaleDateString('en-GB')
  }


  return (<div className='crypto-details-container'>
    {indicator
      ? <div>
        <div className="first-row">
          <h2>{indicator.nombre}</h2>
          <div className='date-box'>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
              <DatePicker
                value={date}
                onChange={(newValue) => {
                  setDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className='second-row'>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Fecha</TableCell>
                  <TableCell >Valor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {indicator.serie.map((serieDate, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{formatDate(serieDate.fecha)}</TableCell>
                    <TableCell >{serieDate.valor.toLocaleString('es-CL')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      :
      <Box sx={{ width: '100%' }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    }
  </div>
  )
}
