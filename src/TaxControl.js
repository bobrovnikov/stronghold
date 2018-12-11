import React, { Component } from 'react';
import Taxes from "./Taxes";
import PopularityIcon from "./PopularityIcon";

export default class TaxControl extends Component {
    changeTaxes = () => {
        this.props.changeTaxes();
    };

    render() {
        const min = 0;
        const max = Object.keys(Taxes).length-1;
        const value = this.props.taxValue;
        return (
            <div>
                <p>Income this month: {this.props.totalPopulation} 🧔 = {this.props.nextMonthIncome} 💰</p>
                <p>
                    <button
                        disabled={value === min}
                        onClick={this.props.decreaseTax}
                    >◀</button>
                    <input type="range" id="tax" min="{min}" max={max} step="1" value={value} onChange={this.changeTaxes} />
                    <button
                        disabled={value === max}
                        onClick={this.props.increaseTax}
                    >▶</button>
                </p>
                <p>Taxes: {this.props.taxes.name} (<PopularityIcon popularity={this.props.popularity} />)</p>
            </div>
        );
    }
}
