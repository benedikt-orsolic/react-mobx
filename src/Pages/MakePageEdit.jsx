import React, { useEffect } from 'react';
import { observer, } from 'mobx-react';

import { Form, form } from './MakePageEdit.form';



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
    return (<div><form>   
        Name
        <input type="text" value={uiStore.getName} onChange={event => uiStore.handleNameChange(event)} /><br />

        MakeId
        <input type="number" value={uiStore.getMakeId} onChange={event => uiStore.handleMakeIdChange(event)} readOnly="readOnly" /><br />

        <p>{uiStore.syncStatus}</p>

     </form> 
     <br />
     <br />
     <br />
     <br />
     <br />
     <hr />
     <br />
     <br />
     <br />
     <br />
     <h1>Using mobx-react-form</h1>
     <br />
     <Form form={form} />
     </div>

        
     );
})