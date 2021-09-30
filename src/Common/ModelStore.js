import { action, computed, makeObservable, observable } from "mobx";
import { User } from './User.store';

/** Services */
import { ModelStoreService } from './Services/ModelStore.service';




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

    async getModelById (id) {

        return await ModelStoreService.get({
            id: id,
        });

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
        let response = await ModelStoreService.post( modelObj );
        await this.fetchModelList();
        return response;
    }

    async fetchModelList() {
        // This modifies observable without and action
        this.updateList(await ModelStoreService.get());
    }

    // Since fetchMakeList is async it modifies list without action
    updateList(newList) {
        this.list = newList;
    }

    async updatedModel(id, requestBody) {
        return await ModelStoreService.update(id, requestBody);
    }

    async deleteModel(id) {

        await ModelStoreService.delete( id );
        this.fetchModelList();
    }

    async deleteWithMakeId(id) {

        /** This should be cared for on server side */
        if(!User.isLoggedIn) { return; }
        
        await this.fetchModelList();
        for(let i = 0; i < this.list.length; ++i) {
            if(this.list[i] === undefined || String(this.list[i].makeId).localeCompare( String(id) ) !== 0 ) continue ;
            await ModelStoreService.delete( id );
        }
    }

}

export const ModelStore = new VehicleModelList();