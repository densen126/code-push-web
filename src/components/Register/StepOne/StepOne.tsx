import React from 'react';
import _ from 'lodash';
import validator from 'validator';
import {
    ControlLabel,
    Form,
    FormGroup,
    FormControl,
    Button,
} from 'react-bootstrap';
import Link from '../../Link';

export interface StepOneProps {
    isChecking?: boolean;
    email?: string;
    emailInputChange?: (email: string) => void;
    submit?: () => void;
    error?: Record<string, any>;
}

function StepOne({
    isChecking = false,
    email = '',
    emailInputChange = () => {},
    submit = () => {},
    error = {},
}: StepOneProps) {
    const emailIsValidate = validator.isEmail(email);
    const disabled = isChecking || !emailIsValidate;

    return (
        <Form style={{ maxWidth: 350, marginLeft: 'auto', marginRight: 'auto' }}>
            <FormGroup>
                <ControlLabel>邮箱地址</ControlLabel>
                <FormControl
                    onChange={(e) => emailInputChange(e.target.value)}
                    value={email}
                    type="email"
                    placeholder="请输入邮箱地址"
                    autoComplete="off"
                    autoFocus
                />
            </FormGroup>
            <FormGroup style={{ paddingTop: 20 }}>
                <div style={{ color: 'red' }}>{_.get(error, 'message')}</div>
            </FormGroup>
            <FormGroup>
                <Button
                    style={{ width: '100%' }}
                    bsStyle="primary"
                    onClick={() => {
                        if (!disabled) {
                            submit();
                        }
                    }}
                    disabled={disabled}
                >
                    下一步
                </Button>
            </FormGroup>
            <FormGroup style={{ paddingTop: 28, textAlign: 'center' }}>
                <Link to="/login">已有帐号</Link>
            </FormGroup>
        </Form>
    );
}

export default StepOne;
