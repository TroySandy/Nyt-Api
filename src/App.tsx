import React from "react";
import "./App.css";
import Clock from "./components/Clock/Clock";
import FetchChallenge from './components/TuesdayChallenge/TS_React_Challenge'
import Extra from './components/V2_TuesChallenge/AdditionalWay'
import NytApiSearch from './components/WednesdayChallenge/NytSearch'
let testProp: string = "Am I getting passed to the Clock component?";
let optionalProp: string = "You sure are!";

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <div className="verticalCenter">
        <Clock testProp={testProp} optionalProp={optionalProp} />
        <hr/>
        <FetchChallenge />
        <hr/>
        <Extra label={'Here is another way that I found'}/>
        <hr/>
        <NytApiSearch />
      </div>
    </div>
  );
};

export default App;
