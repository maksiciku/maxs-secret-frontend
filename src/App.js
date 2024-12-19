import React from 'react';
import { Box, Typography } from '@mui/material';
import MarketData from './components/MarketData';
import TrendChart from './components/TrendChart';
import Portfolio from './components/Portfolio';
import './App.css';

const App = () => {
  return (
    <div className="container">
      <Typography
        variant="h2"
        style={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold', color: '#fff' }}
      >
        Max's Secret
      </Typography>
      <Typography
        variant="subtitle1"
        style={{ textAlign: 'center', marginBottom: '40px', color: '#f8f9fa' }}
      >
        Your personalized crypto tracker and prediction tool
      </Typography>

      <Box style={{ marginBottom: '40px' }}>
        <Typography variant="h4" style={{ marginBottom: '20px', color: '#fff' }}>
          Market Data
        </Typography>
        <MarketData />
      </Box>

      <Box style={{ marginBottom: '40px' }}>
        <Typography variant="h4" style={{ marginBottom: '20px', color: '#fff' }}>
          Cryptocurrency Trend
        </Typography>
        <TrendChart />
      </Box>

      <Box style={{ marginBottom: '40px' }}>
        <Typography variant="h4" style={{ marginBottom: '20px', color: '#fff' }}>
          Portfolio Tracker
        </Typography>
        <Portfolio />
      </Box>
    </div>
  );
};

export default App;
