/** Constants */
import {
    baseURL,
    apiKey
} from '../Constants';



const errorLocation = ' At UserService.';
class UserServiceClass {

    async getToken(userName, password) {
        
        let response = undefined;
        try{
            response = await fetch(baseURL + apiKey + 'login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'grant_type=password&username=' + userName + '&password=' + password,
            })
        } catch(error) {
            console.error(error + errorLocation);
            window.msgService.addLog('There was a network error!');
            return;
        }

        return await response.json();
    }

    async rmTokenFromSystem(token_type, token) {
        
        let response = undefined;
        try{
            response = await fetch('https://api.baasic.com/beta/car-store/login', {
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
        } catch(error) {
            console.error(error + errorLocation);
            window.msgService.addLog('There was a network error!');
            return false;
        }

        return response.status === 204;
    }
}

export const UserService = new UserServiceClass();