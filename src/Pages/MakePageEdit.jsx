import React, { useEffect } from 'react';
import { observer, } from 'mobx-react';





export const MakePageEdit = observer (({uiStore, match}) => {

    useEffect(() => {
        uiStore.useEffect();
        return(() => uiStore.destructor());
    }, [uiStore]);

    const id = match.params.id
    uiStore.setMakeId(id);
    
    if(uiStore.make === undefined) {
        return(<p>We are looking up for make with this id</p>)
    }
    return (<form>   
        Name
        <input name="name" type="text" value={uiStore.getName} onChange={event => uiStore.handleNameChange(event)} /><br />

        MakeId
        <input name="makeId" type="text" value={uiStore.getMakeId} onChange={event => uiStore.handleMakeIdChange(event)} readOnly="readOnly" /><br />

        <p>{uiStore.syncStatus}</p>
     </form>);
})