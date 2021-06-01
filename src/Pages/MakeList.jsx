import { NewVehicleMakeInput } from '../Components/NewVehicleMakeInput';
import { ModelList } from '../Components/ModelList';
import { useState } from 'react';

import { observer } from 'mobx-react';


import { vehicleMakeList } from '../Common/vehicleMakeList';

import styles from './VehicleMake.module.css';
import React from 'react';

import { Link } from 'react-router-dom';


/* Could not figure out how to put observer inside a class */
const List = observer (() => {
    return (
            vehicleMakeList.map(el => {
                const [ showList, setShowList ] = useState( false );
                return( <div key={el.id}>
                    <h2 className={styles.makeName}>{el.name}</h2>
                    <Link to={'make/' + el.id} >{el.name}</Link>
                    <input type="checkbox" onChange={() => setShowList(!showList)}></input>
                    {showList ? <ModelList makeId={el.id} /> : null}
                </div>)
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