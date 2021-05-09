import React from "react";
type FetchState = {
  name: string;
  temperature: number;
};

export default class FetchChallenge extends React.Component<{}, FetchState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      name: "",
      temperature: 0,
    };
  }

  componentDidMount() {
    const apiKey = "3a6285efac8a20e05a0b96a49962ac79";
 
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetch(
        `//api.openweathermap.org/data/2.5/weather?units=imperial&lat=${latitude}&lon=${longitude}&appid=${apiKey}`,
        { headers: {} }
      )
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            name: data.name,
            temperature: data.main.temp,
          });
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

export interface IWeatherDisplayProps {
  name: string;
  temperature: number;
}

const WeatherDisplay = (props: IWeatherDisplayProps) => {
  return (
    <div>
      It is currently {props.temperature}&deg;F in {props.name}
    </div>
  );
};
