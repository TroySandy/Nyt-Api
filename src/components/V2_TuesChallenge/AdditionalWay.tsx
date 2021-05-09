import React from "react";
import { GeolocatedProps, geolocated } from "react-geolocated";
import OpenDisplay from "./OpenDisplay";

interface IProps {
  label: string;
}

class Extra extends React.Component<IProps & GeolocatedProps> {
  render(): JSX.Element {
    console.log(this.props);

    return (
      <div>
        <h4>Version 2: {this.props.label}</h4>
        {this.props.coords && <OpenDisplay
          latitude={this.props.coords && this.props.coords.latitude}
          longitude={this.props.coords && this.props.coords.longitude}
          />}
      
      </div>
    );
  }
}

export default geolocated()(Extra);
