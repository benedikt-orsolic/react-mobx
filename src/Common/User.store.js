/**
 * getToken() returns undefined if user is not logged in crashes the page
 */


import { action, makeObservable, observable } from "mobx";

class UserStore {

    token = undefined;

    constructor (){
        makeObservable(this, {
            token: observable,
            logIn: action,

        })
    }

    logIn(userName, password) {
        return fetch('https://api.baasic.com/beta/car-store//login?options={options}', {
            method: 'POST',
            body: 'grant_type=password&username=' + userName + '&password=' + password,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
        .then(response => response.json())
        .then(data => this.token = data)
    }

    getToken() {
        if(this.token === undefined) {
            console.log('you are not logged in')
        }
        return this.token;
    }

    getAuthHeader() {
        return this.token.token_type + ' ' + User.token.access_token
    }


}

export const User = new UserStore();