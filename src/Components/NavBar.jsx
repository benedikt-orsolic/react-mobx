import React from 'react';
import { observer } from 'mobx-react';
import './MessageLog.css';
import './NavBar.css';



import { UserLink } from './UserLink';

import { Link } from 'react-router-dom';

export const NavBar = observer( ({uiStore}) => {

    return (
        <nav className="nav"><ul className="navLinkList">
            <li><Link to='/make-list' >Make List</Link></li>
            <li><UserLink /></li>
        </ul></nav>
    );
})