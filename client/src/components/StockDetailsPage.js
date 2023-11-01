import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Chart from 'react-apexcharts';

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

    const options = {
        chart: {
            type: 'candlestick',
        },
        title: {
            text: 'Stock Candlestick Chart',
        },
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            tooltip: {
                enabled: true,
            },
        },
    };

    const series = [
        {
            data: stockDetails?.dataset.data.map(candle => ({
                x: new Date(candle[0]).getTime(),
                y: [Number(candle[1]), Number(candle[2]), Number(candle[3]), Number(candle[4])],
            })),
        },
    ];

    return (
        <div>
            <h1>Stock Details Page</h1>
            {stockDetails ? (
                <div>
                    <h2>{stockDetails.dataset.name}</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                            <h3>Stock Table</h3>
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
                        <div>
                            <h3>Stock Chart</h3>
                            <Chart options={options} series={series} type="candlestick" height={500} width={800} />
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default StockDetailsPage;
