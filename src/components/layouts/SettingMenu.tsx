import { useState, useRef } from "react";
import ThemeToggle from "../ui/ThemeToggle";

function SettingsMenu() {
    const [show, setShow] = useState(false);
    const [display, setDisplay] = useState(false); // 控制是否渲染div
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);


    // 鼠标进入时
    const handleEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setDisplay(true);    // 先渲染
        setTimeout(() => setShow(true), 10); // 再开始动画（10ms是保险延迟，确保先挂载再加类）
    };

    // 鼠标离开时
    const handleLeave = () => {
        setShow(false);      // 开始消失动画
        timeoutRef.current = setTimeout(() => setDisplay(false), 300); // 动画结束后隐藏
    };

    return (
        <li
            className="mt-auto relative"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            style={{ minHeight: 40 }}
        >
            <a className="tooltip tooltip-right">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06A1.65 1.65 0 0015.4 19.4a1.65 1.65 0 00-1.51 1V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1.51-1 1.65 1.65 0 00-1.82-.33l-.06.06A2 2 0 013.51 16.88l.06-.06a1.65 1.65 0 00-.33-1.82 1.65 1.65 0 00-1-1.51H3a2 2 0 010-4h.09a1.65 1.65 0 001-1.51 1.65 1.65 0 00.33-1.82l-.06-.06A2 2 0 013.51 7.12l.06.06a1.65 1.65 0 001.82-.33h.09A1.65 1.65 0 007.6 4.6V3a2 2 0 014 0v.09a1.65 1.65 0 001.51 1c.55 0 1.07.22 1.51.6a1.65 1.65 0 001.82.33l.06-.06A2 2 0 0120.49 7.12l-.06.06a1.65 1.65 0 00.33 1.82c.3.36.5.81.6 1.27v.09a2 2 0 010 4h-.09a1.65 1.65 0 00-1 1.51z" />
                </svg>
            </a>
            {display && (
                <div
                    style={{backgroundColor: "transparent"}}
                    className={`
                        absolute p-0 bottom-10 left-1/2 -translate-x-1/2 z-20
                        ${show ? 'translate-y-0 pointer-events-auto' : 'translate-y-4 pointer-events-none'}
                    `}
                >
                    <div
                        className={`
                            mb-2 space-y-1 
                            p-2 flex flex-col items-center 
                            bg-base-100 rounded-box shadow-lg
                            transition-all duration-300
                            ${show ? 'opacity-100' : 'opacity-0'}
                        `}
                    >
                        <ThemeToggle />
                    </div>
                </div>
            )}
        </li>
    );
}

export default SettingsMenu;
