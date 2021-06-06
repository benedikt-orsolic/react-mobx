import React from 'react';
import { observer } from 'mobx-react';
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
                    <input type="checkbox" onChange={() => MakeListState.changeShowListToggle()}></input>
                    {MakeListState.showListToggle ? <ModelList makeId={el.id} /> : null}
                </div>)
            })
            }
        </section>
    );
})

class MakeListStateStore {

    showListToggle = false;

    constructor() {
        makeObservable(this, {
            showListToggle: observable,
            changeShowListToggle: action,
        })
    }

    changeShowListToggle() {
        this.showListToggle = !this.showListToggle;
    }
}

const MakeListState = new MakeListStateStore();