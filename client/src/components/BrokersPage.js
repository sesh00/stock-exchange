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
            .catch(error => console.error('Ошибка при получении данных о брокерах:', error));
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
                throw new Error(`HTTP ошибка! Статус: ${response.status}`);
            }

            // Обновление списка брокеров
            updateBrokerList();

            // Очистка полей ввода после успешного добавления
            setNewBrokerName('');
            setNewInitialFunds('');
        } catch (error) {
            console.error('Ошибка при добавлении нового брокера:', error);
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
                    throw new Error(`HTTP ошибка! Статус: ${response.status}`);
                }

                // Обновление списка брокеров
                updateBrokerList();

                // Очистка полей ввода после успешного обновления
                setUpdateFunds('');
                setSelectedUpdateBroker(null);
            } catch (error) {
                console.error('Ошибка при обновлении начальных средств:', error);
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
                    throw new Error(`HTTP ошибка! Статус: ${response.status}`);
                }

                // Обновление списка брокеров
                updateBrokerList();

                setSelectedRemoveBroker(null);
            } catch (error) {
                console.error('Ошибка при удалении брокера:', error);
            }
        }
    };

    const updateBrokerList = async () => {
        try {
            const response = await fetch('http://localhost:3001/brokers');
            const data = await response.json();
            setBrokers(data.brokers);
        } catch (error) {
            console.error('Ошибка при обновлении списка брокеров:', error);
        }
    };

    return (
        <div>
            <h1>Страница брокеров</h1>
            <div>
                <h2>Добавить нового брокера</h2>
                <input
                    type="text"
                    placeholder="Имя брокера"
                    value={newBrokerName}
                    onChange={e => setNewBrokerName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Начальные средства"
                    value={newInitialFunds}
                    onChange={e => setNewInitialFunds(e.target.value)}
                />
                <button onClick={handleAddBroker}>Добавить брокера</button>
            </div>
            <div>
                <h2>Обновить существующего брокера</h2>
                <select
                    value={selectedUpdateBroker ? selectedUpdateBroker.name : ''}
                    onChange={e => {
                        const selected = brokers.find(broker => broker.name === e.target.value);
                        setSelectedUpdateBroker(selected);
                        setUpdateFunds(selected ? selected.initialFunds : '');
                    }}
                >
                    <option value="">Выберите брокера</option>
                    {brokers.map(broker => (
                        <option key={broker.name} value={broker.name}>
                            {broker.name}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Новые начальные средства"
                    value={updateFunds}
                    onChange={e => setUpdateFunds(e.target.value)}
                />
                <button onClick={handleUpdateFunds}>Обновить средства</button>
            </div>
            <div>
                <h2>Удалить брокера</h2>
                <select
                    value={selectedRemoveBroker ? selectedRemoveBroker.name : ''}
                    onChange={e => setSelectedRemoveBroker(brokers.find(broker => broker.name === e.target.value))}
                >
                    <option value="">Выберите брокера</option>
                    {brokers.map(broker => (
                        <option key={broker.name} value={broker.name}>
                            {broker.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleRemoveBroker}>
                    Удалить брокера
                </button>
            </div>
            <div>
                <h2>Список брокеров</h2>
                <table>
                    <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Начальные средства</th>
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
