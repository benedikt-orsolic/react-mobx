import { makeObservable, observable, action } from 'mobx';
import { ModelStore } from '../Common/ModelStore';
import { MakeStore } from '../Common/MakeStore';

export class ModelPageStore {

    model = undefined;
    parentMake = undefined;

    constructor() {
        makeObservable(this, {
            model: observable,
            parentMake: observable,

            internalSetmodel: action,
            internalSetMake: action,
        })
    }

    async getModelById(id){
        if( this.model !== undefined ) return;
        this.internalSetmodel(await ModelStore.getModelById(id));
    }

    internalSetmodel(model) {
        this.model = model;
        this.getParentMake();
    }

    async getParentMake() {
        this.internalSetMake(await MakeStore.getMakeById(this.model.makeId));
    }
    
    internalSetMake(make){
        this.parentMake = make;
    }
}