import React, { useEffect } from 'react';
import { observer, } from 'mobx-react';





export const ModelPageEdit = observer (({uiStore, match}) => {

    useEffect(() => {
        uiStore.useEffect();
        return(() => uiStore.destructor());
    }, [uiStore]);

    const id = match.params.id;
    const makeId = match.params.makeId;
    uiStore.setModelId(makeId, id);

    if(uiStore.model === undefined) {
        return(<p>We are looking up for model with this id</p>)
    }

    return (<form>   
        Name
        <input type="text" value={uiStore.getName} onChange={event => uiStore.handleNameChange(event)} /><br />

        ModelId
        <input type="text" value={uiStore.getModelId} onChange={event => uiStore.handleModelIdChange(event)} readOnly="readOnly" /><br />

        <p>{uiStore.syncStatus}</p>
     </form>);
})