import React from 'react';
import {
    Col,
    Form,
    Button,
    Card,
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
            <Card style={{ maxWidth: 350, marginLeft: 'auto', marginRight: 'auto' }}>
                <Card.Header>登录</Card.Header>
                <Card.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>邮箱地址</Form.Label>
                        <Form.Control
                            onChange={(e) => accountInputChange(e.target.value)}
                            value={account}
                            type="email"
                            placeholder="请输入邮箱地址"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>密码</Form.Label>
                        <Form.Control
                            onChange={(e) => passwordInputChange(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="请输入登录密码"
                        />
                    </Form.Group>
                    <Form.Group style={{ paddingTop: 20 }}>
                        <div style={{ color: 'red' }}>{error.errorMessage}</div>
                    </Form.Group>
                    <Form.Group>
                        <Button
                            style={{ width: '100%' }}
                            variant="primary"
                            onClick={handleSubmit}
                            disabled={isFetching}
                        >
                            {isFetching ? '登录中...' : '登录'}
                        </Button>
                    </Form.Group>
                    <Form.Group style={{ paddingTop: 28 }}>
                        <span style={{ marginRight: 20 }}>还没有账号?</span>
                        <Link to="/register">立即注册</Link>
                    </Form.Group>
                </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Login;
