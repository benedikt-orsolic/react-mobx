import React, { Component } from 'react';
import { vehicleMakeList, vehicleModelList } from './vehicleList';
import { VehicleModel } from './VehicleModel';

import styles from './VehicleMake.module.css';

export class VehicleMake extends Component {

    /**
     * This will render all models fro make
     */

    render() {
    return (
        <section className={styles.makeSection}>
            {vehicleMakeList.map(el => {
                if(el.id === this.props.id) return( 
                    <h2 className={styles.makeName}>{el.name}</h2>
                )
            })}

            <ul class="vehicleModelList">
                {vehicleModelList.map(el => {
                    if(el.makeId === this.props.id) return( 
                        <VehicleModel id={el.id} />
                    )
                })}
            </ul>

            
        </section>
    )
    }
}