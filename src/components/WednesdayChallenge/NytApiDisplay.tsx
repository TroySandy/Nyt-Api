import React from "react";
type NytProps = {
    result: []
}

export default class NytApiDisplay extends React.Component<{}, NytProps> {
  constructor(props: NytProps) {
    super(props);
    this.state = {
      result: [],
    };
  }


  render() {
    return <div>
      {/* <h1>{this.props.result}</h1> */}
    </div>;
  }
}
