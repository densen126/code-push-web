import React from 'react';
// import Counter from "@/components/Counter";

export default function Dashboard() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">仪表盘</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card bg-base-200 shadow">
                    <div className="card-body">
                        <h2 className="card-title">用户数</h2>
                        <p className="text-3xl">1234</p>
                    </div>
                </div>
                <div className="card bg-base-200 shadow">
                    <div className="card-body">
                        <h2 className="card-title">活跃会话</h2>
                        <p className="text-3xl">234</p>
                    </div>
                </div>
                <div className="card bg-base-200 shadow">
                    <div className="card-body">
                        <h2 className="card-title">系统负载</h2>
                        <p className="text-3xl">1.23</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
