import { action, computed, makeObservable, observable } from "mobx";

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

    addNewModel(makeId, name) {

        makeId = String(makeId);
        name = String(name);
        var modelObj = {
            'makeId': makeId,
            name: name
        };

        fetch("https://api.baasic.com/beta/car-store/resources/ModelList", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',

        },
        body: JSON.stringify(modelObj)
        })
        .then(() => this.fetchModelList())
        .catch(error => console.error(error));
    }

    async fetchModelList() {
        // This modifies observable without and action
        this.list = await fetch("https://api.baasic.com/beta/car-store/resources/ModelList?page=1&rpp=100", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
    
            }
        })
        .then(response => response.json())
        .then(json => json.item);
    }

    deleteModel(id) {
        ModelStore.deleteWithMakeId(id);
        
        fetch("https://api.baasic.com/beta/car-store/resources/ModelList/" + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
        })
        .then(() => this.fetchMakeList())
        .catch(error => console.error(error));
    }

    deleteWithMakeId(id) {
        console.log(id)
        this.fetchModelList()
        .then(()=>{
            for(let i = 0; i < this.list.length; ++i) {
                if(this.list[i] === undefined || String(this.list[i].makeId).localeCompare( String(id) ) !== 0 ) continue ;


                fetch("https://api.baasic.com/beta/car-store/resources/ModelList/" + this.list[i].id, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',

                    },
                }).catch(error => console.error(error));

               
            }
        })
        .then(() => this.fetchModelList())
        .catch(error => console.error(error));
    }

}

export const ModelStore = new VehicleModelList();