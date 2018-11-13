import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';
import { Redirect} from 'react-router-dom';

export class Logout extends Component {
    componentDidMount() {
        this.props.onLogout(this.props.triviaMain);
    };

  render() {
   return  <Redirect to="/auth" /> ;
  };
};

const mapStateToProps = (state) => {
    return {
        triviaMain: state.triviaMain
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: (triviaMain) => dispatch(actions.logout(triviaMain)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
