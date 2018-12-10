import React, { Component } from 'react';
import Taxes from "./Taxes";
import PopularityIcon from "./PopularityIcon";

export default class TaxControl extends Component {
    changeTaxes = () => {
        this.props.changeTaxes();
    };

    render() {
        return (
            <div>
                <p>Income this month: {this.props.totalPopulation} 🧔 = {this.props.nextMonthIncome} 💰</p>
                <p>
                    <button onClick={this.props.decreaseTax}>◀</button>
                    <input type="range" id="tax" min="0" max={Object.keys(Taxes).length-1} step="1" value={this.props.taxValue} onChange={this.changeTaxes}/>
                    <button onClick={this.props.increaseTax}>▶</button>
                </p>
                <p>Taxes: {this.props.taxes.name} (<PopularityIcon popularity={this.props.popularity} />)</p>
            </div>
        );
    }
}
