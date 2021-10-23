import { observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';

/** Mobx stores */
import { ModelStore } from '../Common/ModelStore';

/** Styles */
import styles from './VehicleMake.module.css';



export const ModelPage = observer (({match, PageStore}) => {

    
    const id = match.params.id;
    PageStore.getModelById(id);
    
    if(PageStore.model === undefined || PageStore.parentMake === undefined) {
        return (<p>We are waiting for some data to arive</p>)
    }
    
    return(<section className={styles.makeSection}>
        <h2>{PageStore.model.name}</h2>
        <section>
            <h3>Description</h3>
            <p>This model is made by {PageStore.parentMake.name}</p>
            

            {window.user.isLoggedIn ? 
            <div>
                <input type="submit" value="Delete" onClick={() => ModelStore.deleteModel(id)} />
                <Link to={"/model/edit/" + PageStore.model.makeId + '/' + id} >Edit</Link>
            </div> :
            null}
        </section>
    </section>);
})