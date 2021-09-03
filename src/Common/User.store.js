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
            logOut: action,
        })
    }

    isLoggedIn() {
        if(this.token !== undefined) return true;

        window.msgService.addLog('You are not logged in')
        return false;
    }

    logIn(userName, password) {
        return fetch('https://api.baasic.com/beta/car-store/login?options={options}', {
            method: 'POST',
            body: 'grant_type=password&username=' + userName + '&password=' + password,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
        .then(response => response.json())
        .then(data => this.token = data)
    }

    logOut() {
        fetch('https://api.baasic.com/beta/car-store/login', {
            method: 'DELETE',
            body: JSON.stringify({
                token_type: this.token.token_type,
                token: this.token.access_token,
            }),
            headers: {
                'Authorization': this.getAuthHeader(),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
        .then(()=>this.token = undefined)
    }

    getToken() {
        if(this.isLoggedIn())  return this.token;
        return undefined;
    }

    getAuthHeader() {
        return this.token.token_type + ' ' + User.token.access_token
    }


}

export const User = new UserStore();