import React from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/authcontext';

import './mainNavigation.css';

const mainNavigation = props => (
    <AuthContext.Consumer>
        {context => {
            return (
                <header className="main-navigation">
                    <div className="main-navigation__logo">
                        <h1>DailyEvent</h1>
                    </div>
                    <nav className="main-navigation__items">
                        <ul>
                            {!context.token && <li>
                                <NavLink to="/authpage">Authenticate</NavLink>
                            </li>}
                            <li>
                                <NavLink to="/events">Events</NavLink>
                            </li>
                            {context.token && <li>
                                <NavLink to="/bookings">Bookings</NavLink>
                            </li>}
                        </ul>
                    </nav>
                </header>
            )
        }}
    </AuthContext.Consumer>
);

export default mainNavigation;