import React from 'react';
import { observer, } from 'mobx-react';
import { Link } from 'react-router-dom';

/** Components */
import { MakeInput } from '../Components/MakeInput';
import { ModelList } from '../Components/ModelList';

/** Mobx stores */
import { MakeStore } from '../Common/MakeStore';
import { MakeListStore } from './MakeList.store';

/** Styles */
import styles from './VehicleMake.module.css';



const makeListStore = new MakeListStore();

export const MakeList = observer (() => {
    return (
        <section className={styles.makeSection}>
            <MakeInput />
            <input type="submit" value="SortDesc" onClick={() => MakeStore.sort('descending')} />
            <input type="submit" value="SortAsc" onClick={() => MakeStore.sort('ascending')} />
            
            {MakeStore.list.map(el => {
                return( <div key={el.id}>

                    <h2 className={styles.makeName}>{el.name}</h2>
                    <Link to={'make/' + el.id} >{el.name}</Link>

                    {makeListStore.initKey(el.id)}
                    <input type="checkbox" onChange={() => makeListStore.changeToggle(el.id)}></input>
                    {makeListStore.toggleList[el.id] ? <ModelList makeId={el.id} /> : null}
                </div>)
            })}

        </section>
    );
})