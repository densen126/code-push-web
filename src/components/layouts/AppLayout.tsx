import React, { useState, ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { ThemeProvider } from "../../context/ThemeContext";

export default function AppLayout({ children }: { children: ReactNode }) {
    const [showSidebar, setShowSidebar] = useState(true);
    return (
        <ThemeProvider>
            <div className="flex h-screen bg-base-100 text-base-content">
                <Sidebar show={showSidebar} onClose={() => setShowSidebar(false)} />
                {/* 只在侧边栏隐藏时显示按钮 */}
                {!showSidebar && (
                    <button
                        onClick={() => setShowSidebar(true)}
                        className="fixed top-4 left-4 z-50 bg-base-200 rounded-full p-2 shadow hover:bg-base-300 transition-all border-none flex items-center justify-center"
                        aria-label="打开菜单"
                        style={{ width: 40, height: 40 }} // 和关闭按钮尺寸一致
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                )}
                <div className="flex-1 flex flex-col">
                    {/* <Header /> */}
                    <main className="flex-1 overflow-y-auto p-8">{children}</main>
                </div>
            </div>
        </ThemeProvider>
    );
}
