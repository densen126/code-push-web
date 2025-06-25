
import React, { PropTypes, Component } from 'react';
import {
  Modal,
  Button,
  Form,
  Col,
  OverlayTrigger,
  Popover
} from 'react-bootstrap';
import _ from 'lodash';

const popoverFocus = (
  <Popover id="popover-trigger-focus">
    只能包含字母和数字
  </Popover>
);
class PopAddApp extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    isOnSubmiting: PropTypes.bool,
    close: PropTypes.func,
    input: PropTypes.func,
    errorTip: PropTypes.string,
    showModal: PropTypes.bool,
    isShowNameError: PropTypes.bool,
    isShowOSError: PropTypes.bool,
    isShowPlatformError: PropTypes.bool,
    os: PropTypes.string,
    platform: PropTypes.string,
    appName: PropTypes.string,
  };

  static defaultProps = {
    onSubmit: (name)=>{},
    isOnSubmiting: false,
    close: ()=>{},
    input: ()=>{},
    errorTip: '',
    showModal: false,
    isShowNameError: false,
    isShowOSError: false,
    isShowPlatformError: false,
    os: '',
    platform: '',
    appName: '',
  };

  constructor() {
    super();
    this.close = this.close.bind(this);
    this.setName = this.setName.bind(this);
    this.validateName = this.validateName.bind(this);
    this.setSelect = this.setSelect.bind(this);
    this.setPlatformSelect = this.setPlatformSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  setPlatformSelect(event){
    let select = event.target.value;
    this.props.input({platform:select});
  }

  setSelect(event){
    let select = event.target.value;
    this.props.input({os:select});
  }

  setName(event){
    let name = event.target.value;
    this.props.input({appName:name});
  }

  validateName(name) {
    const REGEX = /^\w+$/;
    if (REGEX.test(name)) {
      this.setState({isShowNameError:false});
    } else {
      this.setState({isShowNameError:true});
    }
  }

  onSubmit(){
    if (this.props.isOnSubmiting) {
      return;
    }
    this.props.onSubmit();
  }

  close() {
    this.props.close();
  }

  render() {
    return (
      <Modal show={this.props.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>添加App</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group style={{display: 'inline-block',width: '40%'}} controlId="appName" isInvalid={this.props.isShowNameError}>
              <Form.Label>App名字</Form.Label>
              <OverlayTrigger trigger={["hover"]} placement="bottom" overlay={popoverFocus}>
              <Form.Control
                type="text"
                onChange={this.setName}
                value={this.props.appName}
                autoFocus
              />
              </OverlayTrigger>
              <Form.Control.Feedback type="invalid" />
            </Form.Group>
            <Form.Group style={{display: 'inline-block',width: '20%',paddingLeft: 15}} controlId="os" isInvalid={this.props.isShowOSError}>
              <Form.Label>平台</Form.Label>
              <Form.Select value={this.props.os} onChange={this.setSelect}>
                <option value="">选择平台</option>
                <option value="iOS">iOS</option>
                <option value="Android">Android</option>
                <option value="Windows">Windows</option>
              </Form.Select>
            </Form.Group>
            <Form.Group style={{display: 'inline-block',width: '20%',paddingLeft: 15}} controlId="platform" isInvalid={this.props.isShowPlatformError}>
              <Form.Label>类型</Form.Label>
              <Form.Select value={this.props.platform} onChange={this.setPlatformSelect}>
                <option value="">选择类型</option>
                <option value="React-Native">React-Native</option>
                <option value="Cordova">Cordova</option>
              </Form.Select>
            </Form.Group>
            <Form.Group isInvalid>
              <Form.Text className="text-danger">{this.props.errorTip}</Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>关闭</Button>
            <Button onClick={this.onSubmit} disabled={this.props.isOnSubmiting ? true : false} >确定</Button>
          </Modal.Footer>
      </Modal>
    )
  }
}
export default PopAddApp;
