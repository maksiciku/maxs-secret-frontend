import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import useWebSocket from 'react-use-websocket';
import 'chart.js/auto';

const TrendChart = () => {
    const [symbol, setSymbol] = useState('bitcoin');
    const [chartData, setChartData] = useState(null);
    const [prices, setPrices] = useState([]);
    const [timestamps, setTimestamps] = useState([]);

    // Connect to the deployed WebSocket server
    const { lastMessage } = useWebSocket('wss://maxs-secret-backend.vercel.app', {
        onOpen: () => console.log('WebSocket connected'),
        onClose: () => console.log('WebSocket disconnected'),
        shouldReconnect: () => true, // Auto-reconnect on disconnect
    });

    // Update prices and timestamps from WebSocket messages
    useEffect(() => {
        if (lastMessage !== null) {
            try {
                const marketData = JSON.parse(lastMessage.data);
                const price = marketData.marketData?.[symbol]?.usd;

                if (price) {
                    setPrices((prevPrices) => {
                        const updatedPrices = [...prevPrices.slice(-9), price]; // Keep last 10 prices
                        return updatedPrices;
                    });

                    setTimestamps((prevTimestamps) => {
                        const updatedTimestamps = [
                            ...prevTimestamps.slice(-9),
                            new Date().toLocaleTimeString(),
                        ];
                        return updatedTimestamps;
                    });
                }
            } catch (error) {
                console.error('Error processing WebSocket message:', error.message);
            }
        }
    }, [lastMessage, symbol]);

    // Update chart data whenever prices or timestamps change
    useEffect(() => {
        if (prices.length > 0 && timestamps.length > 0) {
            setChartData({
                labels: timestamps,
                datasets: [
                    {
                        label: `${symbol.toUpperCase()} Price (USD)`,
                        data: prices,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        tension: 0.2,
                    },
                ],
            });
        }
    }, [prices, timestamps, symbol]);

    const handleSymbolChange = (event) => {
        setSymbol(event.target.value);
        setPrices([]); // Clear prices on symbol change
        setTimestamps([]); // Clear timestamps on symbol change
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2>{symbol.toUpperCase()} Trend</h2>
            <FormControl fullWidth style={{ marginBottom: '20px' }}>
                <InputLabel id="crypto-select-label">Cryptocurrency</InputLabel>
                <Select
                    labelId="crypto-select-label"
                    value={symbol}
                    onChange={handleSymbolChange}
                    label="Cryptocurrency"
                >
                    <MenuItem value="bitcoin">Bitcoin</MenuItem>
                    <MenuItem value="ethereum">Ethereum</MenuItem>
                    <MenuItem value="dogecoin">Dogecoin</MenuItem>
                    <MenuItem value="litecoin">Litecoin</MenuItem>
                </Select>
            </FormControl>
            {chartData ? (
                <Line data={chartData} />
            ) : (
                <p>Loading chart data...</p>
            )}
        </div>
    );
};

export default TrendChart;
