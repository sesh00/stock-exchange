import React, { useState, useEffect } from 'react';

function BrokersPage() {
    const [brokers, setBrokers] = useState([]);
    const [newBrokerName, setNewBrokerName] = useState('');
    const [newInitialFunds, setNewInitialFunds] = useState('');
    const [selectedUpdateBroker, setSelectedUpdateBroker] = useState(null);
    const [selectedRemoveBroker, setSelectedRemoveBroker] = useState(null);
    const [updateFunds, setUpdateFunds] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/brokers')
            .then(response => response.json())
            .then(data => setBrokers(data.brokers))
            .catch(error => console.error('Error fetching brokers:', error));
    }, []);

    const handleAddBroker = async () => {
        try {
            const response = await fetch(`http://localhost:3001/brokers/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newBrokerName,
                    initialFunds: newInitialFunds,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            updateBrokerList();

            setNewBrokerName('');
            setNewInitialFunds('');
        } catch (error) {
            console.error('Error adding new broker:', error);
        }
    };

    const handleUpdateFunds = async () => {
        if (selectedUpdateBroker) {
            try {
                const response = await fetch(
                    `http://localhost:3001/brokers/${selectedUpdateBroker.name}/update-funds/${updateFunds}`,
                    {
                        method: 'PUT',
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                updateBrokerList();

                setUpdateFunds('');
                setSelectedUpdateBroker(null);
            } catch (error) {
                console.error('Error updating initial funds:', error);
            }
        }
    };

    const handleRemoveBroker = async () => {
        if (selectedRemoveBroker) {
            try {
                const response = await fetch(`http://localhost:3001/brokers/${selectedRemoveBroker.name}/remove`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                updateBrokerList();

                setSelectedRemoveBroker(null);
            } catch (error) {
                console.error('Error removing broker:', error);
            }
        }
    };

    const updateBrokerList = async () => {
        try {
            const response = await fetch('http://localhost:3001/brokers');
            const data = await response.json();
            setBrokers(data.brokers);
        } catch (error) {
            console.error('Error updating broker list:', error);
        }
    };

    return (
        <div>
            <h1>Brokers Page</h1>
            <div>
                <h2>Add New Broker</h2>
                <input
                    type="text"
                    placeholder="Broker Name"
                    value={newBrokerName}
                    onChange={e => setNewBrokerName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Initial Funds"
                    value={newInitialFunds}
                    onChange={e => setNewInitialFunds(e.target.value)}
                />
                <button onClick={handleAddBroker}>Add Broker</button>
            </div>
            <div>
                <h2>Update Existing Broker</h2>
                <select
                    value={selectedUpdateBroker ? selectedUpdateBroker.name : ''}
                    onChange={e => {
                        const selected = brokers.find(broker => broker.name === e.target.value);
                        setSelectedUpdateBroker(selected);
                        setUpdateFunds(selected ? selected.initialFunds : '');
                    }}
                >
                    <option value="">Select Broker</option>
                    {brokers.map(broker => (
                        <option key={broker.name} value={broker.name}>
                            {broker.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="New Initial Funds"
                    value={updateFunds}
                    onChange={e => setUpdateFunds(e.target.value)}
                />
                <button onClick={handleUpdateFunds}>Update Funds</button>
            </div>
            <div>
                <h2>Remove Broker</h2>
                <select
                    value={selectedRemoveBroker ? selectedRemoveBroker.name : ''}
                    onChange={e => setSelectedRemoveBroker(brokers.find(broker => broker.name === e.target.value))}
                >
                    <option value="">Select Broker</option>
                    {brokers.map(broker => (
                        <option key={broker.name} value={broker.name}>
                            {broker.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleRemoveBroker}>Remove Broker</button>
            </div>
            <div>
                <h2>Broker List</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Initial Funds</th>
                    </tr>
                    </thead>
                    <tbody>
                    {brokers.map(broker => (
                        <tr key={broker.name}>
                            <td>{broker.name}</td>
                            <td>{broker.initialFunds}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BrokersPage;
