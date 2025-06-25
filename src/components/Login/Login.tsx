import React from 'react';
import {
    Col,
    ControlLabel,
    Form,
    FormGroup,
    FormControl,
    Checkbox,
    Button,
    Panel,
} from 'react-bootstrap';
import Link from '../Link';

export interface LoginProps {
    isFetching?: boolean;
    account?: string;
    password?: string;
    accountInputChange?: (account: string) => void;
    passwordInputChange?: (password: string) => void;
    submit?: () => void;
    error?: Record<string, any>;
}

function Login({
    isFetching = false,
    account = '',
    password = '',
    accountInputChange = () => {},
    passwordInputChange = () => {},
    submit = () => {},
    error = {},
}: LoginProps) {
    const handleSubmit = () => {
        if (isFetching) return;
        submit();
    };

    return (
        <div style={{ height: 650, paddingLeft: 20, paddingRight: 20 }}>
            <Panel header="登录" style={{ maxWidth: 350, marginLeft: 'auto', marginRight: 'auto' }}>
                <Form>
                    <FormGroup>
                        <ControlLabel>邮箱地址</ControlLabel>
                        <FormControl
                            onChange={(e) => accountInputChange(e.target.value)}
                            value={account}
                            type="email"
                            placeholder="请输入邮箱地址"
                            autoFocus
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>密码</ControlLabel>
                        <FormControl
                            onChange={(e) => passwordInputChange(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="请输入登录密码"
                        />
                    </FormGroup>
                    <FormGroup style={{ paddingTop: 20 }}>
                        <div style={{ color: 'red' }}>{error.errorMessage}</div>
                    </FormGroup>
                    <FormGroup>
                        <Button
                            style={{ width: '100%' }}
                            bsStyle="primary"
                            onClick={handleSubmit}
                            disabled={isFetching}
                        >
                            {isFetching ? '登录中...' : '登录'}
                        </Button>
                    </FormGroup>
                    <FormGroup style={{ paddingTop: 28 }}>
                        <span style={{ marginRight: 20 }}>还没有账号?</span>
                        <Link to="/register">立即注册</Link>
                    </FormGroup>
                </Form>
            </Panel>
        </div>
    );
}

export default Login;
