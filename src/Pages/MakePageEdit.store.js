import { action, makeObservable, computed, observable } from 'mobx';
import { MakeStore } from '../Common/MakeStore';

export class MakePageEditStore {

    make = undefined;

    constructor(){

        makeObservable(this, {
            make: observable,
            
            internalHandelNameChange: action,
            setName: action,
            internalSetMake: action,
            getName: computed,

        });
    }

    async setMakeId(id) {

        if(this.make !== undefined) return;

        if( id === 'undefined') {
            this.internalSetMake(await MakeStore.addMake('Unamed make'));
            return;
        }

        this.internalSetMake(MakeStore.getMakeById(id).get());
    }

    // async function can not be mobx action
    internalSetMake(make) {
        this.make = make;
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
        
        if (await MakeStore.updatedMake(this.make.id, requestBody)) this.internalHandelNameChange(newName);
    }

    internalHandelNameChange(newName) {
        this.make.name = newName
    }
}
