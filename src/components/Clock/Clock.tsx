import React from "react";
type ClockState = {
  time: Date;
};
type AcceptedProps = {
  testProp: string;
  optionalProp?: string
}

class Clock extends React.Component<AcceptedProps, ClockState> {
  state = {
      time: new Date(),
    };
  

  tick() {
    this.setState({
      time: new Date(),
    });
  }

  componentDidMount() {
    setInterval(() => this.tick(), 1000);
  }

  render() {
    return (
      <div>
        <h1>{this.state.time.toLocaleTimeString()}</h1>
        {/* <p>{this.props.testProp}</p>
        <p>{this.props.optionalProp}</p> */}
      </div>
    );
  }
}

export default Clock;
