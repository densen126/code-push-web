import React from "react";
import { ArrowLeft, AlertTriangle } from "lucide-react";

const NotFound: React.FC = () => (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-base-100 px-4">
        <div className="flex flex-col items-center gap-2">
            <AlertTriangle className="w-16 h-16 text-error" />
            <h1 className="text-7xl font-bold text-error drop-shadow">404</h1>
        </div>
        <div className="text-2xl font-semibold text-base-content mt-4 mb-2">页面未找到</div>
        <div className="mb-6 text-gray-500 text-base">
            很抱歉，您访问的页面不存在或已被删除。
        </div>
        <a
            href="/"
            className="
                btn btn-outline btn-wide flex items-center gap-2 
                text-base-content bg-base-100 border-base-300
                transition
            "
            style={{ minWidth: "12rem", justifyContent: "center" }}
        >
            <ArrowLeft className="w-5 h-5" />
            返回首页
        </a>
    </div>
);

export default NotFound;
