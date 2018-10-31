import React, { Component } from 'react';
import styles from './Auth.module.css'
import Input from '../../components/UI/Input/Input';
import {updateObject} from '../../store/shared/utility';
import Button from '../../components/UI/Button/Button';
import {connect} from 'react-redux';
import * as action from '../../store/actions/index';
import {Redirect} from 'react-router-dom';


class Auth extends Component {
    state = {
        controls: {
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

    componentDidMount() {
        // if (this.props.authRedirect !== '/') {
        //     this.props.onSetAuthRedirect();
        // };
    }

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

    };

    submitHandler = (e, login) => {
        e.preventDefault();
        let wantsLogin = true;
        if(login === 'login') {
            wantsLogin = false
        }
        this.props.onAuth(this.state.controls.email.value, 
            this.state.controls.password.value,
                wantsLogin);
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    };


    render() {
        let authRedirect = null;
        console.log(this.props.isAuthenticated)
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={'/'} /> ;
        };
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
                    changed={(event) => this.inputChangeHandler(event, element.id)} />
        ));

        
       

        return(
           <form className={styles.Auth}>
                {authRedirect}
                   {form}
                   <Button click={this.submitHandler}>Submit</Button>
                   <Button click={(event) => this.submitHandler(event, 'login')}>Login</Button>
           </form>
        );
    }
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        // buildingBurger: state.brg.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(action.auth(email, password, isSignup)),
        onSetAuthRedirect: () => dispatch(action.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);