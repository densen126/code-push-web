
import React from 'react';
import { Breadcrumb, Table, Button, Col } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './AccessKeys.css';
import cx from 'classnames';
import _ from 'lodash';
import Link from '../Link';
import MyEditor from '../MyEditor';
import PopShowKey from './PopShowKey';

interface Props {
    isFetching?: boolean;
    rs?: any[];
    removeKey: (name: string) => void;
    patchKey: (name: string, friendlyName?: string | null, ttl?: number) => void;
    isCreating?: boolean;
    createKey: () => void;
    isShowKey?: boolean;
    close: () => void;
    token?: string;
}

function AccessKeys({
    isFetching = true,
    rs = [],
    removeKey,
    patchKey,
    isCreating = false,
    createKey,
    isShowKey = false,
    close,
    token = '',
}: Props) {
    const renderRow = (rowData, index) => {
        const moment = require('moment');
        return (
            <tr key={_.get(rowData, 'id')}>
                <td>
                    <MyEditor
                        saveData={(str) => {
                            if (!_.isEqual(str, _.get(rowData, 'friendlyName'))){
                                patchKey(_.get(rowData, 'friendlyName'), str);
                            }
                        }}
                        value={_.get(rowData, 'friendlyName')}
                    />
                </td>
                <td>{_.get(rowData, 'createdBy')}</td>
                <td>{_.get(rowData, 'isSession') ? 'session' : 'accessKey'}</td>
                <td>{moment(_.get(rowData, 'createdTime')).fromNow()}</td>
                <td>{moment(_.get(rowData, 'expires')).fromNow()}</td>
                <td>
                    <Button onClick={() => removeKey(_.get(rowData, 'friendlyName'))} variant="danger">
                        移除
                    </Button>
                </td>
            </tr>
        );
    };

    let tipText = '暂无数据';
    if (isFetching) {
        tipText = '加载数据中...';
    }

    return (
        <div className={s.root}>
            <PopShowKey showModal={isShowKey} value={token} close={close} />
            <div className={s.container}>
                <Breadcrumb>
                    <Breadcrumb.Item active>密钥列表</Breadcrumb.Item>
                </Breadcrumb>
                <Col style={{ marginBottom: '20px' }}>
                    <Button onClick={createKey} variant="primary" disabled={!!isCreating}>
                        创建key
                    </Button>
                </Col>
                <Table striped bordered hover responsive size="sm">
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }} >名字</th>
                            <th style={{ textAlign: 'center' }} >创建者</th>
                            <th style={{ textAlign: 'center' }} >类型</th>
                            <th style={{ textAlign: 'center' }} >创建时间</th>
                            <th style={{ textAlign: 'center' }} >过期时间</th>
                            <th style={{ textAlign: 'center' }} >操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rs.length > 0 ? (
                            _.map(rs, (item, index) => renderRow(item, index))
                        ) : (
                            <tr>
                                <td colSpan="6" >{tipText}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default withStyles(s)(AccessKeys);
