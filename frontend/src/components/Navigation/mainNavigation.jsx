import React from 'react';
import { NavLink } from 'react-router-dom';

import './mainNavigation.css';

const mainNavigation = props => (
    <header className="main-navigation">
        <div className="main-navigation__logo">
            <h1>DailyEvent</h1>
        </div>
        <nav className="main-navigation__items">
            <ul>
                <li>
                    <NavLink to="/authpage">Authenticate</NavLink>
                </li>
                <li>
                    <NavLink to="/events">Events</NavLink>
                </li>
                <li>
                    <NavLink to="/bookings">Bookings</NavLink>
                </li>
            </ul>
        </nav>
    </header>
);

export default mainNavigation;