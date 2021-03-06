import axios from 'axios';

export const ApiRequest = async (requestObject) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(requestObject),
        url: 'http://localhost:8000/graphql',
    };
    let response = await axios(options);
    return response;
}

export const ApiRequestWithAuth = async (requestObject, token) => {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        data: JSON.stringify(requestObject),
        url: 'http://localhost:8000/graphql',
    };
    let response = await axios(options);
    return response;
}

