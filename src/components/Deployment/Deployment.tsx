
import React from 'react';
import { Breadcrumb, Table } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Deployment.css';
import Link from '../Link';

export interface DeploymentProps {
    appName?: string;
    deploymentName?: string;
}

function Deployment({ appName = '', deploymentName = '' }: DeploymentProps) {
    return (
        <div className={s.root}>
            <div className={s.container}>
                <Breadcrumb>
                    <Breadcrumb.Item active>
                        <Link to="/apps">应用列表</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>
                        <Link to={`/apps/${appName}`}>{appName}</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active>{deploymentName}</Breadcrumb.Item>
                </Breadcrumb>
                <Table striped bordered condensed hover responsive>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>AppVersion</th>
                            <th style={{ textAlign: 'center' }}>PackageInfo</th>
                            <th style={{ textAlign: 'center' }}>Install Metrics</th>
                            <th style={{ textAlign: 'center' }}>操作</th>
                        </tr>
                    </thead>
                    <tbody />
                </Table>
            </div>
        </div>
    );
}

export default withStyles(s)(Deployment);
