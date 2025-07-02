import React, { ReactNode } from 'react';
import AppLayout from "./components/layouts/AppLayout";

interface AppProps {
    component: ReactNode;
}

const App: React.FC<AppProps> = ({ component }) => {
    return (
        <AppLayout>{component}</AppLayout>
    );
};

export default App;

// export default function App({ children }: { children: React.ReactNode }) {
//     return <AppLayout>{children}</AppLayout>;
// }