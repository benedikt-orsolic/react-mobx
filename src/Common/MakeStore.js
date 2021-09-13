import { action, computed, makeObservable, observable } from "mobx";

import { ResourcesService } from "./Resources.service";

import { ModelStore } from './ModelStore';



const resourceName = 'MakeList';

class VehicleMakeList {

    makeList = [];

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

    async fetchMakeList(sortOrder='desc', pageNumber=1, itemsPerPage=25, sortBy='name') {
        // This modifies observable without and action
        this.updateList(await ResourcesService.get(resourceName, pageNumber, itemsPerPage, sortBy, sortOrder));
    }

    // Since fetchMakeList is async it modifies list without action
    updateList(newList) {
        this.makeList = newList;
    }

    async updatedMake(id, requestBody) {
        return await ResourcesService.update(resourceName, id, requestBody);
    }


    getMakeById (id) {
        return computed(() => {return  this.makeList.find(el => {
            if(
                String(el.id)
                .localeCompare(String(id)) === 0) {
                    return 1;
            } else {
                return 0;
            }
        })}
        );
    
    }

    sort(order) {
        if(order === 'ascending') {
            this.fetchMakeList('asc');
        }
        if(order === 'descending') {
            this.fetchMakeList('desc');
        }
    }

}

export const MakeStore = new VehicleMakeList();