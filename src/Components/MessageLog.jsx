import React from 'react';
import { observer } from 'mobx-react';
import './MessageLog.css';

export const MessageLog = observer( ({uiStore}) => {

  const toggleButton = (<p className="MsgListCheckBox" onClick={event => uiStore.handleChange(event)}>{window.msgService.isOpen ? 'Hide messages' : 'Show messages'}</p>)

  const msgList = (<ul className="msgList">
    {window.msgService.msgList.map((el, index) => {
      if(el == null) return null;
      return(<li key={index}>
        <button onClick={() => window.msgService.rmMsg(el.id)}>X</button>
        {el.msg}
      </li>)
    })}
  </ul>)

  const forOpen = (<div className="MessageLog">
    {toggleButton}
    {msgList}
  </div>)

  const forClosed = (
    <div className="MessageLog">
    {toggleButton}
  </div>
)

  if(uiStore.isOpen){
    return forOpen;
  } else {
    return forClosed;
  }
})