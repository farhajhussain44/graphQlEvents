import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AuthPage from './pages/auth';
import EventPage from './pages/events';
import BookingPage from './pages/bookings';
import MainNavigation from './components/Navigation/mainNavigation';
import AuthContext from './context/authcontext';
import './App.css';
class App extends React.Component {
  state = {
    token: '',
    userId: ''
  }
  login = (token, userId, tokenExpiration) => {
    this.setState({ token, userId })
  }
  logout = () => {
    this.setState({ token: null, userId: null })
  }
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout
          }}>
            <MainNavigation />
            <main className="main-content">
              <Switch>
              {!this.state.token && <Redirect from="/" to="/authpage" exact />}
                {this.state.token && <Redirect from="/" to="/events" exact />}
                {this.state.token && <Redirect from="/authpage" to="/events" exact />}
                {!this.state.token && (
                  <Route path="/authpage" component={AuthPage} />
                )}
                <Route path="/events" component={EventPage} />
                {this.state.token && (
                  <Route path="/bookings" component={BookingPage} />
                )}
              </Switch>
            </main>
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}
export default App;
