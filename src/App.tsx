import React from "react";
import "./App.css";
import NytApiSearch from './components/NytApi/NytSearch'

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <div className="verticalCenter">
        <NytApiSearch />
      </div>
    </div>
  );
};

export default App;
