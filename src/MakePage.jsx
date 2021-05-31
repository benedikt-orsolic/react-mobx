import React from 'react';
import { observer } from 'mobx-react';

import { vehicleMakeList, vehicleModelList } from './vehicleMakeList';

import styles from './VehicleMake.module.css';


/* Could not figure out how to put observer inside a class */
const List = observer ((props) => {
        return (
            <ul>{
                vehicleModelList.map( (el) => {
                    if( Number(el.makeId) == Number(props.makeId)) return <li>{el.name}</li>;
                })
            }</ul>
        );
})

export class MakePage extends React.Component {

    constructor(props) {
        super(props);
        const {id} = props.match.params
        this.id = id;
    }

    render() {
        return (
            <section className={styles.makeSection}>

                <h2>{
                    vehicleMakeList.map( (el) => {
                        if( Number(el.id) == Number(this.id)) return el.name;
                    })
                }</h2>
                <List makeId={this.id} />
            </section>
        )
    }
}