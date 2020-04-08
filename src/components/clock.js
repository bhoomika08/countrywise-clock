import React from 'react';
import DropdownSingle from '../shared-components/dropdown-single';
import Timer from './timer';
import COUNTRIES from '../constants/countries';
import DEFAULT_TEXT from '../constants/defaults';

class Clock extends React.Component {
  constructor() {
    super();
    this.state = {
      country: DEFAULT_TEXT.country,
    }
  }

  onChangeHandler = event => {
    this.setState({
      country: event.target.value,
    });
  }

  render() {
    return (
      <div className="d-flex">
        <div className="child-flex">
          <DropdownSingle
            value={this.state.country}
            onChange={this.onChangeHandler}
            options={COUNTRIES}
          />
        </div>
        <div className="child-flex">
          <Timer
            timezone={COUNTRIES[this.state.country].timezone}
          />
        </div>
      </div>
    )
  }
}

export default Clock;