import { observer } from 'mobx-react';

import { vehicleModelList } from '../Common/vehicleMakeList';

export const ModelList = observer ((props) => {
    return (
        <ul>{
            vehicleModelList.map( (el) => {
                if( Number(el.makeId) === Number(props.makeId)) return <li key={el.makeId + '/' + el.id}>{el.name}</li>;
                return null;
            })
        }</ul>
    );
})