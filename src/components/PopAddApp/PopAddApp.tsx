
import React from 'react';
import {
    Modal,
    Button,
    FormGroup,
    FormControl,
    HelpBlock,
    ControlLabel,
    Col,
    OverlayTrigger,
    Popover
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
                <FormGroup style={{ display: 'inline-block', width: '40%' }} validationState={isShowNameError ? 'error' : undefined}>
                    <ControlLabel>App名字</ControlLabel>
                    <OverlayTrigger trigger={["hover"]} placement="bottom" overlay={popoverFocus}>
                        <FormControl type="text" onChange={setName} value={appName} autoFocus />
                    </OverlayTrigger>
                    <FormControl.Feedback />
                </FormGroup>
                <FormGroup style={{ display: 'inline-block', width: '20%', paddingLeft: 15 }} validationState={isShowOSError ? 'error' : undefined}>
                    <ControlLabel>平台</ControlLabel>
                    <FormControl componentClass="select" value={os} onChange={setSelect}>
                        <option value="">选择平台</option>
                        <option value="iOS">iOS</option>
                        <option value="Android">Android</option>
                        <option value="Windows">Windows</option>
                    </FormControl>
                </FormGroup>
                <FormGroup style={{ display: 'inline-block', width: '20%', paddingLeft: 15 }} validationState={isShowPlatformError ? 'error' : undefined}>
                    <ControlLabel>类型</ControlLabel>
                    <FormControl componentClass="select" value={platform} onChange={setPlatformSelect}>
                        <option value="">选择类型</option>
                        <option value="React-Native">React-Native</option>
                        <option value="Cordova">Cordova</option>
                    </FormControl>
                </FormGroup>
                <FormGroup validationState="error">
                    <HelpBlock>{errorTip}</HelpBlock>
                </FormGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={close}>关闭</Button>
                <Button onClick={handleSubmit} disabled={isOnSubmiting}>确定</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PopAddApp;
