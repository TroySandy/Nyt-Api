import React from "react";
type FetchState = {
  name: string;
  temperature: number;
};

interface IProps {
  latitude: number;
  longitude: number;
}

export default class OpenDisplay extends React.Component<IProps, FetchState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      name: "",
      temperature: 0,
    };
  }

  componentDidMount() {
    const apiKey = "3a6285efac8a20e05a0b96a49962ac79";
    console.log(this.props);
    
    
    fetch(
      `//api.openweathermap.org/data/2.5/weather?units=imperial&lat=${this.props.latitude}&lon=${this.props.longitude}&appid=${apiKey}`,
      { headers: {} }
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          name: data.name,
          temperature: data.main.temp,
        });
      });
  }

  render() {
    return (
      <>
        <WeatherDisplay
          name={this.state.name}
          temperature={this.state.temperature}
        />
      </>
    );
  }
}

export interface WeatherDisplayProps {
  name: string;
  temperature: number;
}

const WeatherDisplay = (props: WeatherDisplayProps) => {
  return (
    <div>
      It is currently {props.temperature}&deg;F in {props.name}
    </div>
  );
};
