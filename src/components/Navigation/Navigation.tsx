
import React from 'react';
import _ from 'lodash';
import {
    Nav,
    Navbar,
    NavDropdown,
} from 'react-bootstrap';
import history from '../../core/history';

export interface NavigationProps {
    className?: string;
    isAuth?: boolean;
}

function Navigation({ isAuth }: NavigationProps) {
    const handleSelect = (selectedKey: number | string | null) => {
        if (selectedKey === 1) {
            history.push('/apps');
        } else if (selectedKey === 2) {
            history.push('/accessKeys');
        } else if (selectedKey === 3.1) {
            history.push('/users/settings');
        } else if (selectedKey === 3.2) {
            history.push('/logout');
        } else if (selectedKey === 4) {
            history.push('/login');
        } else if (selectedKey === 5) {
            history.push('/register');
        }
    };

    const loginView = (
        <Nav.Item>
            <Nav.Link eventKey={4}>登录</Nav.Link>
        </Nav.Item>
    );
    const registerView = (
        <Nav.Item>
            <Nav.Link eventKey={5}>注册</Nav.Link>
        </Nav.Item>
    );
    const personNav = (
        <NavDropdown title="个人设置" id="basic-nav-dropdown">
            <NavDropdown.Item eventKey={3.1}>修改密码</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item eventKey={3.2}>安全退出</NavDropdown.Item>
        </NavDropdown>
    );

    return (
        <Navbar.Collapse>
            <Nav onSelect={handleSelect}>
                <Nav.Item>
                    <Nav.Link eventKey={1}>应用管理</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={2}>我的密钥</Nav.Link>
                </Nav.Item>
            </Nav>
            <Nav onSelect={handleSelect} className="ms-auto">
                {isAuth ? personNav : null}
                {!isAuth ? loginView : null}
                {!isAuth ? registerView : null}
            </Nav>
        </Navbar.Collapse>
    );
}

export default Navigation;
