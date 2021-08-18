import { action, makeObservable, computed } from 'mobx';
import { ModelStore } from '../Common/ModelStore';



export class ModelPageEditStore {

    id = -1;

    model = undefined;

    constructor(id){

        makeObservable(this, {
            setModelId: action,
            handleNameChange: action,
            handelMakeIdChange: action,
            getName: computed,
            getMakeId: computed,

        });
    }

    setModelId(id) {
        this.id = id;
        this.model = ModelStore.getModelById(id).get();
        console.log(this.model.name)
    }

    get getName(){
        return this.model.name;
    }

    get getMakeId() {
        return this.model.makeId;
    }

    setMakeId(makeId){
        this.model.makeId = makeId;
    }

    setName(name){
        this.model.name = name;
    }


    handleNameChange(event){

        let newName = event.target.value

        let patchObj = {
            'name': String(newName)
        }

        fetch("https://api.baasic.com/beta/car-store/resources/ModelList/" + this.id, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(patchObj)
        })
        .then(() => this.model.name = newName)
        .catch(error => console.error(error));
    }

    handelMakeIdChange(event){
        this.model.makeId = event.target.value;
    }
}
