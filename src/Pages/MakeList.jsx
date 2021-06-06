import React from 'react';
import { observer, } from 'mobx-react';
import { Link } from 'react-router-dom';

import { NewVehicleMakeInput } from '../Components/NewVehicleMakeInput';

import { ModelList } from '../Components/ModelList';
import { MakeStore } from '../Common/MakeStore';

import styles from './VehicleMake.module.css';
import { action, makeObservable, observable } from 'mobx';


/* Could not figure out how to put observer inside a class */
export const MakeList = observer (() => {
    return (
        <section className={styles.makeSection}>
            <NewVehicleMakeInput />
            {
            MakeStore.list.map(el => {
                return( <div key={el.id}>

                    <h2 className={styles.makeName}>{el.name}</h2>
                    <Link to={'make/' + el.id} >{el.name}</Link>

                    {MakeListState.initKey(el.id)}
                    <input type="checkbox" onChange={() => MakeListState.changeToggle(el.id)}></input>
                    {MakeListState.toggleList[el.id] ? <ModelList makeId={el.id} /> : null}
                </div>)
            })
            }
        </section>
    );
})

class MakeListStateStore {

    toggleList = [];

    constructor() {
        makeObservable(this, {
            toggleList: observable,
            changeToggle: action,
            initKey: action,    
        })
    }

    changeToggle(key) {
        this.toggleList[key] = !this.toggleList[key];
    }

    initKey(key) {
        while(this.toggleList.length <= key) {
            this.toggleList[this.toggleList.length] = false;
        }
    }
}

const MakeListState = new MakeListStateStore();