import React from 'react';

const userInputHelper = (props) => {
    // let b = props.focus.filter(element => (element. === true));
    // console.log(b);
    // console.log(props.focus !== [] ? props.focus[0].config.focus : null )
    // const msg = props.focus[0]?  props.focus[0].config.focus : props.error.message;
    return (
        <div>{props.error.message}</div>
    )
};

export default userInputHelper;