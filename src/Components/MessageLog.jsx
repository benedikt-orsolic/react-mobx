import React from 'react';
import { observer } from 'mobx-react';

export const MessageLog = observer( ({uiStore}) => {

  return (
    <ul>
      {uiStore.msgList.map(el => {
        return(<li key={el.id}>
          {el.msg}
        </li>)
      })}
    </ul>
  );
})