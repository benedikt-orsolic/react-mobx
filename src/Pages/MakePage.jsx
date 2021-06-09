import React from 'react';

/** Components  */
import { ModelList } from '../Components/ModelList';
import { ModelInput } from '../Components/ModelInput';

/** Mobx stores */
import { MakeStore } from '../Common/MakeStore';

/** Styles */
import styles from './VehicleMake.module.css';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router';



export const MakePage = observer( (props) =>  {

    const {id} = props.match.params
    let thisMake = MakeStore.getMakeById(id).get();
    
    if( thisMake === undefined ) {
        return <Redirect to="/" />
    }

    return (
    <section className={styles.makeSection}>
        <h2>{MakeStore.list.map( (el) => {
                if( Number(el.id) === Number(id)) return el.name;
                return null;
        })}</h2>
        <ModelInput makeId={id} />
        <ModelList makeId={id} />
        <input type="submit" value="Delete" onClick={() => MakeStore.deleteMake(id)} />
    </section>)
})