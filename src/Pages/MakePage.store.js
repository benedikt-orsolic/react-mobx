import { makeObservable, observable, action } from 'mobx';
import { MakeStore } from '../Common/MakeStore';

export class MakePageStore {

    make = undefined;

    constructor() {
        makeObservable(this, {
            make: observable,

            internalSetMake: action,
        })
    }

    async getMakeById(id){
        if( this.make !== undefined ) return;
        this.internalSetMake(await MakeStore.getMakeById(id));
    }

    internalSetMake(make) {
        this.make = make;
    }

}