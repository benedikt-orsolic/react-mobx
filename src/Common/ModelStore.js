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
            deleteModel: action,
            getTotalCountOfModels: computed,
        })
    }

    get getTotalCountOfModels() {
        return this.list.length;
    }

    getModelById (id) {
        return computed(() => {return  this.list.find(el => Number(el.id) === Number(id))});
    };

    addNewModel(makeId, name) {
        this.list.push({
            id: this.list[this.list.length -1].id + 1,
            makeId: makeId,
            name: name,
        })
    }

    deleteModel(id) {
        let i = this.list.findIndex(el => Number(el.id) === Number(id));
        this.list.splice(i, 1);
    }

    deleteWithMakeId(id) {
        let i = 0;
        while(1) {
            if(this.list[i] === undefined || i >= this.list.length ) return;
            if( Number(this.list[i].makeId) === Number(id)){
                this.list.splice(i, 1);
            } else {
                /** Increment only if we don't remove element from array
                 *  If we do i+1 moves down by one
                 */
                i++;
            }
        }
    }

}

export const ModelStore = new VehicleModelList();