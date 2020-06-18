import React, { Component } from 'react';
import Countries from './components/Countries/Countries';
import Header from './components/Header/Header';

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      allContries: [],
      filteredeCountries : [],
      sumPopulation : 0
    };
  }

  async componentDidMount() {
    const res = await fetch('https:restcountries.eu/rest/v2/all');
    const json = await res.json();

    const allContries = json.map(contry => {
      const {name, population, numericCode, flag} = contry;
      
      return {
        name,
        population,
        id : numericCode,
        nameToFilter : name.toLowerCase(),
        flag
      }
    });

    const sumPopulation = this.calculatePopulationFrom(allContries);

    this.setState({
      allContries,
      filteredeCountries: Object.assign([],allContries),
      sumPopulation
    });

  }
  
  handleChangeFilter = (newText) => {
    this.setState({filter : newText});
    
    const newTextLowerCase = newText.toLowerCase();

    const filteredeCountries = this.state.allContries.filter(country => {
      return country.nameToFilter.includes(newTextLowerCase);
    });

    const sumPopulation = this.calculatePopulationFrom(filteredeCountries);

    this.setState({
      filteredeCountries,
      sumPopulation
    });

  }; 

  calculatePopulationFrom = (countries) => {
    const filteredPopulation = countries.reduce((acc,cur) => {
      return acc + cur.population
    },0);

    return filteredPopulation;
  }

  render() {
    const {filteredeCountries,sumPopulation} = this.state;

    return (

      <div className="container">
        <h3 style={styles.centeredTitle}>Países - Class Component</h3>
        <Header countryCount={filteredeCountries.length} sumPopulation={sumPopulation} onChangeFilter={this.handleChangeFilter}/>
        <Countries contries = {filteredeCountries}/>
      </div>
    
    )    
  }
}

const styles = {
  centeredTitle : {
    textAlign : 'center'
  }
}
