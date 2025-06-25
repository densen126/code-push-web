
import React from 'react';
import { Breadcrumb, Table } from 'react-bootstrap';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Product.css';
import Link from '../Link';

export interface ProductProps {
    appName?: string;
    items?: any[];
}

function Product({ appName = '', items = [] }: ProductProps) {
    const renderRow = (rowData: any, index: number) => {
        const deployName = _.get(rowData, 'name');
        return (
            <tr key={index}>
                <td>
                    <Link to={`/apps/${appName}/${deployName}`}>{deployName}</Link>
                </td>
                <td style={{ textAlign: 'left' }}>
                    {_.get(rowData, 'key')}
                </td>
                <td></td>
                <td></td>
                <td></td>
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
                        <Link to="/apps">应用列表</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>{appName}</Breadcrumb.Item>
                </Breadcrumb>
                <Table striped bordered condensed hover responsive>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Deployments</th>
                            <th style={{ textAlign: 'center' }}>DeploymentKey</th>
                            <th style={{ textAlign: 'center' }}>Description</th>
                            <th style={{ textAlign: 'center' }}>Update Metadata</th>
                            <th style={{ textAlign: 'center' }}>Install Metrics</th>
                            <th style={{ textAlign: 'center' }}>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 ? (
                            _.map(items, (item, idx) => renderRow(item, idx))
                        ) : (
                            <tr>
                                <td colSpan={6}>{tipText}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default withStyles(s)(Product);
