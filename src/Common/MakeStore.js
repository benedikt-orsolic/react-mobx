import { action, computed, makeObservable, observable } from "mobx";

class VehicleMakeList {

    list = [
        { id: 1, name: 'Jaguar', abr: 'Jaguar' },
        { id: 2, name: 'Renault', abr: 'Renault' },
        { id: 3, name: 'BMW', abr:'BMW' },
    ];

    constructor() {
        makeObservable(this, {
            list: observable,
            addMake: action,
            getCount: computed,
        })
    }

    addMake(name, abr) {
        this.list.push({
            id: this.list[this.list.length - 1].id + 1,
            name: name,
            abr: abr,
        })
    }

    get getCount() {
        return this.list.length;
    }
}

export const MakeStore = new VehicleMakeList();