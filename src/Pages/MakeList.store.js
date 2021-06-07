import { action, makeObservable, observable } from 'mobx';



export class MakeListStore {

    toggleList = [];

    constructor() {
        makeObservable(this, {
            toggleList: observable,
            changeToggle: action,
            initKey: action,    
        })
    }

    changeToggle(key) {
        this.toggleList[key] = !this.toggleList[key];
    }

    initKey(key) {
        while(this.toggleList.length <= key) {
            this.toggleList[this.toggleList.length] = false;
        }
    }
}
