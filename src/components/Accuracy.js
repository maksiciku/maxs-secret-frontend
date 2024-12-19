import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const Accuracy = () => {
    const [accuracyData, setAccuracyData] = useState(null);
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchAccuracy = async () => {
            try {
                const response = await axios.get(`https://maxs-secret-backend.vercel.app/api/accuracy`);
                const { weeklyAccuracy, historicalData } = response.data;

                // Prepare chart data
                const dates = historicalData.map((entry) =>
                    new Date(entry.timestamp).toLocaleDateString()
                );
                const accuracies = historicalData.map((entry) => entry.correct);

                setChartData({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Prediction Accuracy',
                            data: accuracies,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            tension: 0.2,
                        },
                    ],
                });

                setAccuracyData(weeklyAccuracy);
            } catch (error) {
                console.error('Error fetching accuracy data:', error);
            }
        };

        fetchAccuracy();
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2>Weekly Accuracy</h2>
            {accuracyData ? (
                <div>
                    <p><strong>Accuracy:</strong> {accuracyData.accuracy}</p>
                    <p><strong>Total Predictions:</strong> {accuracyData.total}</p>
                    <p><strong>Correct Predictions:</strong> {accuracyData.correct}</p>
                </div>
            ) : (
                <p>Loading weekly accuracy...</p>
            )}
            {chartData ? (
                <div style={{ marginTop: '20px' }}>
                    <h3>Historical Accuracy</h3>
                    <Line data={chartData} />
                </div>
            ) : (
                <p>Loading chart data...</p>
            )}
        </div>
    );
};

export default Accuracy;
