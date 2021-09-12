/**
 * getToken() returns undefined if user is not logged in crashes the page
 */


import { action, computed, makeObservable, observable } from "mobx";


/** Services */
import { UserService } from './User.service';




class UserStore {

    token = undefined;
    tokenTimeOut = undefined;

    constructor (){
        makeObservable(this, {
            token: observable,
            logIn: action,
            logOut: action,
            unsetTokenOnExpire: action,

            isLoggedIn: computed,
        })
    }

    async logIn(userName, password) {
        this.token = await UserService.getToken(userName, password);

        clearTimeout(this.tokenTimeOut);

        // Received time is 7200, for ms is too short so I assume it is in s which is about 2h
        this.tokenTimeOut = setTimeout(()=>{this.unsetTokenOnExpire()}, this.token.expires_in * 1000)
    }

    async logOut() {
        if( await UserService.rmTokenFromSystem(this.token.token_type, this.token.access_token) ) {
            this.token = undefined;
            clearTimeout(this.tokenTimeOut);
        }
    }

    get isLoggedIn() {
        return this.token !== undefined;
    }

    unsetTokenOnExpire() {
        this.token = undefined;
        window.msgService.addLog('Your session has expired, pleas log in')
    }

    getAuthHeader() {
        return (
            this.token === undefined ? 
            undefined : 
            this.token.token_type + ' ' + this.token.access_token
        )
    }


}

export const User = new UserStore();