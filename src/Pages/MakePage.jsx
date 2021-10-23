import React from 'react';

import { Link } from 'react-router-dom';

/** Components  */
import { ModelList } from '../Components/ModelList';

/** Mobx stores */
import { MakeStore } from '../Common/MakeStore';

/** Styles */
import styles from './VehicleMake.module.css';
import { observer } from 'mobx-react';



export const MakePage = observer( ({history, match, PageStore}) =>  {

    let id = match.params.id;
    PageStore.getMakeById(id);

    if(PageStore.make === undefined) {
        return (<p>We are waiting for your make to arive</p>)
    }

    return (
    <section className={styles.makeSection}>
        <h2>{PageStore.make.name}</h2>
        {window.user.isLoggedIn ? 
            <div><Link to={'/model/edit/' +  PageStore.make.id +'/undefined'} >Add new model</Link><br /> <hr /> </div> :
            null}
        <ModelList makeId={id} />
        

        {window.user.isLoggedIn ? 
            <div>
                <input type="submit" value="Delete" onClick={() => {
                    MakeStore.deleteMake(id);
                    history.push('/');
                }} />
                <Link to={"/make/edit/" + id} >Edit</Link>
            </div> :
            null}
    </section>)
})