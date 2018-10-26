import React from 'react'


const progressBar = (props) => {
    const background = props.progressBar ? '#018E5B' : 'white';
    const progressBar = {
        background,
        height: '30px',
        width: `${props.progressBar}%`
    };
    
    return(<div style={progressBar}></div>);
};

export default progressBar;