import React, { ReactNode } from 'react';
import _ from 'lodash';
import { useAppSelector } from '../hooks';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import MsgStackContainer from './MsgStackContainer';

interface Props {
    children?: ReactNode;
}

export default function LayoutContainer({ children }: Props) {
    const auth = useAppSelector(state => _.get(state, 'auth', {}));
    return (
        <Layout>
            <Header isAuth={_.get(auth, 'isAuth')} />
            {children}
            <Footer />
            <MsgStackContainer />
        </Layout>
    );
}
