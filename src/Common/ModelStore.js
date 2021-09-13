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
            updateList: action,

            getTotalCountOfModels: computed,
        })

        this.fetchModelList();
    }

    get getTotalCountOfModels() {
        return this.list.length;
    }

    getModelById (id) {

        return computed( () => {
        for(let i = 0; i < this.list.length; i++) {
            if(String(this.list[i].id).localeCompare(String(id)) === 0) return this.list[i];
            continue;
        }
        return undefined;
        })

        // This was always return undefined for some reason
        //return computed(() => {return  this.list.find(el => {
        //    if(
        //        String(el.id)
        //        .localeCompare(String(id)) === 0) {
        //            return 1;
        //    } else {
        //        return 0;
        //    }
        //})}
        //);
    };

    async addNewModel(makeId, name) {

        makeId = String(makeId);
        name = String(name);
        var modelObj = {
            'makeId': makeId,
            name: name
        };
        let response = await ResourcesService.post( resourceName, modelObj );
        await this.fetchModelList();
        return response;
    }

    async fetchModelList() {
        // This modifies observable without and action
        this.updateList(await ResourcesService.get(resourceName));
    }

    // Since fetchMakeList is async it modifies list without action
    updateList(newList) {
        this.list = newList;
    }

    async updatedModel(id, requestBody) {
        return await ResourcesService.update(resourceName, id, requestBody);
    }

    async deleteModel(id) {

        await ResourcesService.delete( resourceName, id );
        this.fetchModelList();
    }

    async deleteWithMakeId(id) {

        /** This should be cared for on server side */
        if(!User.isLoggedIn) { return; }
        
        await this.fetchModelList();
        for(let i = 0; i < this.list.length; ++i) {
            if(this.list[i] === undefined || String(this.list[i].makeId).localeCompare( String(id) ) !== 0 ) continue ;
            await ResourcesService.delete( resourceName, id );
        }
    }

}

export const ModelStore = new VehicleModelList();