import { action, makeObservable, computed, observable } from 'mobx';
import { MakeStore } from '../Common/MakeStore';

export class MakePageEditStore {

    make = undefined;
    syncStatus = '';
    timeOutVar = undefined;

    constructor(){

        makeObservable(this, {
            make: observable,
            syncStatus: observable,
            
            internalHandelNameChange: action,
            changeSyncStatus: action,
            setName: action,
            internalSetMake: action,
            getName: computed,

        });
    }

    async setMakeId(id) {

        if(this.make !== undefined) return;

        if( id === 'undefined') {
            let newMake = await MakeStore.addMake('Unamed make')
            id = newMake.id;
        }

        this.internalSetMake(await MakeStore.getMakeById(id));
    }

    // async function can not be mobx action
    internalSetMake(make) {
        this.make = make;
    }

    get getName(){
        return this.make.name;
    }

    setName(name){
        this.make.name = name;
    }


    async handleNameChange(event){

        let newName = event.target.value;
        this.internalHandelNameChange(newName);
        if(this.timeOutVar !== undefined) return;

        this.changeSyncStatus('Waiting for server to update');

        this.timeOutVar = setTimeout(async () => {
            
            let requestBody = {
                'name': this.make.name,
            }

            if(await MakeStore.updatedMake(this.make.id, requestBody)) this.changeSyncStatus('Evrything is up in the cloud');
            else this.changeSyncStatus('Something went wrong');

            this.timeOutVar = undefined;
        }, 1000)

    }

    changeSyncStatus(str) {
        this.syncStatus = str;
    }

    internalHandelNameChange(newName) {
        this.make.name = newName
    }
}
