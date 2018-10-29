import React, {Component} from 'react';

class Timer extends Component {
    constructor(props){
        super(props)
        this.state = {
          time: 0,
          isOn: false,
          start: 0
        }
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
      }

      startGame = () => {
        this.startTimer();
        this.props.click();
      }
      startTimer() {
        this.setState({
          isOn: true,
          time: this.state.time,
          start: Date.now() - this.state.time
        })
        this.timer = setInterval(() => this.setState({
          time: Date.now() - this.state.start
        }), 1);
      }
      stopTimer = () => {
        this.setState({isOn: false})
        clearInterval(this.timer)
      }
      resetTimer = () => {
        this.setState({time: 0, isOn: false})
      }
      render() {
        let seconds = Math.ceil(this.state.time);
        let start = (this.state.time == 0) ?
          <button onClick={this.startGame}>start</button> :
          null
        let stop = (this.state.time == 0 || !this.state.isOn) ?
          null :
          <button onClick={this.stopTimer}>stop</button>
        let resume = (this.state.time == 0 || this.state.isOn) ?
          null :
          <button onClick={this.startTimer}>resume</button>
        let reset = (this.state.time == 0 || this.state.isOn) ?
          null :
          <button onClick={this.resetTimer}>reset</button>
        return(
          <div>
            <h3>timer: {seconds}</h3>
            {start}
            {resume}
            {stop}
            {reset}
          </div>
        )
      }
    }
export default Timer;