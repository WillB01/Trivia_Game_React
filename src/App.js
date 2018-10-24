import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import TriviaMain from './containers/TriviaMain/TriviaMain';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <TriviaMain />
        </Layout>
      </div>
    );
  }
}

export default App;
