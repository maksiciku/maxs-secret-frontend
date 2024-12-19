import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert } from '@mui/material';

const Prediction = () => {
    const [prediction, setPrediction] = useState('');
    const [rationale, setRationale] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrediction = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/predict?symbol=bitcoin');
                const { prediction, rationale } = response.data; // Removed shortTermMA & longTermMA
                setPrediction(prediction);
                setRationale(rationale);
            } catch (err) {
                console.error('Error fetching prediction:', err.message);
                setError('Failed to fetch prediction. Please try again.');
            }
        };

        fetchPrediction();
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2>Prediction</h2>
            {error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <>
                    <p>
                        <strong>Prediction:</strong> {prediction || 'Loading...'}
                    </p>
                    <p>
                        <strong>Rationale:</strong> {rationale || 'Loading...'}
                    </p>
                </>
            )}
        </div>
    );
};

export default Prediction;
