import React from 'react';

import { Link } from 'react-router-dom';
import { WrapWithUiStore } from '../HOC/WrapWithUiStore.HOC';

/** Components  */
import { ModelList } from '../Components/ModelList';
import { ModelInput } from '../Components/ModelInput';
import { ModelInputStore } from '../Components/ModelInput.store';

/** Mobx stores */
import { MakeStore } from '../Common/MakeStore';

/** Styles */
import styles from './VehicleMake.module.css';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router';



export const MakePage = observer( ({history, match}) =>  {

    let id = match.params.id;
    let thisMake = MakeStore.getMakeById(id);

    const WrappedModelInput = WrapWithUiStore(ModelInput, ModelInputStore);
    
    if( thisMake === undefined ) {
        return <Redirect to="/" />
    }

    return (
    <section className={styles.makeSection}>
        <h2>{thisMake.name}</h2>
        <WrappedModelInput makeId={id} />
        <ModelList makeId={id} />
        <input type="submit" value="Delete" onClick={() => {
            MakeStore.deleteMake(id);
            history.push('/');
        }} />
        <Link to={"/make/edit/" + id} >Edit</Link>
    </section>)
})