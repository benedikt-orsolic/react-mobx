import { action, makeObservable, observable } from 'mobx';

export class MessageLogStore {
    
    isOpen = false;

    constructor() {
        makeObservable(this, {
            isOpen: observable,
            handleChange: action,
        })
    }

    handleChange(event) {
        this.isOpen = event.target.checked;
        console.log(event.target.checked);
    }
}