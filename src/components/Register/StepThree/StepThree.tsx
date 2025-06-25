import React, { useState } from 'react';
import _ from 'lodash';
import { ControlLabel, Form, FormGroup, FormControl, Button } from 'react-bootstrap';

export interface StepThreeProps {
    isFetching?: boolean;
    password?: string;
    passwordInputChange?: (password: string) => void;
    passwordConfirm?: string;
    passwordConfirmInputChange?: (value: string) => void;
    submit?: () => void;
    error?: Record<string, any>;
}

function StepThree({
    isFetching = false,
    password = '',
    passwordInputChange = () => {},
    passwordConfirm = '',
    passwordConfirmInputChange = () => {},
    submit = () => {},
    error = {},
}: StepThreeProps) {
    const [field1, setField1] = useState(false);
    const [field2, setField2] = useState(false);

    const setInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setField1(true);
        passwordInputChange(e.target.value);
    };

    const setInputPasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setField2(true);
        passwordConfirmInputChange(e.target.value);
    };

    let passwordTips = '';
    let passwordConfirmTips = '';
    if (field1 && password.length < 6) {
        passwordTips = '密码长度至少为6位';
    }
    if (field2 && !_.isEqual(passwordConfirm, password)) {
        passwordConfirmTips = '确认密码和密码不一致';
    }
    const isValidate = password.length >= 6 && _.isEqual(passwordConfirm, password);
    const disabled = isFetching || !isValidate;

    return (
        <Form style={{ maxWidth: 350, marginLeft: 'auto', marginRight: 'auto' }}>
            <FormGroup>
                <ControlLabel>密码</ControlLabel>
                <FormControl
                    onChange={setInputPassword}
                    onBlur={() => setField1(true)}
                    value={password}
                    type="password"
                    placeholder="请输入密码"
                    autoComplete="off"
                    autoFocus
                />
            </FormGroup>
            <FormGroup>
                <div style={{ color:'red' }}>
                    {passwordTips}
                </div>
            </FormGroup>

            <FormGroup>
                <ControlLabel>确认密码</ControlLabel>
                <FormControl
                    onChange={setInputPasswordConfirm}
                    onBlur={() => setField2(true)}
                    type="password"
                    value={passwordConfirm}
                    placeholder="请再次输入密码"
                    autoComplete="off"
                />
            </FormGroup>
            <FormGroup>
                <div style={{ color:'red' }}>
                    {passwordConfirmTips}
                </div>
            </FormGroup>
            <FormGroup style={{ paddingTop: 20 }}>
                <div style={{ color:'red' }}>
                    {_.get(error, 'message')}
                </div>
            </FormGroup>
            <FormGroup>
                <Button
                    style={{width: '100%'}}
                    bsStyle="primary"
                    onClick={() => {
                        if (!disabled) {
                            submit();
                        }
                    }}
                    disabled={disabled}
                >
          注册
                </Button>
            </FormGroup>
        </Form>
    );
}

export default StepThree;
