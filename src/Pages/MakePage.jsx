import React from 'react';

import { ModelList } from '../Components/ModelList';
import { MakeStore } from '../Common/MakeStore';
import { ModelStore } from '../Common/ModelStore';

import styles from './VehicleMake.module.css';


class ModelInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {    
        this.setState({value: event.target.value});  
    }
    handleSubmit(event) {
        ModelStore.addNewModel(this.props.makeId, this.state.value);
        event.preventDefault();
      }
    
      render() {
        return (
            <form onSubmit={this.handleSubmit}>        
            <label>
                Model name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />        
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
}

export class MakePage extends React.Component {

    constructor(props) {
        super(props);
        const {id} = props.match.params
        this.id = id;
    }

    render() {
        return (
            <section className={styles.makeSection}>

                <h2>{
                    MakeStore.list.map( (el) => {
                        if( Number(el.id) === Number(this.id)) return el.name;
                        return null;
                    })
                }</h2>
                <ModelInput makeId={this.id} />
                <ModelList makeId={this.id} />
            </section>
        )
    }
}