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
import { List } from './List/List';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Graph } from './Graph/Graph';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const CryptoDetails = () => {
  const location = useLocation();
  const { code } = location.state;
  const [indicator, setIndicator] = useState(null)
  const [date, setDate] = React.useState(new Date());
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

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
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleChange} >
                <Tab label="Lista" {...a11yProps(0)} />
                <Tab label="Gráfico" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
              <List indicator={indicator} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <Graph />
            </TabPanel>
          </Box>
          {/* <List indicator={indicator} /> */}
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
