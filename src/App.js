import React from 'react';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import MarketData from './components/MarketData';
import TrendChart from './components/TrendChart';
import Portfolio from './components/Portfolio';

const App = () => {
    return (
        <Container maxWidth="md" style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
            <Typography variant="h3" align="center" gutterBottom style={{ color: '#FFD700', fontWeight: 'bold' }}>
                Max's Secret
            </Typography>
            <Typography variant="subtitle1" align="center" gutterBottom style={{ color: '#aaa' }}>
                Your personalized crypto tracker and prediction tool
            </Typography>

            <Box style={{ marginTop: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Market Data
                </Typography>
                <MarketData />
            </Box>

            <Box style={{ marginTop: '40px' }}>
                <Typography variant="h4" gutterBottom>
                    Cryptocurrency Trend
                </Typography>
                <TrendChart />
            </Box>

            <Box style={{ marginTop: '40px' }}>
                <Typography variant="h4" gutterBottom>
                    Portfolio Tracker
                </Typography>
                <Portfolio />
            </Box>

            <Box style={{ marginTop: '40px', textAlign: 'center' }}>
                <CircularProgress style={{ color: '#FFD700' }} />
            </Box>
        </Container>
    );
};

export default App;
