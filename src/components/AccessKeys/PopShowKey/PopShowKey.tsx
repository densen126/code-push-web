
import React from 'react';
import { Modal, Button, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';

interface Props {
    value?: string;
    close: () => void;
    showModal?: boolean;
}

function PopShowKey({ value = '', close, showModal = false }: Props) {
    const handleClose = () => close();

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>创建密钥成功</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormGroup validationState="success">
                    <FormControl
                        value={value}
                        onFocus={(e) => e.currentTarget.select()}
                        onClick={(e) => e.currentTarget.select()}
                        onMouseOver={(e) => e.currentTarget.select()}
                        readOnly
                        type="text"
                    />
                    <HelpBlock>复制上面的密钥, 然后关闭弹框</HelpBlock>
                </FormGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>关闭</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PopShowKey;
