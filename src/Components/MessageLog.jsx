import React from 'react';
import { observer } from 'mobx-react';
import './MessageLog.css';

export const MessageLog = observer( ({uiStore}) => {

  const checkbox = (<input className="MsgListCheckBox" type="checkbox" checked={uiStore.isOpen} onChange={event => uiStore.handleChange(event)} />)

  const msgList = (<ul>
    {window.msgService.msgList.map(el => {
      if(el == null) return null;
      return(<li key={el.id}>
        {el.msg}
      </li>)
    })}
  </ul>)

  const forOpen = (<div className="MessageLog">
    {checkbox}
    {msgList}
  </div>)

  const forClosed = (
    <div className="MessageLog">
    {checkbox}
  </div>
)

  if(uiStore.isOpen){
    return forOpen;
  } else {
    return forClosed;
  }
})