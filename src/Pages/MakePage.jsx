import React from 'react';

/** Components  */
import { ModelList } from '../Components/ModelList';
import { ModelInput } from '../Components/ModelInput';

/** Mobx stores */
import { MakeStore } from '../Common/MakeStore';

/** Styles */
import styles from './VehicleMake.module.css';



export function MakePage(props) {

    
    const {id} = props.match.params

    return (
    <section className={styles.makeSection}>
        <h2>{MakeStore.list.map( (el) => {
                if( Number(el.id) === Number(id)) return el.name;
                return null;
        })}</h2>
        <ModelInput makeId={id} />
        <ModelList makeId={id} />
    </section>)
}