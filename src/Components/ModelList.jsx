import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { ModelStore } from '../Common/ModelStore';

export const ModelList = observer ((props) => {
    useEffect(() => {

        // Component did mount
        ModelStore.fetchModelList();
    }, [])



    return (
        <ul>{
            ModelStore.list.map( (el) => {

                let makeId = String(props.makeId);
                let elMakeId = String(el.makeId);
                
                if( makeId.localeCompare(elMakeId) === 0) return(<div key={el.makeId + '/' + el.id}>
                    <Link to={'/model/'+el.id}>{el.name}</Link><br />
                </div>);
                return null;
            })
        }</ul>
    );
})