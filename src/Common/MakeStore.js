import { action, computed, makeObservable, observable } from "mobx";
import { ModelStore } from './ModelStore';

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
            deleteMake: action,
            sort: action,
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

    deleteMake(id) {
        ModelStore.deleteWithMakeId(id);
        
        let i = this.list.findIndex(el => Number(el.id) === Number(id));
        this.list.splice(i, 1);
    }

    get getCount() {
        return this.list.length;
    }

    getMakeById (id) {
        return computed(() => {return  this.list.find(el => Number(el.id) === Number(id))});
    };

    sort(order) {

        if(order === 'ascending') {
            this.list.sort((a, b) => {
                return b.name.localeCompare(a.name);
            });
            return;
        }
        if(order === 'descending') {
            this.list.sort((a, b) => {
                return a.name.localeCompare(b.name);
            });
            return;
        }
        throw new Error('MakeStore: order is not recognised')

    }

}

export const MakeStore = new VehicleMakeList();