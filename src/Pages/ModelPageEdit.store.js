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
        this.model.name = event.target.value;
    }

    handelMakeIdChange(event){
        this.model.makeId = event.target.value;
    }
}
