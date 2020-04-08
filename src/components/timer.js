import React from 'react';
import moment from 'moment-timezone';
import DEFAULT_TEXT from '../constants/defaults';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
    }
    this.getCurrentTime = this.getCurrentTime.bind(this);
    this.checkTimeDifference = this.checkTimeDifference.bind(this);
    this.timerRef = React.createRef();
  }

  componentDidMount() {
    this.timerRef.current.click();
    this.initialTime = this.state.time;
    this.timerInterval = setInterval(this.getCurrentTime, 1000);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.timezone !== this.props.timezone) {
      this.clearTimer(this.timerInterval);
      this.initialTime = new Date();
      this.timerInterval = setInterval(this.getCurrentTime, 1000);
    }
  }

  componentWillUnmount() {
    this.clearTimer(this.timerInterval);
  }

  clearTimer(interval) {
    clearInterval(interval);
  }

  emitSound = () => {
    var utterMessage = new SpeechSynthesisUtterance(DEFAULT_TEXT.soundMessage);
    window.speechSynthesis.speak(utterMessage);
  }

  checkTimeDifference() {
    let currentTime = new Date();
    let totalCurrentTimeMinutes = currentTime.getHours() * 60 + currentTime.getMinutes() * 60;
    let totalInitialTimeMinutes = this.initialTime.getHours() * 60 + this.initialTime.getMinutes() * 60;
    if (totalCurrentTimeMinutes - totalInitialTimeMinutes === 10) {
      this.emitSound();
      this.initialTime = currentTime;
    }
  }

  getCurrentTime() {
    this.setState({
      time: new Date(),
    }, this.checkTimeDifference);
  }

  render() {
    const { timezone } = this.props;
    var timeZone = moment(this.state.time);
    let displayTime = timeZone.tz(timezone).format(DEFAULT_TEXT.timeZoneFormat)
    let index = displayTime.indexOf(" ");
    let time = displayTime.slice(0, index);
    let meridiem = displayTime.slice(index, displayTime.length);
    return (
      <div className="timer wd-200 d-flex" ref={this.timerRef}>
        <div className="child-flex time-span wd-100">{time}</div>
        <div className="child-flex meridiem-span">{meridiem}</div>
      </div>
    )
  }
}

export default Timer;