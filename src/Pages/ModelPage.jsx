import React from 'react';

/** Mobx stores */
import { MakeStore } from '../Common/MakeStore';
import { ModelStore } from '../Common/ModelStore';

/** Styles */
import styles from './VehicleMake.module.css';



export function ModelPage(props) {

    
    const {id} = props.match.params;
    
    let thisModel = ModelStore.list.find(el=>Number(el.id) === Number(id));
    if(thisModel === undefined) {
        throw new Error('undefined in ModelPage.jsx');
    }

    let thisModelMake = MakeStore.list.find(el=>Number(el.id) === Number(thisModel.makeId));
    if(thisModelMake === undefined) {
        throw new Error('undefined in ModelPage.jsx');
    }
    return(<section className={styles.makeSection}>
        <h2>{thisModel.name}</h2>
        <section>
            <h3>Description</h3>
            <p>This model is made by {thisModelMake.name}</p>
        </section>
    </section>);
}