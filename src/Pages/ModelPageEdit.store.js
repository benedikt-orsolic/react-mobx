import { action, makeObservable, computed, observable } from 'mobx';
import { ModelStore } from '../Common/ModelStore';

export class ModelPageEditStore {

    model = undefined;
    syncStatus = '';
    timeOutVar = undefined;

    constructor(id){

        makeObservable(this, {
            model: observable,
            syncStatus: observable,

            internalSetModel: action,
            changeSyncStatus: action,
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
        this.internalSetModel(await ModelStore.getModelById(id));
    }

    internalSetModel(model) {
        this.model = model;
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

        this.internalHandelNameChange(newName);

        if(this.timeOutVar !== undefined) return;

        this.changeSyncStatus('Waiting for server to update');

        this.timeOutVar = setTimeout(async () => {
            
            let patchObj = {
                'name': this.model.name,
            }
            if(await ModelStore.updatedModel(this.model.id, patchObj)) this.changeSyncStatus('Evrything is up in the cloud');
            else this.changeSyncStatus('Something went wrong');

            this.timeOutVar = undefined;
        }, 1000)
    }

    changeSyncStatus(str) {
        this.syncStatus = str;
    }

    internalHandelNameChange(newName) {
        this.model.name = newName;
    }

    handelMakeIdChange(event){
        this.model.makeId = event.target.value;
    }

    useEffect() {
        return null;
    }

    destructor() {
        clearTimeout(this.timeOutVar);
        let patchObj = {
            'name': this.model.name,
        }
        ModelStore.updatedModel(this.model.id, patchObj)
    }
}
