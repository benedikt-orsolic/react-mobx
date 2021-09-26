import { action, computed, makeObservable, observable } from "mobx";

import { ResourcesService } from "./Resources.service";

import { ModelStore } from './ModelStore';



const resourceName = 'MakeList';

class VehicleMakeList {

    makeList = [];
    autoUpdateTimeOut = undefined;

    constructor() {
        makeObservable(this, {
            makeList: observable,
            fetchMakeList: action,
            addMake: action,
            deleteMake: action,
            sort: action,
            updateList: action,

            getCount: computed,
        })

        this.fetchMakeList();
    }

    async addMake(makeName) {

        let response = await ResourcesService.post( resourceName, {'name': makeName} );
        await this.fetchMakeList();
        return response;
    }

    async deleteMake(id) {

        await ModelStore.deleteWithMakeId(id);
        await ResourcesService.delete( resourceName, id );
        this.fetchMakeList();
        
    }

    get getCount() {
        // TODO
        return 0;
    }

    async fetchMakeList(paramObject) {

        let internalParamObject = {
            resourceName: resourceName,
        }

        Object.assign(internalParamObject, paramObject)
        // This modifies observable without and action
        this.updateList(await ResourcesService.get(internalParamObject));
    }

    // Since fetchMakeList is async it modifies list without action
    updateList(newList) {
        this.makeList = newList;
    }

    async updatedMake(id, requestBody) {
        if( this.autoUpdateTimeOut === undefined ) this.autoUpdateTimeOut = setTimeout(() => {this.fetchMakeList(); this.autoUpdateTimeOut=undefined}, 5000);
        return await ResourcesService.update(resourceName, id, requestBody);
    }


    async getMakeById (id) {

        return await ResourcesService.get({
            id: id,
            resourceName: resourceName,
        });
    }

    sort(order) {
        if(order === 'ascending') {
            this.fetchMakeList({sortBy: 'name', sortOrder: 'asc'});
        }
        if(order === 'descending') {
            this.fetchMakeList({sortBy: 'name', sortOrder: 'desc'});
        }
    }

}

export const MakeStore = new VehicleMakeList();