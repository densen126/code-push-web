// src/components/App.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { increment, decrement } from '../slices/counterSlice';

interface AppProps {
    context: {
        title: string;
        component: React.ReactNode;
        [key: string]: any;
    };
}

const App: React.FC<AppProps> = ({ context }) => {
    const dispatch = useDispatch<AppDispatch>();
    const count = useSelector((state: RootState) => state.counter);

    return (
        <div>
            <header>
                <h1>{context.title}</h1>
                <nav>
                    <a href="/">首页</a> | <a href="/about">关于</a>
                </nav>
            </header>
            <main>
                <section>{context.component}</section>
                <section style={{ marginTop: '2rem' }}>
                    <h2>Redux 计数示例</h2>
                    <button onClick={() => dispatch(decrement())}>-</button>
                    <span style={{ margin: '0 1rem' }}>{count}</span>
                    <button onClick={() => dispatch(increment())}>+</button>
                </section>
            </main>
        </div>
    );
};

export default App;
