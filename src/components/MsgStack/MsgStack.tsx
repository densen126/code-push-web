import React, { useEffect } from 'react';
import _ from 'lodash';
import { Alert } from 'react-bootstrap';

export interface MsgItem {
    id: string | number;
    time: number;
    showTime: number;
    type: string;
    text: string;
}

interface MsgStackProps {
    items?: MsgItem[];
    close?: (id: MsgItem['id']) => void;
}

function MsgStack({ items = [], close = () => {} }: MsgStackProps) {
    useEffect(() => {
        if (!items.length) return;

        const interval = setInterval(() => {
            const time = Math.floor(Date.now() / 1000);
            items.forEach((item) => {
                if (item.time + item.showTime < time) {
                    close(item.id);
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [items, close]);

    return (
        <div>
            {items.map((item) => {
                let bsStyle: string = 'info';
                if (['info', 'warning', 'danger', 'success'].includes(item.type)) {
                    bsStyle = item.type;
                }
                return (
                    <Alert
                        key={item.id}
                        style={{ marginTop: -15 }}
                        variant={bsStyle}
                        onClose={() => close(item.id)}
                        dismissible
                    >
                        {item.text}
                    </Alert>
                );
            })}
        </div>
    );
}

export default MsgStack;
