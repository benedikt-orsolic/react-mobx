import { action, computed, makeObservable, observable } from "mobx";

import { MakeStoreService } from './Services/MakeStore.services';

import { ModelStore } from './ModelStore';


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

        let response = await MakeStoreService.post( {'name': makeName} );
        await this.fetchMakeList();
        return response;
    }

    async deleteMake(id) {

        await ModelStore.deleteWithMakeId(id);
        await MakeStoreService.delete( id );
        this.fetchMakeList();
        
    }

    get getCount() {
        // TODO
        return 0;
    }

    async fetchMakeList(paramObject) {
        // This modifies observable without and action
        this.updateList(await MakeStoreService.get(paramObject));
    }

    // Since fetchMakeList is async it modifies list without action
    updateList(newList) {
        this.makeList = newList;
    }

    async updatedMake(id, requestBody) {
        if( this.autoUpdateTimeOut === undefined ) this.autoUpdateTimeOut = setTimeout(() => {this.fetchMakeList(); this.autoUpdateTimeOut=undefined}, 5000);
        return await MakeStoreService.update(id, requestBody);
    }


    async getMakeById (id) {

        return await MakeStoreService.get({
            id: id,
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