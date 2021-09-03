import { action, makeObservable, observable } from 'mobx';

export class MessageService {
    
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
            addMsg: action,
            addLog: action,
            rmMsg: action,
        });
    }

    addMsg(msgStr) {
        this.msgList.push({
            id: this.msgList[this.msgList.length-1].id + 1,
            msg: msgStr,
        })
    }

    addLog(msg, timeout=15000) {
        
        let newLength = this.msgList.push({
            id: this.msgList[this.msgList.length-1].id + 1,
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