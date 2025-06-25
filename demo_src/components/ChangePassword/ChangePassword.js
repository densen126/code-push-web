
import React, { PropTypes, Component } from 'react';
import {
  Col,
  Form,
  Button,
  Card,
} from 'react-bootstrap';

import _ from 'lodash';

class ChangePassword extends Component {
  static propTypes = {
    isFetching: PropTypes.bool,
    oldPassword: PropTypes.string,
    oldPasswordInputChange: PropTypes.func,
    newPassword: PropTypes.string,
    newPasswordInputChange: PropTypes.func,
    newPasswordConfirm: PropTypes.string,
    newPasswordConfirmInputChange: PropTypes.func,
    submit: PropTypes.func,
    error: PropTypes.object,
  };

  static defaultProps = {
    isFetching: false,
    oldPassword: '',
    oldPasswordInputChange: (oldPassword)=>{},
    newPassword: '',
    newPasswordInputChange: (newPassword)=>{},
    newPasswordConfirm: '',
    newPasswordConfirmInputChange: (newPasswordConfirm)=>{},
    submit: ()=>{},
    error: {},
  };

  constructor(){
    super();
    this.state = {field1: false, field2: false, field3: false};
    this.setOldPassword = this.setOldPassword.bind(this);
    this.setNewPassword = this.setNewPassword.bind(this);
    this.setNewPasswordConfirm = this.setNewPasswordConfirm.bind(this);
  }

  setOldPassword(event) {
    this.props.oldPasswordInputChange(event.target.value);
  }

  setNewPassword(event) {
    this.props.newPasswordInputChange(event.target.value);
  }

  setNewPasswordConfirm(event) {
    this.props.newPasswordConfirmInputChange(event.target.value);
  }

  render() {
    const self = this;
    let isValidate = true;
    let oldPasswordTips = '';
    if (!this.props.oldPassword) {
      isValidate = false;
      oldPasswordTips = '请您输入旧密码';
    }
    let newPasswordTips = '';
    let newPasswordConfirmTips = '';
    if (this.props.newPassword.length < 6) {
      newPasswordTips = '请您输入6～22位字符或数字'
    }
    if (!_.eq(this.props.newPassword, this.props.newPasswordConfirm)) {
      isValidate = false;
      newPasswordConfirmTips = '两次输入的密码不一致'
    }
    var disabled = true;
    if (!this.props.isFetching && isValidate){
        disabled = false;
    }
    return (
      <div style={{height:650, paddingLeft: 20, paddingRight:20 }}>
        <Card style={{ maxWidth:350, marginLeft:"auto", marginRight: "auto" }}>
          <Card.Header>修改密码</Card.Header>
          <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label>原密码</Form.Label>
              <Form.Control
                onChange={this.setOldPassword}
                type="password"
                value={this.props.oldPassword}
                placeholder="请输入原密码"
                onBlur={()=>this.setState({field1: true})}
                autoFocus
              />
            </Form.Group>
            <Form.Group>
              <div style={{ color:'red' }} >
              {
                this.state.field1 ?
                oldPasswordTips
                : null
              }
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label>新密码</Form.Label>
              <Form.Control
                onChange={this.setNewPassword}
                type="password"
                value={this.props.newPassword}
                placeholder="请您输入新的密码"
                onBlur={()=>this.setState({field2: true})}
              />
            </Form.Group>
            <Form.Group>
              <div style={{ color:'red' }} >
              {
                this.state.field2 ?
                newPasswordTips
                : null
              }
              </div>
            </Form.Group>
             <Form.Group>
              <Form.Label>确认新密码</Form.Label>
              <Form.Control
                onChange={this.setNewPasswordConfirm}
                type="password"
                value={this.props.newPasswordConfirm}
                placeholder="请您再次输入新的密码"
                onBlur={()=>this.setState({field3: true})}
              />
            </Form.Group>
            <Form.Group>
              <div style={{ color:'red' }} >
              {
                this.state.field3 ?
                newPasswordConfirmTips
                : null
              }
              </div>
            </Form.Group>
            <Form.Group style={{ paddingTop: 20 }}>
              <div style={{ color:'red' }} >
              {_.get(this.props, 'error.message')}
              </div>
            </Form.Group>
            <Form.Group>
              <Button
                style={{width: "100%"}}
                variant="primary"
                disabled={disabled}
                onClick={()=>{
                  if (disabled) {
                    return;
                  }
                  self.props.submit();
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
}
export default ChangePassword;
