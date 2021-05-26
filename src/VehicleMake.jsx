import React, { Component } from 'react';
import { vehicleMakeList, vehicleModelList } from './vehicleList';
import { VehicleModel } from './VehicleModel';

export class VehicleMake extends Component {

    /**
     * This will render all models fro make
     */

    render() {
    return (
        <section class="VehicleMake">
            {vehicleMakeList.map(el => {
                if(el.id === this.props.id) return( 
                    <h2>{el.name}</h2>
                )
            })}

            <ul>
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