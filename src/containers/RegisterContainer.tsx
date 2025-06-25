import React, { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as registersActions from '../actions/registersActions';
import Register from '../components/Register';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAppDispatch, useAppSelector } from '../hooks';

export default function RegisterContainer() {
    const dispatch = useAppDispatch();
    const actions = useMemo(() => bindActionCreators({ ...registersActions }, dispatch), [dispatch]);
    const register = useAppSelector(state => _.get(state, 'register', {}));

    const email = _.get(register, 'email');
    const validateCode = _.get(register, 'validateCode');

    return (
        <div>
            <Header />
            <Register
                step={_.get(register, 'step', 1)}
                registerClean={actions.registerClean}
                email={email}
                emailInputChange={actions.registerChangeEmailInput}
                isSubmitStepOne={_.get(register, 'isCheckingEmail')}
                submitStepOne={() => actions.registerCheckEmail(email)}
                error={_.get(register, 'error')}
                isSending={_.get(register, 'isSending')}
                lastSendTime={_.get(register, 'lastSendTime', 0)}
                sendValidateCode={() => actions.registerSendValidateCode(email)}
                validateCode={validateCode}
                validateCodeInputChange={actions.registerChangeValidateCodeInput}
                isSubmitStepTwo={_.get(register, 'isSubmitStepTwo')}
                submitStepTwo={() => actions.registerCheckCodeExists(email, validateCode)}
                isSubmitStepThree={_.get(register, 'isSubmitStepThree')}
                password={_.get(register, 'password')}
                passwordInputChange={actions.registerChangePasswordInput}
                passwordConfirm={_.get(register, 'passwordConfirm')}
                passwordConfirmInputChange={actions.registerChangePasswordConfirmInput}
                submitStepThree={() => actions.register(email, _.get(register, 'password'), validateCode)}
            />
            <Footer />
        </div>
    );
}
