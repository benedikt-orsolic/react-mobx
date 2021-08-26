import { action, makeObservable, observable } from 'mobx';

export class MessageLogStore {
    
    msgList = [{
        id: 0,
        msg: 'Error',
    },
    {
        id: 1,
        msg: 'Log',
    }];

    constructor(){
        makeObservable(this, {
            msgList: observable,
            addMsg: action,
        });
    }

    addMsg(msgStr) {
        this.msgList.push({
            id: this.msgList[this.msgList.length-1].id + 1,
            msg: msgStr,
        })
    }
}