import { action, computed, makeObservable, observable } from "mobx";

import { User } from './User.store';
import { ModelStore } from './ModelStore';

class VehicleMakeList {

    makeList = [];

    constructor() {
        makeObservable(this, {
            makeList: observable,
            fetchMakeList: action,
            addMake: action,
            deleteMake: action,
            sort: action,
            getCount: computed,
        })

        this.fetchMakeList();
    }

    addMake(name) {

        if(!User.isLoggedIn()) { return; }

        fetch("https://api.baasic.com/beta/car-store/resources/MakeList", {
        method: 'POST',
        headers: {
            'Authorization': User.getAuthHeader(),
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'name=' + name,
        })
        .then(() => this.fetchMakeList())
        .catch(error => console.error(error));
    }

    deleteMake(id) {

        if(!User.isLoggedIn()) { return; }

        ModelStore.deleteWithMakeId(id);
        
        fetch("https://api.baasic.com/beta/car-store/resources/MakeList/" + id, {
            method: 'DELETE',
            headers: {
                'Authorization': User.getAuthHeader(),
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
        .then(() => this.fetchMakeList())
        .catch(error => console.error(error));
    }

    get getCount() {
        // TODO
        return 0;
    }

    async fetchMakeList() {
        // This modifies observable without and action
        this.makeList = await fetch("https://api.baasic.com/beta/car-store/resources/MakeList?page=1&rpp=100", {
            method: 'GET',
            headers: {
                
                'Accept': 'application/json',
                'Content-Type': 'application/json',
    
            }
        })
        .then(response => response.json())
        .then(json => json.item);
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
            this.makeList.sort((a, b) => {
                return b.name.localeCompare(a.name);
            });
            return;
        }
        if(order === 'descending') {
            this.makeList.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
            return;
        }
        throw new Error('MakeStore: order is not recognized')

    }

}

export const MakeStore = new VehicleMakeList();