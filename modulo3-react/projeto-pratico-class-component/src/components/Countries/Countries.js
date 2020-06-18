import React, { Component } from 'react'
import Country from './Country';

export default class Countries extends Component {

    render() {
        // console.log(this.props.contries);
        const {contries} = this.props;
        return (
            <div>
                <ul>
                    {
                        contries.map(country => <li key={country.id}> <Country country={country}/> </li>)
                    }
                  <li></li>
                </ul>
            </div>
        )
    }
}
