// StockDetailsPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function StockDetailsPage() {
    const { symbol } = useParams();
    const [stockDetails, setStockDetails] = useState(null);

    useEffect(() => {
        const fetchStockDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3001/stocks/${symbol}/historical-data`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const dataset = await response.json();

                setStockDetails(dataset);
            } catch (error) {
                console.error('Error fetching stock details:', error);
            }
        };

        fetchStockDetails();
    }, [symbol]);

    return (
        <div>
            <h1>Stock Details Page</h1>
            {stockDetails ? (
                <div>
                    <h2>{stockDetails.dataset.name}</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Open</th>
                            <th>High</th>
                            <th>Low</th>
                            <th>Close</th>
                            <th>Volume</th>
                        </tr>
                        </thead>
                        <tbody>
                        {stockDetails.dataset.data.map((candle, index) => (
                            <tr key={index}>
                                <td>{candle[0]}</td>
                                <td>{candle[1]}</td>
                                <td>{candle[2]}</td>
                                <td>{candle[3]}</td>
                                <td>{candle[4]}</td>
                                <td>{candle[5]}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default StockDetailsPage;
