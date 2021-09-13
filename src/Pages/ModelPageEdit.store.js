import { action, makeObservable, computed, observable } from 'mobx';
import { ModelStore } from '../Common/ModelStore';

export class ModelPageEditStore {

    model = undefined;

    constructor(id){

        makeObservable(this, {
            model: observable,

            internalSetModel: action,
            internalHandelNameChange: action,
            handelMakeIdChange: action,

            getName: computed,
            getMakeId: computed,

        });
    }

    async setModelId(makeId, id) {
        if( this.model !== undefined ) return;

        if(id === 'undefined') {
            let newModel = await ModelStore.addNewModel(makeId, 'Unnamed model');
            id = newModel.id;
        }
        this.internalSetModel(id);
    }

    internalSetModel(id) {
        this.model = ModelStore.getModelById(id).get();
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


    async handleNameChange(event){

        let newName = event.target.value

        let patchObj = {
            'name': String(newName)
        }

        if (await ModelStore.updatedModel(this.model.id, patchObj)) this.internalHandelNameChange(newName);
    }

    internalHandelNameChange(newName) {
        this.model.name = newName;
    }

    handelMakeIdChange(event){
        this.model.makeId = event.target.value;
    }
}
