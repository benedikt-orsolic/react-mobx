import React from 'react';
import { observer, } from 'mobx-react';





export const ModelPageEdit = observer (({uiStore, match}) => {

    const id = match.params.id;
    const makeId = match.params.makeId;
    uiStore.setModelId(makeId, id);

    if(uiStore.model === undefined) {
        return(<p>We are looking up for model with this id</p>)
    }

    return (<form>   
        Name
        <input type="text" value={uiStore.getName} onChange={event => uiStore.handleNameChange(event)} /><br />

        MakeId
        <input type="number" value={uiStore.getMakeId} onChange={event => uiStore.handleMakeIdChange(event)} readOnly="readOnly" /><br />
     </form>);
})