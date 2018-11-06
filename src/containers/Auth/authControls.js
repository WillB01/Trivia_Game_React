export const authControls = {
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
                    isEmailValid: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
}
