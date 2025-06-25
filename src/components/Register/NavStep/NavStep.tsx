
import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './NavStep.css';
import cx from 'classnames';
import _ from 'lodash';

export interface NavStepProps {
    step?: number;
}

function NavStep({ step = 1 }: NavStepProps) {
    const navArr = [
        { key: 1, text: '填写邮箱' },
        { key: 2, text: '验证邮箱' },
        { key: 3, text: '设置密码' },
        { key: 4, text: '完成' },
    ];

    return (
        <ul className={cx(s.progress, s.clearfix)}>
            {navArr.map((item, index) => (
                <li key={index} className={step === item.key ? s.current : undefined}>
                    <i>{item.key}</i>
                    <span>{item.text}</span>
                    <em>
                        <img src={require('./arrow.png')} />
                    </em>
                </li>
            ))}
        </ul>
    );
}

export default withStyles(s)(NavStep);
