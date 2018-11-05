import React, { Component } from 'react';
import styles from './Auth.module.css'
import Input from '../../components/UI/Input/Input';
import {updateObject} from '../../store/shared/utility';
import Button from '../../components/UI/Button/Button';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import {Redirect} from 'react-router-dom';


class Auth extends Component {
    state = {
        controls: {
            name: {
                type: 'text',
                elementType: 'input',
                value: '',
                placeholder: 'name',
                validation: {
                    isRequired: false,
                    maxLength: 100, 
                    isSignup: true,
                    isLogin: false,
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
                        maxLength: 100,
                        isSignup: true,
                        isLogin: true,
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
                        minLength: 6,
                        isSignup: true,
                        isLogin: true,
                    },
                    valid: false,
                }

            },
            isSignup: true     
    };


    checkIfValid = (value, validation) => {
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
    }; // checks validation för the input fields.

    inputChangeHandler = (e, id) => {
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
    }; // gets the input value.

    submitHandler = (e, login) => {
        e.preventDefault();
        let wantsLogin = login === 'login' ? false : true;
        this.props.onAuth(this.state.controls.email.value, 
            this.state.controls.password.value,
                wantsLogin, this.state.controls.name.value);
    };

    switchAuthModeHandler = (e) => {
        e.preventDefault();
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    };

    
    render() {
        let authRedirect = null;
    
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={'/'} /> ;
        };

        const formArray = [];
        for (const item in this.state.controls) {
            formArray.push({id: item, config: this.state.controls[item]});
        }
        let forms = this.state.isSignup 
        ?  formArray.map(element => {
            if (element.config.validation.isSignup) {
                return( < Input key={element.id}
                 type={element.id}
                 elementType={element.config.elementType} 
                 placeholder={element.config.placeholder}
                 value={element.config.value}
                 changed={(event) => this.inputChangeHandler(event, element.id)}
                 label={element.id}
                 isLogin={element.config.validation.isLogin} />);
            }
         })
         : formArray.map(element => {
            if (element.config.validation.isLogin) {
                return( < Input key={element.id}
                 type={element.id}
                 elementType={element.config.elementType} 
                 placeholder={element.config.placeholder}
                 value={element.config.value}
                 changed={(event) => this.inputChangeHandler(event, element.id)}
                 label={element.id}
                 isLogin={element.config.validation.isLogin} />);
            }
         });

    
        return(
           <form className={styles.Auth}>
                {authRedirect}
                   {forms}
                   {this.state.isSignup ?  <Button click={this.submitHandler}>Submit</Button> : null}
                   {this.state.isSignup ?  <Button click={this.switchAuthModeHandler}>got an account?</Button> : <Button click={(event) => this.submitHandler(event, 'login')}>Login</Button>}
                   {!this.state.isSignup ?  <Button click={this.switchAuthModeHandler}>create new?</Button> : null}
           </form>
        );
    }
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        triviaMain: state.triviaMain
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup, name) => dispatch(actions.auth(email, password, isSignup, name)),
        onTryAutoSignup: (triviaMain) => dispatch(actions.authCheckState(triviaMain)),
        // onSetAuthRedirect: () => dispatch(action.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);