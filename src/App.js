import React, { Component } from 'react';
import './App.css';
import moment from 'moment';
import Taxes from './Taxes';
import TaxControl from "./TaxControl";
import Book from "./Book";
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovels: 0,
      startingPopulation: 8,
      totalPopulation: 8,
      date: moment('1175-01-01'),
      gold: 150,
      taxes: Taxes.NO_TAXES,
      popularity: 80
    };
  }

  addHovel = () => {
    this.setState(state => ({
      hovels: state.hovels + 1,
      totalPopulation: state.totalPopulation + 8
    }));
  };

  removeHovel = () => {
      this.setState(state => ({
          hovels: state.hovels - 1
      }));
  };

  getPopularityChange = () => {
      return this.state.taxes.popularity;
  };

  nextMonth = () => {
      this.setState(state => ({
          date: state.date.add(1, 'months'),
          popularity: _.clamp(state.popularity + this.getPopularityChange(), 0, 100),
          gold: _.max([0, state.gold + Math.floor(state.totalPopulation * state.taxes.goldPerPerson)])
      }))
  };

  changeTaxes = () => {
      const sliderValue = document.getElementById('tax').value;
      this.setState(state => ({
          taxes: Object.entries(Taxes)[sliderValue][1]
      }));
  };

  getNextMonthIncome = () => {
      return Math.floor(this.state.totalPopulation * this.state.taxes.goldPerPerson);
  };

  getTaxPopularity = () => {
      return this.state.taxes.popularity;
  };

  decreaseTax = () => {
      const taxes = Object.values(Taxes);
      const currentTaxIndex = taxes.findIndex(tax => tax.id === this.state.taxes.id);
      this.setState({
          taxes: taxes[currentTaxIndex - 1]
      });
  };

  increaseTax = () => {
      const taxes = Object.values(Taxes);
      const currentTaxIndex = taxes.findIndex(tax => tax.id === this.state.taxes.id);
      this.setState({
          taxes: taxes[currentTaxIndex + 1]
      });
  };

  render() {
    const hovels = '🏠'.repeat(this.state.hovels);
    const totalPopulation = this.state.totalPopulation;
    const availableHousing = this.state.startingPopulation + this.state.hovels * 8;
    return (
        <div>
          <TaxControl
            taxes={this.state.taxes}
            taxValue={Object.keys(Taxes).findIndex(tax => tax === this.state.taxes.id)}
            totalPopulation={totalPopulation}
            nextMonthIncome={this.getNextMonthIncome()}
            changeTaxes={this.changeTaxes}
            popularity={this.getTaxPopularity()}
            decreaseTax={this.decreaseTax}
            increaseTax={this.increaseTax}
          />
          <div>
              <p className="gold">Gold: {this.state.gold}</p>
              <p>Date: {this.state.date.format('MMM YYYY')} <button onClick={this.nextMonth}>Next month</button></p>
            <div>{hovels}</div>
            <button onClick={this.addHovel}>Add Hovel</button> <button onClick={this.removeHovel} disabled={!this.state.hovels}>Remove</button>
                <p>Total population:
                    <span style={{ color: totalPopulation > availableHousing ? 'red' : 'black' }}> {totalPopulation}/{availableHousing}</span>
                    {totalPopulation > availableHousing && <span>People will die each month</span>}
                </p>
          </div>
          <Book
              popularity={this.state.popularity}
              gold={this.state.gold}
              population={totalPopulation}
              housing={availableHousing}
          />
        </div>
    );
  }
}

export default App;
