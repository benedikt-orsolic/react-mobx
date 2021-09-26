import React from "react";
import { observer } from 'mobx-react';
import MobxReactForm from 'mobx-react-form';

const fields = [{
    name: 'makeName',
    label: 'Make name',
    placeholder: 'Unnamed make',
}];

const hooks = {

  onSuccess(form) {
    console.log(form)
    console.log('Form Values!', form.values());
  },

  onToggle(e) {console.log(e)}
}

const handlers = {
  onChange(e) {
    console.log(e)
  }
}
export const form = new MobxReactForm({ fields }, {hooks, handlers});

const SimpleInput = observer(({ field, type = 'text', placeholder = null }) => (
  <div className="measure">
    <label htmlFor={field.id}>
      {field.label}
    </label>
    <input {...field.bind({ type, placeholder }) }/>
    <small>
      {field.error}
    </small>
  </div>
));
export const Form = observer(({ form }) => (
  <form onSubmit={form.onSubmit}>
        <label htmlFor={form.$('makeName').id}>{form.$('makeName').label}</label>
        <input 
            {...form.$('makeName').bind({ type: 'text', placeholder: null })}
            onFocus={form.onToggle}
        />

      <button type="submit" onClick={form.onSubmit}>Submit</button>
  </form>
));

export const TestForm = (<Form form={form} />);

