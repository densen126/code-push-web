
import React, { useState } from 'react';
import {
    Col,
    Form,
    Button,
    Card,
} from 'react-bootstrap';

import _ from 'lodash';

interface Props {
    isFetching?: boolean;
    oldPassword: string;
    oldPasswordInputChange: (v: string) => void;
    newPassword: string;
    newPasswordInputChange: (v: string) => void;
    newPasswordConfirm: string;
    newPasswordConfirmInputChange: (v: string) => void;
    submit: () => void;
    error?: Record<string, any>;
}

function ChangePassword({
    isFetching = false,
    oldPassword = '',
    oldPasswordInputChange,
    newPassword = '',
    newPasswordInputChange,
    newPasswordConfirm = '',
    newPasswordConfirmInputChange,
    submit,
    error = {},
}: Props) {
    const [field1, setField1] = useState(false);
    const [field2, setField2] = useState(false);
    const [field3, setField3] = useState(false);

    const setOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        oldPasswordInputChange(e.target.value);
    };

    const setNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        newPasswordInputChange(e.target.value);
    };

    const setNewPasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
        newPasswordConfirmInputChange(e.target.value);
    };

    let isValidate = true;
    let oldPasswordTips = '';
    if (!oldPassword) {
        isValidate = false;
        oldPasswordTips = '请您输入旧密码';
    }
    let newPasswordTips = '';
    let newPasswordConfirmTips = '';
    if (newPassword.length < 6) {
        newPasswordTips = '请您输入6～22位字符或数字';
    }
    if (!_.isEqual(newPassword, newPasswordConfirm)) {
        isValidate = false;
        newPasswordConfirmTips = '两次输入的密码不一致';
    }
    let disabled = true;
    if (!isFetching && isValidate) {
        disabled = false;
    }

    return (
        <div style={{ height: 650, paddingLeft: 20, paddingRight: 20 }}>
            <Card style={{ maxWidth: 350, marginLeft: 'auto', marginRight: 'auto' }}>
                <Card.Header>修改密码</Card.Header>
                <Card.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>原密码</Form.Label>
                        <Form.Control
                            onChange={setOldPassword}
                            type="password"
                            value={oldPassword}
                            placeholder="请输入原密码"
                            onBlur={() => setField1(true)}
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group>
                        <div style={{ color: 'red' }}>{field1 ? oldPasswordTips : null}</div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>新密码</Form.Label>
                        <Form.Control
                            onChange={setNewPassword}
                            type="password"
                            value={newPassword}
                            placeholder="请您输入新的密码"
                            onBlur={() => setField2(true)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <div style={{ color: 'red' }}>{field2 ? newPasswordTips : null}</div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>确认新密码</Form.Label>
                        <Form.Control
                            onChange={setNewPasswordConfirm}
                            type="password"
                            value={newPasswordConfirm}
                            placeholder="请您再次输入新的密码"
                            onBlur={() => setField3(true)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <div style={{ color: 'red' }}>{field3 ? newPasswordConfirmTips : null}</div>
                    </Form.Group>
                    <Form.Group style={{ paddingTop: 20 }}>
                        <div style={{ color: 'red' }}>{_.get(error, 'message')}</div>
                    </Form.Group>
                    <Form.Group>
                        <Button
                            style={{ width: '100%' }}
                            variant="primary"
                            disabled={disabled}
                            onClick={() => {
                                if (disabled) {
                                    return;
                                }
                                submit();
                            }}
                        >
                            确认
                        </Button>
                    </Form.Group>
                </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ChangePassword;
