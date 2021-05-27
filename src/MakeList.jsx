import { NewVehicleMakeInput } from './NewVehicleMakeInput';

import { observer } from 'mobx-react';


import { vehicleMakeList } from './vehicleMakeList';

import styles from './VehicleMake.module.css';



export const MakeList = observer (() => {
        return (
            <section className={styles.makeSection}>

                <NewVehicleMakeInput />
                {vehicleMakeList.map(el => {
                    return( 
                        <h2 className={styles.makeName}>{el.name}</h2>
                    )
                })}

                
            </section>
        );
})