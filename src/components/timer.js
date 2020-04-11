import React from 'react';
import moment from 'moment-timezone';
import Sound from '../helpers/sound';
import APP_DEFAULTS from '../constants/defaults';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: moment()
    }
    this.setCurrentTime = this.setCurrentTime.bind(this);
    this.checkTimeDifference = this.checkTimeDifference.bind(this);
    this.timerRef = React.createRef();
  }

  componentDidMount() {
    this.timerRef.current.click();
    this.initialTime = this.state.time;
    this.timerInterval = setInterval(this.setCurrentTime, 1000);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.timezone !== this.props.timezone) {
      clearInterval(this.timerInterval);
      this.initialTime = moment();
      this.timerInterval = setInterval(this.setCurrentTime, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  checkTimeDifference() {
    let currentTime = this.state.time;
    if ( moment(currentTime).diff( moment(this.initialTime), 'm' ) === 10) {
      Sound.emitSound();
      this.initialTime = currentTime;
    }
  }

  setCurrentTime() {
    this.setState({
      time: moment()
    }, this.checkTimeDifference);
  }

  render() {
    const { timezone } = this.props;
    var displayTime = moment(this.state.time).tz(timezone);
    let time = displayTime.format(APP_DEFAULTS.timeFormat);
    let meridiem = displayTime.format(APP_DEFAULTS.meridiemFormat);
    return (
      <div className="timer wd-200 d-flex" ref={this.timerRef}>
        <div className="child-flex time wd-100">{time}</div>
        <div className="child-flex meridiem">{meridiem}</div>
      </div>
    )
  }
}

export default Timer;