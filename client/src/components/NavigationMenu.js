import React from 'react';
import { Link } from 'react-router-dom';

function NavigationMenu() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/stocks">Stocks</Link>
                </li>
                <li>
                    <Link to="/settings">Settings</Link>
                </li>
                <li>
                    <Link to="/brokers">Brokers</Link>
                </li>
            </ul>
        </nav>
    );
}

export default NavigationMenu;
