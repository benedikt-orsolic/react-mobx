import React from 'react';
import { observer } from 'mobx-react';

export const ModelInput = observer(({uiStore, makeId}) => {

    uiStore.setMakeId(makeId);

    return (
        <form onSubmit={event => uiStore.handleSubmit(event)}>        
        <label>
            Add new model to make list:
            <input type="text" value={uiStore.getName} onChange={event => uiStore.handleChange(event)} />        
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
});