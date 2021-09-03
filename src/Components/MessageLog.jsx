import React from 'react';
import { observer } from 'mobx-react';

export const MessageLog = observer( ({uiStore}) => {

  const checkbox = (<div>
    <p>{uiStore.isOpen}</p>
    <input type="checkbox" checked={uiStore.isOpen} onChange={event => uiStore.handleChange(event)} />
  </div>)

  if(uiStore.isOpen){
    return (
      <div>
        {checkbox}
        <ul>
          {window.msgService.msgList.map(el => {
            if(el == null) return null;
            return(<li key={el.id}>
              {el.msg}
            </li>)
          })}
        </ul>
      </div>
    );
  } else {
    return checkbox;
  }
})