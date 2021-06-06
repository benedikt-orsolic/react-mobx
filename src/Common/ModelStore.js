import { action, computed, makeObservable, observable } from "mobx";

class VehicleModelList {

    list = [
        { id: 1, makeId: 1, name: 'F-Type' },
        { id: 2, makeId: 2, name: 'Clio' },
        { id: 3, makeId: 2, name: 'Twingo' },
        { id: 5, makeId: 2, name: 'Megan' },
        { id: 6, makeId: 3, name: 'X3' },
        { id: 7, makeId: 3, name: 'Z4' },
    ];

    constructor() {
        makeObservable(this, {
            list: observable,
            addNewModel: action,
            getTotalCountOfModels: computed,
        })
    }

    addNewModel(makeId, name) {
        this.list.push({
            id: this.list.length,
            makeId: makeId,
            name: name,
        })
    }

    get getTotalCountOfModels() {
        return this.list.length;
    }

}

export const ModelStore = new VehicleModelList();