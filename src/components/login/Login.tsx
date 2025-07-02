import React, { useContext } from 'react';

interface LoginProps {
    isFetching?: boolean;
    account?: string;
    password?: string;
    accountInputChange?: (value: string) => void;
    passwordInputChange?: (value: string) => void;
    submit?: () => void;
    error?: { errorMessage?: string, text?: string };
}

const Login: React.FC<LoginProps> = ({
    isFetching = false,
    account = '',
    password = '',
    accountInputChange = () => {},
    passwordInputChange = () => {},
    submit = () => {},
    error = {},
}) => {
    return (
        <div className="flex items-center justify-center min-h-[80vh] transition-all">
            <div className="card w-full max-w-sm bg-base-100 shadow-xl border">
                <form
                    className="card-body"
                    autoComplete="off"
                    onSubmit={e => {
                        e.preventDefault();
                        if (!isFetching) submit();
                    }}
                >
                    <h2 className="card-title justify-center mb-6">登录</h2>

                    <label className="form-control w-full mb-2">
                        <span className="label-text mb-1">邮箱地址</span>
                        <input
                            type="email"
                            className="input input-bordered w-full"
                            placeholder="请输入邮箱地址"
                            value={account}
                            onChange={e => accountInputChange(e.target.value)}
                            autoFocus
                        />
                    </label>

                    <label className="form-control w-full mb-2">
                        <span className="label-text mb-1">密码</span>
                        <input
                            type="password"
                            className="input input-bordered w-full"
                            placeholder="请输入登录密码"
                            value={password}
                            onChange={e => passwordInputChange(e.target.value)}
                        />
                    </label>

                    <div className="h-6 text-error text-sm mb-1">
                        {error?.errorMessage}
                    </div>

                    <button
                        className={`btn btn-primary w-full mt-2 ${isFetching ? "btn-disabled" : ""}`}
                        type="submit"
                        disabled={isFetching}
                    >
                        {isFetching ? "登录中..." : "登录"}
                    </button>

                    <div className="flex items-center justify-between mt-6">
                        <span>还没有账号？</span>
                        <a className="link link-primary" href="/register">立即注册</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
