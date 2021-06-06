import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { ModelStore } from '../Common/ModelStore';

export const ModelList = observer ((props) => {
    return (
        <ul>{
            ModelStore.list.map( (el) => {
                if( Number(el.makeId) === Number(props.makeId)) return(<div>
                    <Link to={'/model/'+el.id} key={el.makeId + '/' + el.id}>{el.name}</Link><br />
                </div>);
                return null;
            })
        }</ul>
    );
})