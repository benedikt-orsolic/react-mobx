import { action, makeObservable, observable } from 'mobx';

export class MessageService {

    static lastId = 10;
    
    msgList = [{
        id: 0,
        msg: 'Error',
    },
    {
        id: 1,
        msg: 'Log',
    }];

    listenerList = [];

    constructor(){
        makeObservable(this, {
            msgList: observable,
            addLog: action,
            rmMsg: action,
        });
    }

    addLog(msg, timeout=15000) {
        
        let newLength = this.msgList.push({
            id: MessageService.lastId++,
            msg: msg,
        });
        
        window.setTimeout(
            () => this.rmMsg(newLength-1), 
            timeout
        );
    }

    rmMsg(id) {
        let msgIndex = this.msgList.findIndex(el => el.id===id);

        this.msgList = 
            this.msgList.slice(0, msgIndex)
            .concat(this.msgList.slice(msgIndex+1, this.msgList.length));
    }
}