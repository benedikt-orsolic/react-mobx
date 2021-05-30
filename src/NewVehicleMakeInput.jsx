import React, { Component } from 'react';
import { vehicleMakeList } from './vehicleMakeList';

export class NewVehicleMakeInput extends Component {

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
        vehicleMakeList.push({
            id: 0,
            name: this.state.value,
            abbr: '',
        })
        event.preventDefault();
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>        
          <label>
                Make name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />        
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }
}