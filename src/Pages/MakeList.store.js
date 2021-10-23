import { action, makeObservable, observable } from 'mobx';

/** Mobx stores */
import { MakeStore } from '../Common/MakeStore';

import { ModelStore } from '../Common/ModelStore';

export class MakeListStore {

    toggleList = [];
    component

    constructor() {

        makeObservable(this, {
            toggleList: observable,
            changeToggle: action,
            initKey: action,    
        })

        // Component did mount
        MakeStore.fetchMakeList();
        ModelStore.fetchModelList();
    }

    changeToggle(key) {
        this.toggleList[key] = !this.toggleList[key];
    }

    initKey(key) {
        while(this.toggleList.length <= key) {
            this.toggleList[this.toggleList.length] = false;
        }
    }

    useEffect() {
    }

    destructor() {
        return null;
    }
}
