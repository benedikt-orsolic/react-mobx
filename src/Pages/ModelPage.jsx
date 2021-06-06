import React from 'react';

import { MakeStore } from '../Common/MakeStore';
import { ModelStore } from '../Common/ModelStore';

import styles from './VehicleMake.module.css';

export class ModelPage extends React.Component {

    constructor(props) {
        super(props);
        const {id} = props.match.params;
        this.id = id;
    }

    render() {

        let thisModel = ModelStore.list.find(el=>Number(el.id) === Number(this.id));
        let thisModelMake = MakeStore.list.find(el=>Number(el.id) === Number(thisModel.makeId));
        return(<section className={styles.makeSection}>
            <h2>{thisModel.name}</h2>
            <section>
                <h3>Description</h3>
                <p>This model is made by {thisModelMake.name}</p>
            </section>
        </section>);
    }
}