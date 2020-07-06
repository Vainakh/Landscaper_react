import React from "react";
import  ReactDOM from "react-dom";




class App extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        name: "Adlan",
        money: 0,
        tools: [{name: "teeth", cost: 0, workValue: 1, image: "./images/tooth.svg"}],
        toolsForSale: [{name: "scissors", cost: 5, workValue: 5, image: "./images/scissor.svg"}, {name: 'push lawnmower', cost: 25, workValue: 50, image: "./images/lawnmower.svg"}, {name: 'battery powered lawnmower', cost: 250, workValue: 100, image: "./images/electriclawnmower.svg"}, {name: 'team of students', cost: 500, workValue: 250, image: "./images/group.svg"}],
        menu: "main",
        message: ""
    } 
    this.buyTool = this.buyTool.bind(this);
    this.menu = this.menu.bind(this);
    this.work = this.work.bind(this);
    this.store = this.store.bind(this);
  }
  

  buyTool(tool){
    const boughtTool = tool;
    const tools = this.state.tools;
    tools.push(boughtTool);
    const newToolsForSale = this.state.toolsForSale;
    newToolsForSale.shift();
    const newMoney = this.state.money - tool.cost;
    
    this.setState({
      tools: tools,
      toolsForSale: newToolsForSale,
      money: newMoney,
      message: `You bought ${tool.name} for $${tool.cost}`
    })
  }

  menu(event){
    let menuChoice;
    if(event.target.value === "store"){
      menuChoice = "store"
    } else if(event.target.value === "main"){
      menuChoice = "main"
    } else {
      menuChoice = "work"
    }
    this.setState({
      menu: menuChoice
    })
  }

  work(tool){
    let currentMoney = this.state.money;
    let newMoney = tool.workValue + currentMoney;
    this.setState({
      money: newMoney,
      message: `You worked with your ${tool.name} and made $${tool.workValue}`
    })
  }

  store(tool){
    if(tool.name === "soldOut"){
      this.setState({ message: "No more tools are available for sale! You bought it all!"});
    } else if(this.state.money >= tool.cost){
      this.buyTool = this.buyTool.bind(this);
      this.buyTool(tool);
    } else {
      this.setState({ message: "Not enough money!"});
    }
  }

  reset(){
    this.setState({
      name: "Adlan",
      money: 0,
      tools: [{name: "teeth", cost: 0, workValue: 1, image: "./images/tooth.svg"}],
      toolsForSale: [{name: "scissors", cost: 5, workValue: 5, image: "./images/scissor.svg"}, {name: 'push lawnmower', cost: 25, workValue: 50, image: "./images/lawnmower.svg"}, {name: 'battery powered lawnmower', cost: 250, workValue: 100, image: "./images/electriclawnmower.svg"}, {name: 'team of students', cost: 500, workValue: 250, image: "./images/group.svg"}],
      menu: "main",
      message: ""
    })
  }

  render(){
    let menu;
    let message;
    let toolForSale;

    if (this.state.toolsForSale.length){
      message = `Buy ${this.state.toolsForSale[0].name} for $${this.state.toolsForSale[0].cost}`
      toolForSale = this.state.toolsForSale[0];
    }else{
      message = "You bought all the tools!"
      toolForSale = { name: "soldOut" }
    }

    if(this.state.money >= 1000 && this.state.tools[this.state.tools.length - 1].name === "team of students") {
     menu = <div className="win-container">
       <div className="win-message">"You won the game!"</div>
       <button className="reset" onClick={this.reset}>Reset Game</button>
       </div>;
    }else if(this.state.menu === "store"){
      menu = 
      <div className="menu-store-container"> 
       <div className="menu-store-message">
         {message}
       </div>
       <div className="btn-div-store">
        <button className="btn-exit" type="submit" value="main" onClick={this.menu}>Exit</button>
          <button className="btn-buy" onClick={() => {
            this.store(toolForSale);
          }} >Buy</button>
        </div>
       </div>
        
    }else if(this.state.menu === "main"){
      menu = 
      <div className="menu-main-container"> 
      How would you like to proceed?
      <div className="btn-div-main">
        <button className="btn-work" type="submit" value="work" onClick={this.menu}>Work</button>
          <button className="btn-go-to-store" type="submit" value="store" onClick={this.menu}>Go To Store</button>
        </div>
      </div>
    } else {
      menu =
      <div className="ul-container">
        <ul className="ul">
          { 
            this.state.tools.map((tool, index) => {
              return (<li className="tool-container" key={index}>
                <img className="images" src={tool.image}></img>
                <button className="work-tool" type="submit" onClick={() => {
                  this.work(tool)}}>
              {tool.name}</button>
              </li>)
            })
          }
        </ul>
        <button className="btn-go-back-to-main" type="submit" value="main" onClick={this.menu}>Go To Main Menu</button>
      </div>
    }
    return <div className="background">
        
        <h1 className="greeting">Hello, {this.state.name}. You have ${this.state.money}</h1>
        { menu }
        <div className="message">{this.state.message}</div>
    </div>;
  }
}
ReactDOM.render(
  <App></App>,
  document.querySelector('main')
);