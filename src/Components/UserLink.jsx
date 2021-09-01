import { User } from "../Common/User.store";

import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

export const UserLink = observer( ({uiStore, history}) => {

   if(User.getToken() === undefined) {
       return (<Link to='/login'>Log in</Link>);
   } else {
       return (<button onClick={e => User.logOut()}>Log out</button>);
   }
})