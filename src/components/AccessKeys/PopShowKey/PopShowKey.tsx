
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

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
                <Form.Group>
                    <Form.Control
                        value={value}
                        onFocus={(e) => e.currentTarget.select()}
                        onClick={(e) => e.currentTarget.select()}
                        onMouseOver={(e) => e.currentTarget.select()}
                        readOnly
                        type="text"
                    />
                    <Form.Text className="text-success">复制上面的密钥, 然后关闭弹框</Form.Text>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose}>关闭</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PopShowKey;
