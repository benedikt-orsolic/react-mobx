import { observer } from 'mobx-react';
import React from 'react';
import { Redirect } from 'react-router-dom';

/** Mobx stores */
import { MakeStore } from '../Common/MakeStore';
import { ModelStore } from '../Common/ModelStore';

/** Styles */
import styles from './VehicleMake.module.css';



export const ModelPage = observer ((props) => {

    
    const {id} = props.match.params;
    
    let thisModel = ModelStore.getModelById(id).get();
    if(thisModel === undefined) {
        return <Redirect to='/' />
    }

    let thisModelMake = MakeStore.getMakeById(thisModel.makeId).get();
    if(thisModelMake === undefined) {
        return <Redirect to='/' />
    }
    
    return(<section className={styles.makeSection}>
        <h2>{thisModel.name}</h2>
        <section>
            <h3>Description</h3>
            <p>This model is made by {thisModelMake.name}</p>
            <input type="submit" value="Delete" onClick={() => ModelStore.deleteModel(id)} />
            
        </section>
    </section>);
})