import React, { Component } from 'react';

export class Vehicle extends Component {

    constructor(props){
        super(props);
        console.log(props)
    }

    render() {
    return(
        <section>
            <h2>{this.props.make} {this.props.model}</h2>
        </section>
    ); }
}