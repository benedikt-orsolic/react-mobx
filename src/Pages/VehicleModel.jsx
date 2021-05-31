import { Component } from 'react';
import { vehicleModelList } from './vehicleList';

export class VehicleModel extends Component {

    render() {
    let id=this.props.id;
    return(
        <div class="vehicleMake" id={id}>
            {vehicleModelList.map(el => {
                if(el.id === id){
                    return(
                        <h3>{el.name}</h3>
                    )
                }
            })}
        </div>
    )
    }
}