import { action, computed, makeObservable, observable } from "mobx";
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

        var makeObj = {name: name};

        fetch("https://api.baasic.com/beta/car-store/resources/MakeList", {
        method: 'POST',
        headers: {
            
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(makeObj)
        })
        .then(response => response.json())
        .then(json => console.log(json))
        .then(() => this.fetchMakeList())
        .catch(error => console.error(error));
    }

    deleteMake(id) {
        ModelStore.deleteWithMakeId(id);
        
        fetch("https://api.baasic.com/beta/car-store/resources/MakeList/" + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

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
        return this.makeList.find(item => item.id === id);
    
    }

    sort(order) {
        // TODO
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
        throw new Error('MakeStore: order is not recognised')

    }

}

export const MakeStore = new VehicleMakeList();