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
        <Link to={'/model/edit/' +  PageStore.make.id +'/undefined'} >Add new model</Link>
        <ModelList makeId={id} />
        <input type="submit" value="Delete" onClick={() => {
            MakeStore.deleteMake(id);
            history.push('/');
        }} />
        <Link to={"/make/edit/" + id} >Edit</Link>
    </section>)
})