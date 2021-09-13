import React from 'react';

import { Link } from 'react-router-dom';

/** Components  */
import { ModelList } from '../Components/ModelList';

/** Mobx stores */
import { MakeStore } from '../Common/MakeStore';

/** Styles */
import styles from './VehicleMake.module.css';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router';



export const MakePage = observer( ({history, match}) =>  {

    let id = match.params.id;
    let thisMake = MakeStore.getMakeById(id).get();
    
    if( thisMake === undefined ) {
        return <Redirect to="/" />
    }

    return (
    <section className={styles.makeSection}>
        <h2>{thisMake.name}</h2>
        <Link to={'/model/edit/' +  thisMake.id +'/undefined'} >Add new model</Link>
        <ModelList makeId={id} />
        <input type="submit" value="Delete" onClick={() => {
            MakeStore.deleteMake(id);
            history.push('/');
        }} />
        <Link to={"/make/edit/" + id} >Edit</Link>
    </section>)
})