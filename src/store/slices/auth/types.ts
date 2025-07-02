export interface ShowKeyState {
    isOpen: boolean;
    token: string;
}

export interface AccessKey {
    // 根据你实际的 accessKey 结构补充字段，这里给个基础示例
    friendlyName: string;
    [key: string]: any; // 允许有其他字段
}

export interface AccessKeysState {
    isFetching: boolean;
    isRemoving: boolean;
    isCreating: boolean;
    rs: AccessKey[];
    showKey: ShowKeyState;
}

export interface AuthState {
    token: string | null;
    isFetching: boolean;
    isAuth: boolean;
}