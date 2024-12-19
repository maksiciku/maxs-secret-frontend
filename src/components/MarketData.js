import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MarketData = () => {
    const [data, setData] = useState(null);
    const [symbol, setSymbol] = useState('bitcoin');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching market data for:', symbol);
                const response = await axios.get(
                    `https://maxs-secret-backend.vercel.app/api/market-data?symbol=${symbol}`
                );
                console.log('Market data fetched:', response.data);

                // Update state with fetched data
                setData(response.data[symbol.toLowerCase()]);
                setError(null); // Clear any previous errors
            } catch (err) {
                console.error('Error fetching market data:', err.message);
                setError('Unable to fetch market data. Please try again later.');
                setData(null); // Clear data if there's an error
            }
        };

        fetchData();
    }, [symbol]);

    const handleSymbolChange = (e) => {
        setSymbol(e.target.value.toLowerCase());
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2>Market Data</h2>
            <input
                type="text"
                value={symbol}
                onChange={handleSymbolChange}
                placeholder="Enter cryptocurrency (e.g., bitcoin)"
                style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
            />
            <div>
                {error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : data ? (
                    <p>
                        <strong>{symbol.toUpperCase()}</strong>: ${data?.usd || 'N/A'}
                    </p>
                ) : (
                    <p>Loading data...</p>
                )}
            </div>
        </div>
    );
};

export default MarketData;
