import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';


class App extends Component {
    
  state = {
    manager:'',
    players:[],
    balance:'',
    value:'',
    message:''
  }; //this is an equivalent to the constructor for what we're doing there
  /*constructor(props){
    super(props);

    //define the state
    this.state = {manager : ''};
  }*/


  async componentDidMount(){ //because the fucntion is called componentDidMount, it will be automaticly called when App component is taking place on the screen

    //const are objects
    //methods manager(), getPlayers(), ... are define in the ABI in the file lottery.js. ABI come from the sol code of lottery (chap3)
    const manager = await lottery.methods.manager().call(); //we don't need to specify account here (like call({from: accounts[0]})) bacause we're using metamask provider
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address); //const balance = await lottery.methods.getBalance().call();

    //the one who call App() (= the contract) is the manager thx to the line just below = add value to the state
    this.setState({manager, players, balance}); //==    this.setState({manager: manager});

  }

  onEnter = async (event) =>{  //by playing with an error function, we do not care about the value of 'this' //event object represent the form submition
    event.preventDefault(); //to prevent the itself submition and take it down

    const accounts = await web3.eth.getAccounts();

    this.setState({message: 'Waiting on transaction success ...'});

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({message: 'You have been entered'});

  };

onClick = async() =>{
  const accounts = await web3.eth.getAccounts();

  this.setState({message: 'Picking winner => Waiting on transaction success ...'});

  await lottery.methods.pickWinner().send({
    from:accounts[0]
  });

  this.setState({message: 'A winner has been picked'});

  };
  //render() is automaticly call after componentDidMount()
  render(){
    return (
      <div className="App">
       <h2>Lottery Contract</h2>
         <p>
              This contract is managed by {this.state.manager}.<br></br>
              There are currently {this.state.players.length} players entered.<br></br>
              They are competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether !<br></br><br></br>
         </p>

         <hr />

         <form onSubmit={this.onEnter}>
              <h3>Want to join the compet ?</h3>
              <div>
                <label>Amount of ether to enter</label>
                <input
                      value={this.state.value}
                      onChange={event => this.setState({value: event.target.value})}
                />
              </div>
              <button>Enter !</button>
         </form>

         <hr/>

         <h4>Pick a winner ?</h4>
         <button onClick={this.onClick}> Pick </button>
         <hr/>
         <h1>{this.state.message}</h1>

      </div>
    );
  }
}

export default App;



/*
<input
                      _value={this.state.value} //setting the definition of _value
                      onChange={event => this.setState({_value: event.target.value})} //event.target.value to grab the value entered by the user
                />
*/