import { action, computed, makeObservable, observable } from 'mobx';
import { ModelStore } from '../Common/ModelStore';



export class ModelInputStore {

    name = '';
    makeId = -1;

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

    setMakeId(makeId){
        this.makeId = makeId;
    }

    handleChange(event) {    
        this.name = event.target.value;  
    }

    handleSubmit(event) {
        ModelStore.addNewModel(this.makeId, this.name);
        this.name = '';
        this.makeId = -1;
        event.preventDefault();
    }

}
