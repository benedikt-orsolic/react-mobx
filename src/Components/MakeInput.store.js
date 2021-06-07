import { action, computed, makeObservable, observable } from 'mobx';
import { MakeStore } from '../Common/MakeStore';

export class MakeInputStore {
    
    name = '';

    constructor(){
        makeObservable(this, {
            name: observable,
            handleChange: action,
            handleSubmit: action,
            getName: computed,

        });
    }

    get getName(){
        return this.name;
    }

    handleChange(event) {    
        this.name = event.target.value;
    }

    handleSubmit(event) {
        MakeStore.addMake(this.name, '');
        this.name = '';
        event.preventDefault();
    }
}