import React, { Component } from 'react'
import css from './Gross-pay.module.css'

export default class GrossPay extends Component {
    render() {
        return (
            <div className={css.grossPayTaxes}>
                <div>
                <label>Test</label>
                <input type="text" name="SalarioLiquido" placeholder='Taxa 1'/>
                </div>
                <div>Teste</div>
                <div>Xablau</div>
                <div>Xunda</div>
            </div>
        )
    }
}
