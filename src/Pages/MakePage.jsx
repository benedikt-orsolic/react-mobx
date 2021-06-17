import React from 'react';
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



export const MakePage = observer( (props) =>  {

    const {id} = props.match.params
    let thisMake = MakeStore.getMakeById(id).get();

    const WrappedModelInput = WrapWithUiStore(ModelInput, ModelInputStore);
    
    if( thisMake === undefined ) {
        return <Redirect to="/" />
    }

    return (
    <section className={styles.makeSection}>
        <h2>{MakeStore.list.map( (el) => {
                if( Number(el.id) === Number(id)) return el.name;
                return null;
        })}</h2>
        <WrappedModelInput makeId={id} />
        <ModelList makeId={id} />
        <input type="submit" value="Delete" onClick={() => MakeStore.deleteMake(id)} />
    </section>)
})