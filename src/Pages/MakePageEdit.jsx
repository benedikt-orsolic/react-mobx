import React from 'react';
import { observer, } from 'mobx-react';





export const MakePageEdit = observer (({uiStore, match}) => {

    const id = match.params.id
    uiStore.setMakeId(id);

    return (<form>   
        Name
        <input type="text" value={uiStore.getName} onChange={event => uiStore.handleNameChange(event)} /><br />

        MakeId
        <input type="number" value={uiStore.getMakeId} onChange={event => uiStore.handleMakeIdChange(event)} readOnly="readOnly" /><br />
     </form>);
})