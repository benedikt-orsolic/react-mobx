import { action, makeObservable, computed } from 'mobx';
import { MakeStore } from '../Common/MakeStore';



export class MakePageEditStore {

    id = -1;

    model = undefined;

    constructor(){

        makeObservable(this, {
            handleNameChange: action,
            setName: action,
            setMakeId: action,
            getName: computed,

        });
    }

    setMakeId(id) {
        this.id = id;
        this.make = MakeStore.getMakeById(id).get();
    }

    get getName(){
        return this.make.name;
    }

    setName(name){
        this.make.name = name;
    }


    handleNameChange(event){
        this.make.name = event.target.value;
    }
}
