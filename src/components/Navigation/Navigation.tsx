
import React from 'react';
import _ from 'lodash';
import {
    Nav,
    Navbar,
    NavItem,
    NavDropdown,
    MenuItem,
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

    const loginView = <NavItem eventKey={4}>登录</NavItem>;
    const registerView = <NavItem eventKey={5}>注册</NavItem>;
    const personNav = (
        <NavDropdown eventKey={3} title="个人设置" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>修改密码</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.2}>安全退出</MenuItem>
        </NavDropdown>
    );

    return (
        <Navbar.Collapse>
            <Nav onSelect={handleSelect}>
                <NavItem eventKey={1}>应用管理</NavItem>
                <NavItem eventKey={2}>我的密钥</NavItem>
            </Nav>
            <Nav onSelect={handleSelect} pullRight>
                {isAuth ? personNav : null}
                {!isAuth ? loginView : null}
                {!isAuth ? registerView : null}
            </Nav>
        </Navbar.Collapse>
    );
}

export default Navigation;
