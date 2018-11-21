import React, {Component} from 'react'
import {connect} from 'react-redux';

class ProgressBar extends Component {
    state = {
        correct: false
    };
   
    render() {
        const background = this.props.progressBar ? '#018E5B' : 'white';
        const progressBar = {
        background,
        height: '30px',
        width: `${this.props.progressBar}%`
        };
       
        return(<div style={progressBar}></div>);};
}
    
const mapStateToProps = state => {
    return {
        progressBar: state.selectedCategory.progressBar
    };
};

export default connect(mapStateToProps)(ProgressBar);