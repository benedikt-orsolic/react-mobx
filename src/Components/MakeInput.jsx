import React from 'react';
import { observer } from 'mobx-react';
import { MakeInputStore } from './MakeInput.store';

const makeInputStore = new MakeInputStore();

export const MakeInput = observer( (props) => {
  return (
    <form onSubmit={event => makeInputStore.handleSubmit(event)}>        
      <label>
        Make name:
        <input 
          type="text" 
          value={makeInputStore.getName} 
          onChange={event => makeInputStore.handleChange(event)}
        />        
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
})