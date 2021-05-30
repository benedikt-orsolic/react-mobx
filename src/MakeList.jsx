import { NewVehicleMakeInput } from './NewVehicleMakeInput';

import { observer } from 'mobx-react';


import { vehicleMakeList } from './vehicleMakeList';

import styles from './VehicleMake.module.css';
import React from 'react';


/* Could not figure out how to put observer inside a class */
const List = observer (() => {
        return (
                vehicleMakeList.map(el => {
                    return( 
                        <h2 className={styles.makeName}>{el.name}</h2>
                    )
                })
        );
})

export class MakeList extends React.Component {

    render() {
        return (
            <section className={styles.makeSection}>
                <NewVehicleMakeInput />
                <List />
            </section>
        )
    }
}