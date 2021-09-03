import { action, makeObservable, computed } from 'mobx';
import { MakeStore } from '../Common/MakeStore';

import { User } from '../Common/User.store';


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

        if(!User.isLoggedIn()) { return; }

        let newName = event.target.value

        let patchObj = {
            'name': String(newName)
        }

        fetch("https://api.baasic.com/beta/car-store/resources/MakeList/" + this.id, {
            method: 'PATCH',
            headers: {
                'Authorization': User.getAuthHeader(),
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(patchObj)
        })
        .then(() => this.make.name = newName)
        .catch(error => console.error(error));
    }
}
