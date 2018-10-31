import React from 'react';

const input = (props) => {
    return (
        <React.Fragment>
            <label>{props.label}</label>
            <input type={props.type} 
                   placeholder={props.placeholder} 
                   value={props.value || ''} 
                   onChange={props.changed} />
        </React.Fragment>
       
    );
};

export default input