import React, { useState, useEffect } from 'react';

function StocksPage() {
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/stocks')
            .then(response => response.json())
            .then(data => setStocks(Object.values(data)))
            .catch(error => console.error('Error fetching stocks:', error));
    }, []);

    const handleTradingStatusChange = async (symbol, trading) => {
        try {
            const response = await fetch(`http://localhost:3001/stocks/${symbol}/trading/${trading}`, {
                method: 'PUT',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setStocks(prevStocks =>
                prevStocks.map(stock => (stock.symbol === symbol ? { ...stock, trading: !stock.trading } : stock))
            );
        } catch (error) {
            console.error('Error updating trading status:', error);
        }
    };

    return (
        <div>
            <h1>Stocks Page</h1>
            <ul>
                {stocks.map(stock => (
                    <li key={stock.symbol}>
                        <span>{`${stock.symbol} - ${stock.name}`}</span>
                        <input
                            type="checkbox"
                            checked={stock.trading}
                            onChange={() => handleTradingStatusChange(stock.symbol, !stock.trading)}
                        />
                        <label>{stock.trading ? 'Участвует в торгах' : 'Не участвует в торгах'}</label>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default StocksPage;
