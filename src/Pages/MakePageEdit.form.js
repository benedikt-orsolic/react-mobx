import React from "react";
import { observer } from 'mobx-react';
import MobxReactForm from 'mobx-react-form';

const fields = [{
    name: 'email',
    label: 'Email',
    placeholder: 'Insert Email',
  }, {
    name: 'password',
    label: 'Password',
    placeholder: 'Insert Password',
  }, {
    name: 'passwordConfirm',
    label: 'Password Confirmation',
    placeholder: 'Confirm Password',
}];
export const form = new MobxReactForm({ fields });



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
      {console.log(form.$('email'))}
      <SimpleInput field={form.$('email')} />
  </form>
));

export const TestForm = (<Form form={form} />);

