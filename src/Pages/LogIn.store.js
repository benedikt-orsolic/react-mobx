import { action, computed, makeObservable, observable } from 'mobx';

import { User } from '../Common/User.store';

export class LoginStore {
    
    userName = '';
    password = '';

    constructor(){
        makeObservable(this, {
            userName: observable,
            password: observable,
            handleUserNameChange: action,
            handlePwdChange: action,
            handleSubmit: action,
            getName: computed,
            getPwd: computed,

        });
    }

    get getName(){
        return this.userName;
    }

    get getPwd() {
        return this.password;
    }

    handleUserNameChange(event) {
        this.userName = event.target.value;
    }

    handlePwdChange(event) {    
        this.password = event.target.value;
    }

    handleSubmit(event) {
        User.logIn(this.userName, this.password);
        event.preventDefault();
    }
}