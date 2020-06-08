import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AuthPage from './pages/auth';
import EventPage from './pages/events';
import BookingPage from './pages/bookings';
import MainNavigation from './components/Navigation/mainNavigation';
import './App.css'
const App = () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <MainNavigation />
        <main className="main-content">
          <Switch>
            <Redirect from="/" to="/authpage" exact />
            <Route path="/authpage" component={AuthPage} />
            <Route path="/events" component={EventPage} />
            <Route path="/bookings" component={BookingPage} />
          </Switch>
        </main>
      </React.Fragment>
    </BrowserRouter>
  );
}
export default App;
