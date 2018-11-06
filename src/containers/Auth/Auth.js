import React, { Component } from 'react';
import styles from './Auth.module.css'
import Input from '../../components/UI/Input/Input';
import {updateObject} from '../../store/shared/utility';
import Button from '../../components/UI/Button/Button';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import {Redirect} from 'react-router-dom';
import UserInputHelper from '../../components/UI/UserInputHelper/UserInputHelper';


class Auth extends Component {
    state = {
        controls: {
            name: {
                type: 'text',
                elementType: 'input',
                value: '',
                placeholder: 'name',
                focus: false,
                validation: {
                    isRequired: true,
                    maxLength: 100, 
                    isSignup: true,
                    isLogin: false,
                    minLength: 3
                },
                valid: false,
            },
                email: {
                    type: 'email',
                    elementType: 'input',
                    value: '',
                    placeholder: 'email',
                    focus: false,
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
                    focus: false,
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

    formJsx = (element) => (
        < Input key={element.id}
        type={element.id}
        elementType={element.config.elementType} 
        placeholder={element.config.placeholder}
        value={element.config.value}
        changed={(event) => this.inputChangeHandler(event, element.id)}
        id={element.id}
        isLogin={element.config.validation.isLogin} 
        touch={element.config.focus}
        error={this.props.error}/>
    );

    formArrayCreator = (controls) => {
        const formArray = []; 
        for (const item in controls) {
            formArray.push({id: item, config: controls[item]});
        }
        return formArray;
    };

    onFocusHandler = (id) => {
        // if (this.props.error) {
        //     const updatedForm = updateObject(this.state.controls, {
        //         [id]: {
        //             ...this.state.controls[id],
        //             focus: !this.state.controls[id].focus,
        //         }
        //     });
        //     this.setState({controls: updatedForm});
        // }
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

    checkIfSubmit = (inputFields) => {
        const amountOfRequiredFields = inputFields ? inputFields : 3;
        const formArray =  this.formArrayCreator(this.state.controls);
        let validArray = [];
        formArray.forEach((element) => {
            validArray.push({'bool': element.config.valid});
        });
        validArray = [...validArray.filter(item => item.bool === true)];
        
        return validArray.length === amountOfRequiredFields;
    } //checks that everything is valid of the fieldinputs

    inputChangeHandler = (e, id) => {
        const updatedForm = updateObject(this.state.controls, {
            [id]: {
                ...this.state.controls[id],
                value: e.target.value,
                valid: this.checkIfValid(e.target.value, this.state.controls[id].validation),
                focus: !this.state.controls[id].focus,
                validation: {
                    ...this.state.controls[id].validation
                }
            }
        });

        this.setState({controls: updatedForm});
      
    }; // gets the input value.

    submitHandler = (e, login) => {
        e.preventDefault();   
        const wantsLogin = login === 'login' ? false : true;
        if (this.checkIfSubmit()) {
            this.props.onAuth(this.state.controls.email.value, 
                this.state.controls.password.value,
                wantsLogin, this.state.controls.name.value)
        }
    };

    switchAuthModeHandler = (e) => {
        e.preventDefault();
        this.setState(prevState => ({isSignup: !prevState.isSignup}))};
    
    render() {
        const authRedirect = this.props.isAuthenticated ? <Redirect to={'/'} />  : null;
        const formArray = this.formArrayCreator(this.state.controls);
        const forms = this.state.isSignup 
        ? formArray.map(element => (element.config.validation.isSignup ? this.formJsx(element) : null))
        : formArray.map(element => (element.config.validation.isLogin ? this.formJsx(element) : null));

        return(
            // focus={formArray.filter((el, index) => {return el.config.focus === true})}
           <form className={styles.Auth}>
                {authRedirect}
                   {forms}
                    {this.props.error ? < UserInputHelper error={this.props.error} 
                                                          /> : null }
                   {this.state.isSignup ?  <Button click={this.submitHandler}
                                                   btnType={!this.checkIfSubmit(3) ? 'disabled': null }>Submit</Button>: null}
                   {this.state.isSignup ?  <Button click={this.switchAuthModeHandler}>got an account?</Button> : <Button click={(event) => 
                    this.submitHandler(event, 'login')}  btnType={!this.checkIfSubmit(2) ? 'disabled': null}>Login</Button>}
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