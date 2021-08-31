import { action, makeObservable, observable } from "mobx";

class UserStore {

    token = undefined;

    constructor (){
        makeObservable(this, {
            token: observable,
            logIn: action,

        })
    }

    logIn() {
        return fetch('https://api.baasic.com/beta/car-store//login?options={options}', {
            method: 'POST',
            body: 'grant_type=password&username=car_store_admin&password=1waFcD6i',
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


}

export const User = new UserStore();