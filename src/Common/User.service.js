/** Constants */
import {
    baseURL,
    apiKey
} from './Constants';




class UserServiceClass {

    async getToken(userName, password) {
        const response = await fetch(baseURL + apiKey + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=password&username=' + userName + '&password=' + password,
        })
        const token = await response.json();

        return token;
    }

    async rmTokenFromSystem(token_type, token) {
        
        const response = await fetch('https://api.baasic.com/beta/car-store/login', {
            method: 'DELETE',
            headers: {
                'Authorization': this.getAuthHeader(),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({
                token_type: token_type,
                token: token,
            }),
        });

        return response.status === 204;
    }
}

export const UserService = new UserServiceClass();