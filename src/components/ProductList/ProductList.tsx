
import React from 'react';
import { Breadcrumb, Table, Button, Col } from 'react-bootstrap';
import cx from 'classnames';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './ProductList.css';
import Link from '../Link';

export interface ProductListProps {
    isFetching?: boolean;
    rs?: any[];
    popAddApp?: () => void;
}

function ProductList({ isFetching = true, rs = [], popAddApp = () => {} }: ProductListProps) {
    const renderRow = (rowData: any) => {
        const appName = _.get(rowData, 'name');
        return (
            <tr key={_.get(rowData, 'name')}>
                <td>
                    <Link to={`/apps/${appName}`}>{appName}</Link>
                </td>
                <td style={{ textAlign: 'left' }}>
                    <ul>
                        {
                            _.map(_.get(rowData, 'collaborators'), (item, email) => (
                                <li key={email}>
                                    {email}
                                    <span className={s.permission}>
                    (<em>{_.get(item, 'permission')}</em>)
                                    </span>
                                    {
                                        _.get(item, 'isCurrentAccount') ?
                                            <span className={cx(s.label, s.labelSuccess)}>
                      it's you
                                            </span>
                                            : null
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </td>
                <td>
                    <ul>
                        {
                            _.map(_.get(rowData, 'deployments'), (item, email) => (
                                <li key={email} style={item === 'Production' ? { color: 'green' } : null} >
                                    <Link to={`/apps/${appName}/${item}`}>{item}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </td>
                <td />
            </tr>
        );
    };

    const tipText = '暂无数据';
    return (
        <div className={s.root}>
            <div className={s.container}>
                <Breadcrumb>
                    <Breadcrumb.Item active>
            应用列表
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Col style={{ marginBottom: '20px' }}>
                    <Button
                        onClick={popAddApp}
                        variant="primary"
                    >
          添加应用
                    </Button>
                </Col>
                <Table striped bordered hover responsive size="sm">
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }} >产品名</th>
                            <th style={{ textAlign: 'center' }} >成员</th>
                            <th style={{ textAlign: 'center' }} >Deployments</th>
                            <th style={{ textAlign: 'center' }} >操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rs.length > 0 ? (
                            _.map(rs, (item, index) => renderRow(item))
                        ) : (
                            <tr>
                                <td colSpan="4">{tipText}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default withStyles(s)(ProductList);
