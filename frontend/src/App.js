import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AuthPage from './pages/auth';
import EventPage from './pages/events';
import BookingPage from './pages/bookings';
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Redirect from='/' to='/authpage' exact />
          <Route path='/authpage' component={AuthPage} />
          <Route path='/events' component={EventPage} />
          <Route path='/bookings' component={BookingPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
