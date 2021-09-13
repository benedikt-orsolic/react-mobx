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


    async handleNameChange(event){

        let newName = event.target.value

        let requestBody = {
            'name': String(newName)
        }
        
        if (await MakeStore.updatedMake(this.id, requestBody)) this.make.name = newName;
    }
}
