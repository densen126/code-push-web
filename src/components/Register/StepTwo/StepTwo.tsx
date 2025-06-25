import React, { useEffect } from 'react';
import _ from 'lodash';
import {
    ControlLabel,
    Form,
    FormGroup,
    FormControl,
    Button,
    Col,
    Alert,
} from 'react-bootstrap';
import Countdown from '../../Countdown';

export interface StepTwoProps {
    isChecking?: boolean;
    validateCode?: string;
    validateCodeInputChange?: (code: string) => void;
    isSending?: boolean;
    lastSendTime?: number;
    sendValidateCode?: () => void;
    submit?: () => void;
    error?: Record<string, any>;
}

function StepTwo({
    isChecking = false,
    validateCode = '',
    validateCodeInputChange = () => {},
    isSending = false,
    lastSendTime = 0,
    sendValidateCode = () => {},
    submit = () => {},
    error = {},
}: StepTwoProps) {
    useEffect(() => {
        if (120 - (Math.floor(Date.now() / 1000) - lastSendTime) <= 0) {
            sendValidateCode();
        }
    }, [lastSendTime, sendValidateCode]);

    const setInputValidateCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateCodeInputChange(e.target.value);
    };

    const leftTime = 120 - (Math.floor(Date.now() / 1000) - lastSendTime);
    const isValidate = !!validateCode;
    const disabled = isChecking || !isValidate;

    const countDownView = (
        <Countdown
            leftTime={leftTime < 0 ? 0 : leftTime}
            renderFunc={({ second }) => <Button disabled>{second}</Button>}
            renderRetryFunc={(times) => {
                let sendText = '发送邮件';
                if (times > 0) {
                    sendText = '重新发送';
                }
                if (isSending) {
                    return <Button disabled>发送中</Button>;
                }
                return (
                    <Button
                        onClick={() => {
                            if (!isSending) {
                                sendValidateCode();
                            }
                        }}
                    >
                        {sendText}
                    </Button>
                );
            }}
        />
    );

    return (
        <Form style={{ maxWidth: 350, marginLeft: 'auto', marginRight: 'auto' }}>
            <FormGroup>
                <Alert bsStyle="warning">请登录邮箱，查看验证码!</Alert>
            </FormGroup>
            <FormGroup>
                <Col sm={8} style={{ marginBottom: 10 }}>
                    <FormControl
                        onChange={setInputValidateCode}
                        value={validateCode}
                        type="text"
                        placeholder="请输入接收到的验证码"
                        autoComplete="off"
                        autoFocus
                    />
                </Col>
                <Col sm={4} style={{ marginBottom: 10 }}>
                    {countDownView}
                </Col>
            </FormGroup>
            <FormGroup style={{ paddingTop: 20 }}>
                <div style={{ color: 'red', paddingLeft: 15 }}>
                    {_.get(error, 'message')}
                </div>
            </FormGroup>
            <FormGroup style={{ textAlign: 'center', paddingTop: 20 }}>
                <Button
                    style={{ width: '100%' }}
                    bsStyle="primary"
                    onClick={() => {
                        if (!disabled) {
                            submit();
                        }
                    }}
                    disabled={disabled}
                >
                    下一步
                </Button>
            </FormGroup>
        </Form>
    );
}

export default StepTwo;
