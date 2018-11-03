import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import TriviaMain from './containers/TriviaMain/TriviaMain';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import SelectedCategory from './components/SelectedCategory/SelectedCategory';
import CompletedCategory from './components/UI/CompletedCategory/CompletedCategory';
import IncompleteCategory from './components/UI/IncompleteCategory/IncompleteCategory';
import Logout from './containers/Auth/Logout/Logout';
import Auth from './containers/Auth/Auth';
import * as actions from './store/actions/index';
import {connect} from 'react-redux';

import './App.css';


class App extends Component {
  componentDidMount() {
    // this.props.onTryAutoSignup();
  };
  
  render() {
    let routes = (
      <Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={Auth} />
        <Route path="/" component={Auth} />

    </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (<Switch>
        <Route path="/logout" component={Logout} />
        <Route path="/selected-category" search="id" component={SelectedCategory} />
        <Route path="/completed" component={CompletedCategory} />
        <Route path="/gameover" component={IncompleteCategory} />
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={TriviaMain} />
        <Redirect to="/" />
      </Switch>);
    }
    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
