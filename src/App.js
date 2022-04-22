import './App.css';
import { Index, Home } from './Views/index';
import { CryptoDetails } from './Components/index';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

function App() {
  return (
    <Container maxWidth="md">
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<Index />} />
          <Route path="home" element={<Home />} />
          <Route path="crypto-details" element={<CryptoDetails />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
