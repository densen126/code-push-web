import React from 'react';
import Home from '../components/Home';

interface Props {
    html?: string;
}

export default function HomeContainer({ html }: Props) {
    return <Home html={html} />;
}
