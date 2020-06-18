import React, { Component } from 'react';
import css from './header.module.css';

export default class Header extends Component {

    handleInputChange = (event) => {
        const newText = event.target.value;
        this.props.onChangeFilter(newText);
    };


    render() {
        const {countryCount,sumPopulation} = this.props;


        return (
            <div className={css.flexRow}>
                <input type="text" style={{width: '500px', minWidth:'200px'}} placeholder='Digite o nome de um país' onChange={this.handleInputChange}/>
                <span>|Total de países: <strong>{countryCount}</strong></span>
                <span>|População: <strong>{sumPopulation}</strong></span>
            </div>
        )
    }
}
