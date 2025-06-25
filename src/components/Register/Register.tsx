import React from 'react';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Register.css';
import NavStep from './NavStep';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepDone from './StepDone';

export interface RegisterProps {
    step?: number;
    registerClean?: () => void;
    email?: string;
    emailInputChange?: (val: string) => void;
    isSubmitStepOne?: boolean;
    submitStepOne?: () => void;
    validateCode?: string;
    isSending?: boolean;
    lastSendTime?: number;
    sendValidateCode?: () => void;
    validateCodeInputChange?: (code: string) => void;
    isSubmitStepTwo?: boolean;
    submitStepTwo?: () => void;
    isSubmitStepThree?: boolean;
    password?: string;
    passwordInputChange?: (val: string) => void;
    passwordConfirm?: string;
    passwordConfirmInputChange?: (val: string) => void;
    submitStepThree?: () => void;
    error?: Record<string, any>;
}

function Register({
    step = 1,
    registerClean = () => {},
    email = '',
    emailInputChange = () => {},
    isSubmitStepOne = false,
    submitStepOne = () => {},
    validateCode = '',
    isSending = false,
    lastSendTime = 0,
    sendValidateCode = () => {},
    validateCodeInputChange = () => {},
    isSubmitStepTwo = false,
    submitStepTwo = () => {},
    isSubmitStepThree = false,
    password = '',
    passwordInputChange = () => {},
    passwordConfirm = '',
    passwordConfirmInputChange = () => {},
    submitStepThree = () => {},
    error = {},
}: RegisterProps) {
    React.useEffect(() => registerClean, []);

    let stepView: JSX.Element | null = null;
    if (step === 1) {
        stepView = (
            <StepOne
                isChecking={isSubmitStepOne}
                email={email}
                emailInputChange={emailInputChange}
                submit={submitStepOne}
                error={error}
            />
        );
    } else if (step === 2) {
        stepView = (
            <StepTwo
                isChecking={isSubmitStepTwo}
                validateCode={validateCode}
                validateCodeInputChange={validateCodeInputChange}
                isSending={isSending}
                lastSendTime={lastSendTime}
                sendValidateCode={sendValidateCode}
                submit={submitStepTwo}
                error={error}
            />
        );
    } else if (step === 3) {
        stepView = (
            <StepThree
                isFetching={isSubmitStepThree}
                password={password}
                passwordInputChange={passwordInputChange}
                passwordConfirm={passwordConfirm}
                passwordConfirmInputChange={passwordConfirmInputChange}
                submit={submitStepThree}
                error={error}
            />
        );
    } else if (step === 4) {
        stepView = <StepDone />;
    }
    return (
        <div className={s.root}>
            <div className={s.container}>
                <NavStep step={step} />
                {stepView}
            </div>
        </div>
    );
}

export default withStyles(s)(Register);
