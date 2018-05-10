import React, { Component } from 'react';
import './App.css';
import Header from './Header';
import CurrencyForm from './CurrencyForm';
import {render} from 'react-dom';
import axios from 'axios';
import Table from './Table';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      urlTableC: `http://api.nbp.pl/api/exchangerates/tables/c/?format=json`,
      rates: [
          
      ],
      count: null,
      selected:{
        code: null
      },
      details: [],
      currency: [],
      date: new Date()
    }
  };
  // argumenty do funkcji i do osobnego pliku
  getRates = ()=>{
    axios.get( this.state.urlTableC)
        .then(res => {
            const data = res.data.reduce((acc, currency) => acc.concat(currency.rates), []);
            this.setState({
              rates: data,
              currency: data.map(rates=> rates.code),
            })
        })
        .catch(error=> {
          console.log(error)
        })
  };

  setDateState = (count, code) => {
    if(this.state.selected.code === code && this.state.count === count){
      return;
    }
    this.setState({
      count: count,
      selected:{
        code: code
      }
    },() =>{
      const {selected:{code}, count} = this.state;
      const url = `http://api.nbp.pl/api/exchangerates/rates/c/${code}/last/${count}/?format=json`
      axios.get(url)
      .then(res => {
          let data = res.data.rates;
          this.setState({
            details: data
          })
      })
      .catch(error=>{
        this.setState({
          details: []
        })
        console.log(error)
      })
    }) 

  };

  componentWillMount() {
    this.getRates();
  };
  
  render() {
    const state = this.state;
    return (
      <div className="App">
        <Header date={this.state.date}/>
        <div className="container-fluid">          
          <main className="row">
            <section className="col-md-6">
              <Table data={state.rates}/>
            </section>
            <section className="col-md-6">
              <h2 className="navbar--marginBottom">Znajdź doładne dane waluty w czasie</h2>
              <CurrencyForm className="navbar--marginBottom" resetState={this.resetState} setParentDateState={this.setDateState} avilableCurrency={state.currency}/>
              {state.details.length>0? <section><Table data={state.details.reverse()} isDetails={true}/></section> :null}
            </section>
          </main>
        </div>
      </div>
    );
  }
}

export default App;