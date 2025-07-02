export interface IRestApi {
    baseURI: string;
    headers: Record<string, string>;
    uuid?: string;
    aQQGuid?: string;

    setUUID(sessid: string, aQQGuid: string): void;
    getProducts(): Promise<any>;
    login(account: string, password: string): Promise<any>;
    getAccessKeys(): Promise<any>;
    getDeployments(appName: string): Promise<any>;
    addProducts(appName: string, os: string, platform: string): Promise<any>;
    removeAccessKey(name: string): Promise<any>;
    patchAccessKey(name: string, friendlyName?: string | null, ttl?: number): Promise<any>;
    createAccessKey(): Promise<any>;
    checkEmailExists(email: string): Promise<any>;
    sendRegisterCode(email: string): Promise<any>;
    checkRegisterCodeExists(email: string, code: string): Promise<any>;
    register(email: string, password: string, token: string): Promise<any>;
    password(oldPassword: string, newPassword: string): Promise<any>;
    buildReadmeUrl(): string;
    isAuth(): boolean;
    getHeaders(): Record<string, string>;
    deleteAuthToken(): void;
    setAuthToken(creds: string | string[]): this;
}
