import React, { PropTypes, Component } from 'react';
import _ from 'lodash';
import {
  Col,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import Link from '../Link';

class Login extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    account: PropTypes.string,
    password: PropTypes.string,
    accountInputChange: PropTypes.func,
    passwordInputChange: PropTypes.func,
    submit: PropTypes.func,
    error: PropTypes.object
  };
  static defaultProps = {
    isFetching: false,
    account: '',
    accountInputChange: (account)=>{},
    password: '',
    passwordInputChange: (password)=>{},
    submit: (account, password)=>{},
    error: {}
  };
  constructor() {
    super();
    this.setInputAccount = this.setInputAccount.bind(this);
    this.setInputPassword = this.setInputPassword.bind(this);
    this.submit = this.submit.bind(this);
  }
  submit() {
    if (this.props.isFetching) {
      return;
    }
    this.props.submit();
  }

  setInputAccount(event) {
    this.props.accountInputChange(event.target.value);
  }

  setInputPassword(event) {
    this.props.passwordInputChange(event.target.value);
  }

  render() {
    return (
      <div style={{height:650, paddingLeft: 20, paddingRight:20 }}>
        <Card style={{ maxWidth:350, marginLeft:"auto", marginRight: "auto" }}>
          <Card.Header>登录</Card.Header>
          <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label>邮箱地址</Form.Label>
              <Form.Control
                onChange={this.setInputAccount}
                value={this.props.account}
                type="email"
                placeholder="请输入邮箱地址"
                autoFocus
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>密码</Form.Label>
              <Form.Control
                onChange={this.setInputPassword}
                value={this.props.password}
                type="password"
                placeholder="请输入登录密码"
              />
            </Form.Group>
            <Form.Group style={{ paddingTop: 20 }}>
              <div style={{ color:'red' }} >
              {_.get(this.props, 'error.errorMessage')}
              </div>
            </Form.Group>
            <Form.Group>
              <Button
                style={{width: "100%"}}
                variant="primary"
                onClick={this.submit}
                disabled={this.props.isFetching}
              >
              {this.props.isFetching ? '登录中...' : '登录'}
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
}
export default Login;
