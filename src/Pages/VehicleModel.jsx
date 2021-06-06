import { Component } from 'react';
import { ModelStore } from '../Common/ModelStore';

export class VehicleModel extends Component {

    render() {
    let id=this.props.id;
    return(
        <div class="vehicleMake" id={id}>
            {ModelStore.list.map(el => {
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