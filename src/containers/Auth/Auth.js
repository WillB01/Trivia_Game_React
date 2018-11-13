import React, { Component } from 'react';
import styles from './Auth.module.css'
import Input from '../../components/UI/Input/Input';
import {updateObject} from '../../store/shared/utility';
import Button from '../../components/UI/Button/Button';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import {Redirect} from 'react-router-dom';
import UserInputHelper from '../../components/UI/UserInputHelper/UserInputHelper';
import AuthHeader from '../../components/UI/AuthHeader/AuthHeader';
import {authControls} from './authControls'; //different input elements and config
import Instructions from '../../components/UI/Instructions/Instructions';



class Auth extends Component {
    state = {
       ...authControls, //imported 
       loginInputFields: 2,
       newUserInputFields: 3
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
        error={this.props.error}
        btnType={this.inputCssClass(element.id)} />
    );

    inputCssClass = (id) => {
        const isInputNameValid = this.controlsValidArray()[0].name;
        const isInputEmailValid =  this.controlsValidArray()[1].email;
        const isInputPasswordValid =  this.controlsValidArray()[2].password;
        if (id === 'name' && isInputNameValid || id === 'email' && isInputEmailValid || id === 'password' && isInputPasswordValid){
            return 'Valid';
        }

        return '';
      
        
    };

    formArrayCreator = (controls) => {
        const formArray = []; 
        for (const item in controls) {
            formArray.push({id: item, config: controls[item]});
        }
        return formArray;
    }; // creates an array of objects from the controls

    controlsValidArray = () => {
        const formArray =  this.formArrayCreator(this.state.controls);
        let validArray = [];
        formArray.forEach((element) => {
            validArray.push({
                'bool': element.config.valid,
                [element.id]: element.config.valid
        });
        });
        return validArray;
    }; // creates an array of obj with the specific valid value from state.authControls/ controls

   
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
        if (validation.isEmailValid) {
            isValid = validation.isEmailValid.test((String(value).toLowerCase())) && isValid;
        }
        
         return isValid;
    }; // checks validation for the input fields.

    checkIfSubmit = (inputFields) => {
        const amountOfRequiredFields = inputFields ? inputFields : 3;
        const validArray = [...this.controlsValidArray().filter(item => item.bool === true)];
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
        const loginFields = this.state.loginInputFields;
        const newPlayerFields = this.state.newUserInputFields;
        const wantsLogin = login === 'login' ? false : true;
        const amountOfFields = login === 'login' ? loginFields : newPlayerFields;
        if (this.checkIfSubmit(amountOfFields)) {
            this.props.onAuth(this.state.controls.email.value, 
                this.state.controls.password.value,
                wantsLogin, this.state.controls.name.value)
        }
    };

    switchAuthModeHandler = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            ...authControls,
            isSignup: !prevState.isSignup
        }))};
    
    render() {
        const authRedirect = this.props.isAuthenticated ? <Redirect to={'/'} />  : null;
        const welcomeMsg = this.state.isSignup ? '  Create an account to play the most awsome game ever!' : 'Welcome Back'
        const formArray = this.formArrayCreator(this.state.controls);
        const forms = this.state.isSignup 
        ? formArray.map(element => (element.config.validation.isSignup ? this.formJsx(element) : null))
        : formArray.map(element => (element.config.validation.isLogin ? this.formJsx(element) : null));

        return(
            // focus={formArray.filter((el, index) => {return el.config.focus === true})}
            <div className={styles.AuthContainer}>
                 {this.state.isSignup ? < Instructions /> : null }
            <form className={styles.Auth}>
            <AuthHeader />
           
                    {authRedirect}
                        <div>
                            <h5>
                            {welcomeMsg}
                            </h5>
                        </div>
                
                    {forms}
                        {this.props.error ? < UserInputHelper error={this.props.error} 
                                                            /> : null }
                    
                    <div className={styles.ButtonContainer}>
                        {this.state.isSignup ?  <Button click={this.submitHandler}
                                                        btnType={!this.checkIfSubmit(this.state.newUserInputFields) ? 'disabled': null }>Submit</Button>: null}
                        {this.state.isSignup ?  <Button click={this.switchAuthModeHandler}>got an account?</Button> : <Button click={(event) => 
                            this.submitHandler(event, 'login')}  btnType={!this.checkIfSubmit(this.state.loginInputFields) ? 'disabled': null}>Login</Button>}
                        {!this.state.isSignup ?  <Button click={this.switchAuthModeHandler}>create new?</Button> : null}
                    </div>
                    
            </form>
           </div>
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);