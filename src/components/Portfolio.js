import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { FormControl, InputLabel, MenuItem, Select, TextField, Alert } from '@mui/material';
import 'chart.js/auto';

const Portfolio = () => {
    const [selectedCryptos, setSelectedCryptos] = useState(['bitcoin']);
    const [quantities, setQuantities] = useState({ bitcoin: 1 }); // Default quantity for Bitcoin
    const [portfolioValue, setPortfolioValue] = useState(0);
    const [chartData, setChartData] = useState(null);
    const [notification, setNotification] = useState(null);
    const [error, setError] = useState(null);

    const availableCryptos = ['bitcoin', 'ethereum', 'dogecoin', 'litecoin'];

    // Fetch portfolio data and update chart
    useEffect(() => {
        const fetchPortfolioData = async () => {
            try {
                const symbols = selectedCryptos.join(',');
                const response = await axios.get(`http://localhost:5000/api/portfolio?symbols=${symbols}`);
                const { data } = response.data;

                // Calculate total portfolio value based on quantities
                const totalValue = selectedCryptos.reduce((total, crypto) => {
                    const price = data[crypto]?.usd || 0;
                    const quantity = quantities[crypto] || 0;
                    return total + price * quantity;
                }, 0);
                setPortfolioValue(totalValue);

                // Generate chart data
                const timestamps = Array.from({ length: selectedCryptos.length }, () =>
                    new Date().toLocaleTimeString()
                );
                const values = selectedCryptos.map((crypto) => (data[crypto]?.usd || 0) * (quantities[crypto] || 0));

                setChartData({
                    labels: timestamps,
                    datasets: [
                        {
                            label: 'Portfolio Value (USD)',
                            data: values,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            tension: 0.2,
                        },
                    ],
                });

                setError(null); // Clear previous errors
            } catch (err) {
                console.error('Error fetching portfolio data:', err.message);
                setError('Failed to fetch portfolio data. Please try again.');
                setChartData(null); // Clear chart data if there's an error
            }
        };

        fetchPortfolioData();
    }, [selectedCryptos, quantities]);

    // WebSocket for real-time notifications
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:5001');

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.notification) {
                setNotification(data.notification);
            }
        };

        ws.onclose = () => console.log('WebSocket disconnected');

        return () => ws.close();
    }, []);

    // Handle cryptocurrency selection change
    const handleCryptoChange = (event) => {
        const newSelection = event.target.value;
        setSelectedCryptos(newSelection);

        // Initialize quantities for new selections
        const updatedQuantities = { ...quantities };
        newSelection.forEach((crypto) => {
            if (!updatedQuantities[crypto]) updatedQuantities[crypto] = 1; // Default quantity
        });
        setQuantities(updatedQuantities);
    };

    // Handle quantity change
    const handleQuantityChange = (crypto, value) => {
        setQuantities((prev) => ({
            ...prev,
            [crypto]: Number(value),
        }));
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2>Portfolio Tracker</h2>
            <FormControl fullWidth style={{ marginBottom: '20px' }}>
                <InputLabel id="crypto-select-label">Select Cryptocurrencies</InputLabel>
                <Select
                    labelId="crypto-select-label"
                    multiple
                    value={selectedCryptos}
                    onChange={handleCryptoChange}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {availableCryptos.map((crypto) => (
                        <MenuItem key={crypto} value={crypto}>
                            {crypto.toUpperCase()}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <div style={{ marginBottom: '20px' }}>
                {selectedCryptos.map((crypto) => (
                    <div key={crypto} style={{ marginBottom: '10px' }}>
                        <TextField
                            label={`${crypto.toUpperCase()} Quantity`}
                            type="number"
                            value={quantities[crypto] || 0}
                            onChange={(e) => handleQuantityChange(crypto, e.target.value)}
                            style={{ marginRight: '10px', width: '200px' }}
                        />
                    </div>
                ))}
            </div>

            <h3>Combined Portfolio Value: ${portfolioValue.toFixed(2)}</h3>
            {notification && <Alert severity="info" style={{ marginTop: '10px' }}>{notification}</Alert>}
            {error ? (
                <Alert severity="error" style={{ marginTop: '10px' }}>{error}</Alert>
            ) : chartData ? (
                <Line data={chartData} />
            ) : (
                <p>Loading portfolio chart...</p>
            )}
        </div>
    );
};

export default Portfolio;
