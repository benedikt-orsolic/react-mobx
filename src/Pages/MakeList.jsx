import React from 'react';
import { observer, } from 'mobx-react';
import { Link } from 'react-router-dom';

/** Components */
import { MakeInput } from '../Components/MakeInput';
import { ModelList } from '../Components/ModelList';

/** Mobx stores */
import { MakeStore } from '../Common/MakeStore';

/** Styles */
import styles from './VehicleMake.module.css';





export const MakeList = observer (function reactComponent({uiStore}){

    // if(uiStore !== undefined) {
    //     reactComponent.uiStore = uiStore
    // };
    // if(reactComponent.uiStore === undefined) return null;
    reactComponent.uiStore = uiStore

    return (
        <section className={styles.makeSection}>
            <MakeInput />
            <input type="submit" value="SortDesc" onClick={() => MakeStore.sort('descending')} />
            <input type="submit" value="SortAsc" onClick={() => MakeStore.sort('ascending')} />
            
            {MakeStore.list.map(el => {
                return( <div key={el.id}>

                    <h2 className={styles.makeName}>{el.name}</h2>
                    <Link to={'make/' + el.id} >{el.name}</Link>

                    { reactComponent.uiStore.initKey(el.id)}
                    <input type="checkbox" onChange={() => reactComponent.uiStore.changeToggle(el.id)}></input>
                    { reactComponent.uiStore.toggleList[el.id] ? <ModelList makeId={el.id} /> : null}
                </div>)
            })}

        </section>
    );
})