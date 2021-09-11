import { action, computed, makeObservable, observable } from "mobx";
import { User } from './User.store';

/** Services */
import { ResourcesService } from "./Resources.service";



const resourceName = 'ModelList';
class VehicleModelList {
    
    list = [];

    constructor() {
        makeObservable(this, {
            list: observable,
            fetchModelList: action,
            addNewModel: action,
            deleteModel: action,
            getTotalCountOfModels: computed,
        })

        this.fetchModelList();
    }

    get getTotalCountOfModels() {
        return this.list.length;
    }

    getModelById (id) {

        return computed(() => {return  this.list.find(el => {
            if(
                String(el.id)
                .localeCompare(String(id)) === 0) {
                    return 1;
            } else {
                return 0;
            }
        })}
        );
    };

    async addNewModel(makeId, name) {

        makeId = String(makeId);
        name = String(name);
        var modelObj = {
            'makeId': makeId,
            name: name
        };

        await ResourcesService.post( resourceName, modelObj );
        this.fetchModelList();
    }

    async fetchModelList() {
        // This modifies observable without and action
        this.list = await ResourcesService.get(resourceName);
    }

    async deleteModel(id) {

        await ResourcesService.delete( resourceName, id );
        this.fetchModelList();
    }

    async deleteWithMakeId(id) {

        /** This should be cared for on server side */
        if(!User.isLoggedIn()) { return; }
        
        await this.fetchModelList();
        for(let i = 0; i < this.list.length; ++i) {
            if(this.list[i] === undefined || String(this.list[i].makeId).localeCompare( String(id) ) !== 0 ) continue ;
            await ResourcesService.delete( resourceName, id );
        }
    }

}

export const ModelStore = new VehicleModelList();