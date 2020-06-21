import React from 'react';
import { ApiRequest } from '../functions';
import './auth.css';
import AuthContext from '../context/authcontext';

export default class AuthSection extends React.Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            email: '',
            password: ''
        }
    }

    switchModeHandler = () => {
        this.setState(prevState => {
            return { isLogin: !prevState.isLogin };
        });
    };
    onHandleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    submitHandler = async event => {
        event.preventDefault();
        const { email, password } = this.state;
        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }
        let requestBody1 = {
            query: `
          query {
            login(email: "${email}", password: "${password}") {
              userId
              token
              tokenExpiration
            }
          }
        `
        };
        let requestBody2 = {
            query: `
            mutation {
              createUser(userInput: {email: "${email}", password: "${password}"}) {
                _id
                email
              }
            }
          `
        };

        let requestBody = this.state.isLogin ? requestBody1 : requestBody2;
        let responseData = await ApiRequest(requestBody);
        let { status } = responseData;
        if (status === 200) {
            let { data } = responseData.data;
            if (data.login.token) {
                let { token, userId, tokenExpiration } = data.login;
                this.context.login(
                    token, userId, tokenExpiration
                )
            }
        } else {
            console.log('failed')
        }
    };

    render() {
        return (
            <form className="auth-form" onSubmit={this.submitHandler}>
                <div className="form-control">
                    <label htmlFor="email">E-Mail</label>
                    <input type="email" id="email" name='email' value={this.state.email} onChange={this.onHandleChange} />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={this.state.password} name='password' onChange={this.onHandleChange} />
                </div>
                <div className="form-actions">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={this.switchModeHandler}>
                        Switch to {this.state.isLogin ? 'Signup' : 'Login'}
                    </button>
                </div>
            </form>
        );
    }
}