import React from 'react';
import { observer } from 'mobx-react';
import { User } from '../Common/User.store';

export const Login = observer( ({uiStore, history}) => {

  if(User.isLoggedIn) {
    // ERROR Cannot update during an existing state transition 
    history.push('/');
    return null;
  }
  return (
    <form onSubmit={event => uiStore.handleSubmit(event)}>        
      <label>
        UserName:
        <input 
          type="text" 
          value={uiStore.getName} 
          onChange={event => uiStore.handleUserNameChange(event)}
        />        
      </label>
      <label>
        Password:
        <input 
          type="password" 
          value={uiStore.getPwd} 
          onChange={event => uiStore.handlePwdChange(event)}
        />        
      </label>
      <input type="submit" value="Log in" />
    </form>
  );
})