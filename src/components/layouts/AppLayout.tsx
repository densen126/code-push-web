import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { ThemeProvider } from "../../context/ThemeContext";

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider>
            <div className="flex h-screen bg-base-100 text-base-content">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <Header />
                    <main className="flex-1 overflow-y-auto p-8">{children}</main>
                </div>
            </div>
        </ThemeProvider>
    );
}
