import { User } from "../Common/User.store";

import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

export const UserLink = observer( ({uiStore, history}) => {

   if(!User.isLoggedIn()) {
       return (<Link to='/login'>Log in</Link>);
   } else {
       // Use a to match the rest of nav items
       return (<a onClick={e => User.logOut()} href="/">Log out</a>);
   }
})