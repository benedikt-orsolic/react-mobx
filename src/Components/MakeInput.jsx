import React from 'react';
import { observer } from 'mobx-react';

export const MakeInput = observer( ({uiStore}) => {
  return (
    <form onSubmit={event => uiStore.handleSubmit(event)}>        
      <label>
        Make name:
        <input 
          type="text" 
          value={uiStore.getName} 
          onChange={event => uiStore.handleChange(event)}
        />        
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
})