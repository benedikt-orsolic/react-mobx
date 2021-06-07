import React from 'react';

import { ModelList } from '../Components/ModelList';
import { ModelInput } from '../Components/ModelInput';
import { MakeStore } from '../Common/MakeStore';

import styles from './VehicleMake.module.css';



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
                    MakeStore.list.map( (el) => {
                        if( Number(el.id) === Number(this.id)) return el.name;
                        return null;
                    })
                }</h2>
                <ModelInput makeId={this.id} />
                <ModelList makeId={this.id} />
            </section>
        )
    }
}