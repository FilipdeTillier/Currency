import React, { Component } from 'react';

class Clock extends Component{
    constructor(props){
        super(props);
        this.state = {
            hour: new Date().getHours().toLocaleString(),
            minute: new Date().getMinutes().toLocaleString(),
            second: new Date().getSeconds().toLocaleString()
        };
    }
    componentDidMount() {
        this.timerID = setInterval(() => this.tick(),1000);
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick(){
        this.setState({
            hour: new Date().getHours().toLocaleString(),
            minute: new Date().getMinutes().toLocaleString(),
            second: new Date().getSeconds().toLocaleString()
        });
    }
    render(){
        return(
            <div>
                {this.state.hour < 10? "0"+this.state.hour: this.state.hour}:
                {this.state.minute < 10? "0"+this.state.minute: this.state.minute}:
                {this.state.second < 10? "0"+this.state.second: this.state.second}
            </div>
        )
    }
}

const Header = ({date}) => {
    return (
        <nav  className="navbar sticky-top navbar-light bg-light navbar--marginBottom">
            <div className="col-12 col-sm-9 ">
                <h1 style={{fontSize:"2.4em"}} className="float-left">NBP - kursy walut</h1>
            </div>
            <div className="col-12 col-sm-3">
                <Clock className="float-right" style={{fontSize:"1.3em"} } date={date}/>
            </div>                
        </nav>
    )
}
export default Header;
