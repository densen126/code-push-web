
import React from 'react';
import {
    Modal,
    Button,
    Form,
    Col,
    OverlayTrigger,
    Popover,
} from 'react-bootstrap';

const popoverFocus = (
    <Popover id="popover-trigger-focus">只能包含字母和数字</Popover>
);

export interface PopAddAppProps {
    onSubmit?: () => void;
    isOnSubmiting?: boolean;
    close?: () => void;
    input?: (val: Record<string, string>) => void;
    errorTip?: string;
    showModal?: boolean;
    isShowNameError?: boolean;
    isShowOSError?: boolean;
    isShowPlatformError?: boolean;
    os?: string;
    platform?: string;
    appName?: string;
}

function PopAddApp({
    onSubmit = () => {},
    isOnSubmiting = false,
    close = () => {},
    input = () => {},
    errorTip = '',
    showModal = false,
    isShowNameError = false,
    isShowOSError = false,
    isShowPlatformError = false,
    os = '',
    platform = '',
    appName = '',
}: PopAddAppProps) {
    const setPlatformSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        input({ platform: event.target.value });
    };

    const setSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        input({ os: event.target.value });
    };

    const setName = (event: React.ChangeEvent<HTMLInputElement>) => {
        input({ appName: event.target.value });
    };

    const handleSubmit = () => {
        if (isOnSubmiting) return;
        onSubmit();
    };

    return (
        <Modal show={showModal} onHide={close}>
            <Modal.Header closeButton>
                <Modal.Title>添加App</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group style={{ display: 'inline-block', width: '40%' }}>
                    <Form.Label>App名字</Form.Label>
                    <OverlayTrigger trigger={["hover"]} placement="bottom" overlay={popoverFocus}>
                        <Form.Control type="text" onChange={setName} value={appName} autoFocus isInvalid={isShowNameError} />
                    </OverlayTrigger>
                    <Form.Control.Feedback type="invalid" />
                </Form.Group>
                <Form.Group style={{ display: 'inline-block', width: '20%', paddingLeft: 15 }}>
                    <Form.Label>平台</Form.Label>
                    <Form.Select value={os} onChange={setSelect} isInvalid={isShowOSError}>
                        <option value="">选择平台</option>
                        <option value="iOS">iOS</option>
                        <option value="Android">Android</option>
                        <option value="Windows">Windows</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group style={{ display: 'inline-block', width: '20%', paddingLeft: 15 }}>
                    <Form.Label>类型</Form.Label>
                    <Form.Select value={platform} onChange={setPlatformSelect} isInvalid={isShowPlatformError}>
                        <option value="">选择类型</option>
                        <option value="React-Native">React-Native</option>
                        <option value="Cordova">Cordova</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Text className="text-danger">{errorTip}</Form.Text>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={close}>关闭</Button>
                <Button onClick={handleSubmit} disabled={isOnSubmiting}>确定</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PopAddApp;
