import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

function SettingsPage() {
    const [exchangeSettings, setExchangeSettings] = useState({});
    const [newFrequency, setNewFrequency] = useState(0);
    const [selectedDate, setSelectedDate] = useState('');
    const [socket, setSocket] = useState(null);
    const [updateMessages, setUpdateMessages] = useState([]);

    useEffect(() => {
        const newSocket = io('http://localhost:3001');
        setSocket(newSocket);

        // Fetch exchange settings initially
        fetchExchangeSettings();

        // Listen for the 'updateCurrentDate' event from the server
        newSocket.on('updateCurrentDate', (newDate) => {
            setExchangeSettings((prevSettings) => ({
                ...prevSettings,
                current_date: newDate,
            }));
        });

        // Listen for the 'updateStockData' event from the server
        newSocket.on('updateStockData', (newMessages) => {
            setUpdateMessages(newMessages);
        });

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const fetchExchangeSettings = async () => {
        try {
            const response = await axios.get('http://localhost:3001/exchange-settings');
            setExchangeSettings(response.data);
        } catch (error) {
            console.error('Error fetching exchange settings:', error);
        }
    };

    const handleToggleTradingStatus = async () => {
        try {
            await axios.post('http://localhost:3001/exchange-settings/toggle-trading-status');
            fetchExchangeSettings(); // Update settings after the toggle
        } catch (error) {
            console.error('Error toggling trading status:', error);
        }
    };

    const handleUpdateFrequency = async () => {
        try {
            await axios.post('http://localhost:3001/exchange-settings/update-frequency-seconds', { newFrequency });
            fetchExchangeSettings(); // Update settings after the frequency update
        } catch (error) {
            console.error('Error updating frequency:', error);
        }
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleSendDate = async () => {
        try {
            await axios.post('http://localhost:3001/exchange-settings/set-current-date', { newDate: selectedDate });
            fetchExchangeSettings(); // Update settings after sending the date
        } catch (error) {
            console.error('Error sending date:', error);
        }
    };

    return (
        <div>
            <h1>Settings Page</h1>
            <p>This is the settings page content.</p>
            <p>Current Date: {new Date(exchangeSettings.current_date).toLocaleDateString()}</p>

            <button onClick={handleToggleTradingStatus}>Toggle Trading Status</button>

            <div>
                <label>Update Frequency (seconds): </label>
                <input type="number" value={newFrequency} onChange={(e) => setNewFrequency(e.target.value)} />
                <button onClick={handleUpdateFrequency}>Update Frequency</button>
            </div>

            <div>
                <label>Select Date: </label>
                <input type="date" value={selectedDate} onChange={handleDateChange} />
                <button onClick={handleSendDate}>Send Date</button>
            </div>

            <div>
                <h2>Update Messages</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Date</th>
                        <th>Open</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Close</th>
                        <th>Volume</th>
                    </tr>
                    </thead>
                    <tbody>
                    {updateMessages.map(({ symbol, historicalDataElement }, index) => (
                        <tr key={index}>
                            <td>{symbol}</td>
                            <td>{historicalDataElement ? historicalDataElement[0] : ''}</td> {/* Date */}
                            <td>{historicalDataElement ? historicalDataElement[1] : ''}</td> {/* Open */}
                            <td>{historicalDataElement ? historicalDataElement[2] : ''}</td> {/* High */}
                            <td>{historicalDataElement ? historicalDataElement[3] : ''}</td> {/* Low */}
                            <td>{historicalDataElement ? historicalDataElement[4] : ''}</td> {/* Close */}
                            <td>{historicalDataElement ? historicalDataElement[5] : ''}</td> {/* Volume */}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SettingsPage;
