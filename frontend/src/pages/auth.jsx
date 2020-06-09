import React from 'react';
import { ApiRequest } from '../functions';
import './auth.css'

export default class AuthSection extends React.Component {
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
        console.log(responseData);

        // fetch('http://localhost:8000/graphql', {
        //     method: 'POST',
        //     body: JSON.stringify(requestBody),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        //     .then(res => {
        //         if (res.status !== 200 && res.status !== 201) {
        //             throw new Error('Failed!');
        //         }
        //         return res.json();
        //     })
        //     .then(resData => {
        //         console.log(resData);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
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