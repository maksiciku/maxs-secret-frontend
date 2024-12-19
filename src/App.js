import React from 'react';
import { Container, CssBaseline, Box } from '@mui/material';
import MarketData from './components/MarketData';
import Prediction from './components/Prediction';
import Accuracy from './components/Accuracy';
import TrendChart from './components/TrendChart';
import Portfolio from './components/Portfolio';

function App() {
    return (
        <Container maxWidth="md" style={{ marginTop: '20px', fontFamily: 'Arial, sans-serif' }}>
            <CssBaseline />
            <Box
                style={{
                    backgroundColor: '#f5f5f5',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
                    Max's Secret
                </h1>
                <MarketData />
                <Box style={{ marginTop: '30px' }}>
                    <TrendChart />
                </Box>
                <Box style={{ marginTop: '30px' }}>
                    <Portfolio />
                </Box>
                <Box style={{ marginTop: '30px' }}>
                    <Prediction />
                </Box>
                <Box style={{ marginTop: '30px' }}>
                    <Accuracy />
                </Box>
            </Box>
        </Container>
    );
}

export default App;
