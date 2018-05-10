import React, { Component } from 'react';
import './App.css';

const SigleInput = ({formType, description, formName, onChangeChildInput, errorText}) => {
    function onChangeInput(event){
        const {value, name} = event.target
        onChangeChildInput(name, value)

    }

    return (
        <div className="col-md-4 mb-3">
            <label className="col-form-label nowrap">{description}</label>
            <input required onChange={onChangeInput} type={formType} className="form-control" name={formName}/>
            {errorText?<div style={{display:"block"}} className="invalid-feedback">{errorText}</div>: null}
        </div>
    )
}

const SingleOptions = ({options ,description, formName, onChangeChildInput, errorText}) => {
    function onChangeInput(event){
        const {value, name} = event.target
        onChangeChildInput(name, value)
    }

    return(
        <div className="col-md-4 mb-3">
            <label className="col-form-label">{description}</label>
            <select required name={formName} onChange={onChangeInput} className="form-control mb-2 mr-sm-2 mb-sm-0">
                {options.map((value, index)=> index===0? <option defaultValue value={value} key={index}>{value}</option>: <option value={value} key={index}>{value}</option>)}
            </select>
            {errorText?<div style={{display:"block"}} className="invalid-feedback">{errorText}</div>: null}
        </div>
    )
}

class CurrencyForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            count: '',
            countError: '',
            currecyCode: 'USD',
            currencyCodeError: ''
        }
    }

    onChangeChildInput = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    validate = () => {
        let error = false;
        let errors = {};
        if(!this.state.currecyCode){
            error = true;
            errors.currencyCodeError = "Trzeba wybrać walute!";
        }else if(this.state.count <= 0 || this.state.count > 255){
            error = true;
            errors.countError = "Ilość dni dla danej waluty nie może być mniejsza niż 1 oraz większa niż 255";
        }
        if(error){
            this.setState({
                ...this.state,
                ...errors
            })
        }else{
            this.setState({
                countError: '',
                currencyCodeError: ''
            })
        }

        return error;
    }
    
    changeParentState = (event) => {
        event.preventDefault();
        const {count, currecyCode} = this.state
        const isError = this.validate();
        this.props.setParentDateState(count, currecyCode);
    }

    render(){
        return(
            <form onSubmit={this.changeParentState} className="needs-validation">
                <div className="form-row">
                    <SingleOptions onChangeChildInput={this.onChangeChildInput.bind(this)} options={this.props.avilableCurrency} errorText={this.state.currencyCodeError} description={"Kod waluty"} formName={"currecyCode"}/>
                    <SigleInput onChangeChildInput={this.onChangeChildInput.bind(this)} errorText={this.state.countError} formType={"number"} description={"Ilość ostatnich wartości"} formName={"count"}/>
                </div>
                <button className="btn btn-default" type="submit">Szukaj</button>
            </form>
            
        )
    }
}

export default CurrencyForm;
