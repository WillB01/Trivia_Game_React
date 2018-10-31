import React, { Component } from 'react';
import styles from './Auth.module.css'
import Input from '../../components/UI/Input/Input';
import {updateObject} from '../../store/shared/utility';

class Auth extends Component {
    state = {
        controls: {
                username: {
                    type: 'text',
                    elementType: 'input',
                    value: '',
                    placeholder: 'username',
                    validation: {
                        isRequired: true,
                        maxLength: 20,
                    },
                    valid: false,
                    
                },
                email: {
                    type: 'email',
                    elementType: 'input',
                    value: '',
                    placeholder: 'email',
                    validation: {
                        isRequired: true,
                        isEmail: true,
                        maxLength: 100
                    },
                    valid: false,
                },
                password: {
                    type: 'password',
                    elementType: 'input',
                    value: '',
                    placeholder: 'password',
                    validation: {
                        isRequired: true,
                        minLength: 6
                    },
                    valid: false,
                }

            },
            isSignup: true
            
    };

    checkIfValid = (value, validation) => {
        console.log(validation);
        let isValid = true;
        if (validation.isRequired) {
            isValid = value.trim() !== '' && isValid;
        }  
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid;
        }
        if (validation.maxLength) {
            isValid = value.length <= validation.maxLength && isValid;
        }

        return isValid;
    };

    inputChangeHandler = (e, id) => {
        console.log(e.target.value);
        const updatedForm = updateObject(this.state.controls, {
            [id]: {
                ...this.state.controls[id],
                value: e.target.value,
                valid: this.checkIfValid(e.target.value, this.state.controls[id].validation),
                validation: {
                    ...this.state.controls[id].validation
                }
            }
        });

     
        this.setState({controls: updatedForm});

    }
    render() {
        console.log(this.state.controls);
        const formArray = [];
        for (const item in this.state.controls) {
            formArray.push({id: item, config: this.state.controls[item]});
        }

        const form = formArray.map(element => (
            < Input key={element.id}
                    type={element.id}
                    elementType={element.config.elementType} 
                    placeholder={element.config.placeholder}
                    value={element.config.value}
                    changed={(event) => this.inputChangeHandler(event, element.id)}
                    />
        ));
       

        return(
           <form className={styles.Auth}>
                   {form}
           </form>
        );
    }
};

export default Auth;