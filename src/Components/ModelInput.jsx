import React from 'react';
import { observer } from 'mobx-react';
import { ModelInputStore } from './ModelInput.store';

const modelInputStore = new ModelInputStore();

export const ModelInput = observer((props) => {

    modelInputStore.setMakeId(props.makeId);

    return (
        <form onSubmit={event => modelInputStore.handleSubmit(event)}>        
        <label>
            Model name:
            <input type="text" value={modelInputStore.getName} onChange={event => modelInputStore.handleChange(event)} />        
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
});