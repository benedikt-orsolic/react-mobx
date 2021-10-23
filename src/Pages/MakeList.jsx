import React, { useEffect } from 'react';
import { observer, } from 'mobx-react';
import { Link } from 'react-router-dom';

/** Components */
import { ModelList } from '../Components/ModelList';

/** Mobx stores */
import { MakeStore } from '../Common/MakeStore';

/** Styles */
import styles from './VehicleMake.module.css';





export const MakeList = observer (({uiStore}) => {

    useEffect(() => {

        uiStore.useEffect();
        return(() => uiStore.destructor());
    }, [uiStore])

    return (
        <section className={styles.makeSection}>
            <Link to='/make/edit/undefined' >Add new make</Link><br /> <hr />
            <input type="submit" value="SortDesc" onClick={() => MakeStore.sort('descending')} />
            <input type="submit" value="SortAsc" onClick={() => MakeStore.sort('ascending')} />
            
            <table>
                <thead>
                    <tr>
                        <th>Make Name</th>
                        <th>Make models</th>
                    </tr>
                </thead>
                <tbody>
                {MakeStore.makeList === undefined ?
                null : 
                MakeStore.makeList.map(el => {
                    return( <tr key={el.id}>

                        <td><Link to={'make/' + el.id} >
                            <h2 className={styles.makeName}>{el.name}</h2>
                        </Link></td>
                            

                        <td><ModelList makeId={el.id} /></td>
                    </tr>)
                })}
                </tbody>
            </table>

        </section>
    );
})