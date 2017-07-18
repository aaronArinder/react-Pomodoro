import React, { Component } from 'react';

class Pomodoro extends Component {
  constructor(){
    super()
    this.state = {
      countdownMinutes: 25,
      countdownSeconds: 1500,
      intervalID: null,
      displayTimerMinutes: 25,
      displayTimerSeconds: 0,
      breakTimerMinutes: 5,
      breakTimerSeconds: 300,
      savedPomos: 3,
      numberOfPomos: 3,
      completedPomos: 0,
      onBreak: false
    }
  }

  handleSubmitTimer (event){
    event.preventDefault()
    if (this.state.intervalID === null){
    this.setState({
      intervalID: setInterval(this.updateValue.bind(this), 1000)})
  } else {
    clearInterval(this.state.intervalID)
    this.setState({
      intervalID: setInterval(this.updateValue.bind(this), 1000)
    })
  }
}

updateValue(){
    if(this.state.completedPomos < this.state.numberOfPomos)
    {this.setState({
        displayTimerMinutes: Math.floor((this.state.countdownSeconds - 1) / 60),
        countdownSeconds: this.state.countdownSeconds - 1,
        displayTimerSeconds: (this.state.countdownSeconds - 1) % 60
      })
    }

    if(this.state.countdownSeconds === 0
      && this.state.onBreak === false
      && (this.state.completedPomos < this.state.numberOfPomos)){
        this.setState({
          completedPomos: this.state.completedPomos + 1
        })
    }


    if (this.state.countdownSeconds === 0
        && this.state.onBreak === false
        && this.state.completedPomos < this.state.numberOfPomos){
        this.breakTimer()
    } else if(this.state.countdownSeconds === 0
      && this.state.onBreak === true
      && this.state.completedPomos < this.state.numberOfPomos){
      this.countdownTimer()
    } else if(this.state.completedPomos >= (this.state.numberOfPomos)){
      this.resetTimer()
    }
}

countdownTimer(){
  alert('Work time!')
  clearInterval(this.state.intervalID)
  this.setState({
    displayTimerMinutes: this.state.countdownMinutes,
    countdownSeconds: this.state.countdownMinutes * 60,
    intervalID: setInterval(this.updateValue.bind(this), 1000),
    onBreak: false
  })
}

breakTimer(){
  alert('Break time!')
  clearInterval(this.state.intervalID)
  this.setState({
    displayTimerMinutes: this.state.breakTimerMinutes,
    countdownSeconds: this.state.breakTimerSeconds,
    intervalID: setInterval(this.updateValue.bind(this), 1000),
    onBreak: true
  })
}

resetTimer(){
  alert('Well done!')
  clearInterval(this.state.intervalID)
  this.setState({
    countdownSeconds: this.state.countdownMinutes * 60,
    intervalID: null,
    displayTimerMinutes: this.state.countdownMinutes,
    displayTimerSeconds: 0,
    breakTimerSeconds: this.state.breakTimerMinutes * 60,
    numberOfPomos: this.state.savedPomos,
    completedPomos: 0,
    onBreak: false
  })
}

handleChangeTimer(event){
  event.preventDefault()
  this.setState({
    countdownMinutes: Number(event.target.value),
    countdownSeconds: Number(event.target.value) * 60,
    displayTimerMinutes: Number(event.target.value)
  })
}

handleChangeBreak(event){
  this.setState({
    breakTimerMinutes: Number(event.target.value),
    breakTimerSeconds: Number(event.target.value) * 60
  })
}

handleChangePomoNumber(event){

  this.setState({
    savedPomos: Number(event.target.value),
    numberOfPomos: Number(event.target.value)
  })
}

handleSubmit(event){
  event.preventDefault()
}



  render(){
    return(
      <div>
        <div>{this.state.displayTimerMinutes} m : {this.state.displayTimerSeconds} s</div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          Timer Minutes: <input type='number' min="0" max="60" defaultValue='25' onChange={this.handleChangeTimer.bind(this)} />
        </form>
        <form onSubmit={this.handleSubmit.bind(this)}>
          Break Minutes: <input type='number' min="0" max="20" defaultValue='5' onChange={this.handleChangeBreak.bind(this)} />
        </form>
        <form onSubmit={this.handleSubmit.bind(this)}>
          Number of Pomos: <input type='number' min="0" max="10" defaultValue='3' onChange={this.handleChangePomoNumber.bind(this)} />
        </form>
        Completed Pomos: {this.state.completedPomos} / {this.state.numberOfPomos}
        <form onSubmit={this.handleSubmitTimer.bind(this)}>
          <input type='submit' />
        </form>
    </div>)
  }
}

export default Pomodoro;
