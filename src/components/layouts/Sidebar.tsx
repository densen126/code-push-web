import React from "react";
import SettingsMenu from "./SettingMenu";

interface SidebarProps {
    show: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ show, onClose }) => {
    return (
        <div
            className={`
                fixed top-0 left-0 h-full z-40
                transition-all duration-300
                ${show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"}
            `}
        >
            <ul className="menu bg-base-200 rounded-box gap-1 pl-0 pr-0 text-base-content h-full">
                <li>
                    <a
                        className="tooltip tooltip-right"
                        style={{ cursor: "pointer" }}
                        onClick={onClose}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </a>
                </li>
                <li>
                    <a className="tooltip tooltip-right" data-tip="应用管理">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                            <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                            <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                            <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </a>
                </li>
                <li>
                    <a className="tooltip tooltip-right" data-tip="我的秘钥">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <circle cx="7.5" cy="15.5" r="4.5" stroke="currentColor" strokeWidth="2" />
                            <path d="M21 2l-9.6 9.6m0 0l-1.4 1.4m1.4-1.4l1.4 1.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </a>
                </li>
                <li>
                    <a className="tooltip tooltip-right" data-tip="用户中心">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                            <path d="M4 20c0-4 16-4 16 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </a>
                </li>
                <SettingsMenu />
            </ul>
        </div>
    );
};

export default Sidebar;
