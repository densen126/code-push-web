
import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './Home.css';

export interface HomeProps {
    html?: string;
}

function Home({ html = '' }: HomeProps) {
    return (
        <div className={s.root}>
            <div className={s.container}>
                <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </div>
    );
}

export default withStyles(s)(Home);
