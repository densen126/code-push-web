import React from 'react';
import {
    Form,
} from 'react-bootstrap';
import Link from '../../Link';


function StepDone() {
    return (
        <Form style={{  maxWidth:350, marginLeft:"auto", marginRight: "auto" }}>
            <Form.Group style={{ textAlign:'center' }}>
                <div>
                    <span>恭喜！您已经注册成功，快去</span>
                    <Link to="/login">登录</Link>
                    <span>吧</span>
                </div>
            </Form.Group>
        </Form>
    );
}
export default StepDone;
