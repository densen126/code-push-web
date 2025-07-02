import _ from 'lodash';
import serverUrl from './../../config/config';
import { FetchResult, request } from '@/utils/fetch';
import type { IRestApi } from './restApi.types';


const TIMEOUT = 10000;
const isDev = process.env.NODE_ENV === 'development';

class RestApi implements IRestApi {
    public baseURI!: string;
    public headers: Record<string, string> = { 'Accept': 'application/json', 'Content-Type': 'application/json' };
    public uuid?: string;
    public aQQGuid?: string;
    private static instance: RestApi;

    constructor() {
        if (RestApi.instance) return RestApi.instance;
        RestApi.instance = this;

        this.baseURI = isDev
            ? _.get(serverUrl, 'api.devURL', 'http://localhost:3000')
            : _.get(serverUrl, 'api.URL', 'http://localhost:3000');
    }

    setUUID(sessid: string, aQQGuid: string) {
        this.uuid = sessid;
        this.aQQGuid = aQQGuid;
    }

    async getProducts() {
        return this.get('/apps').then(this.jsonDecode);
    }

    async login(account: string, password: string) {
        return this.post('/auth/login', { account, password, minutes: 43200 }).then(this.jsonDecode);
    }

    async getAccessKeys() {
        return this.get('/accessKeys').then(this.jsonDecode);
    }

    async getDeployments(appName: string) {
        return this.get(`/apps/${appName}/deployments`).then(data => {
            if (data.httpCode == 200) {
                const rs = this.jsonDecode(data);
                if (_.get(rs, 'status') !== "ERROR") {
                    return { status: "OK", httpCode: data.httpCode, results: rs };
                } else {
                    return rs;
                }
            } else {
                return { status: "ERROR", httpCode: data.httpCode, errorCode: 0, errorMessage: data.text };
            }
        });
    }

    async addProducts(appName: string, os: string, platform: string) {
        return this.post('/apps', { name: appName, os, platform }).then(data => {
            if (data.httpCode == 200) {
                const rs = this.jsonDecode(data);
                if (_.get(rs, 'status') !== "ERROR") {
                    return { status: "OK", httpCode: data.httpCode, results: rs };
                } else {
                    return rs;
                }
            } else {
                return { status: "ERROR", httpCode: data.httpCode, errorCode: 0, errorMessage: data.text };
            }
        });
    }

    async removeAccessKey(name: string) {
        return this.delete(`/accessKeys/${encodeURI(name)}`).then(data => {
            if (data.httpCode == 200) {
                const rs = this.jsonDecode(data);
                if (_.get(rs, 'status') !== "ERROR") {
                    return { status: "OK", httpCode: data.httpCode, results: rs };
                } else {
                    return rs;
                }
            } else {
                return { status: "ERROR", httpCode: data.httpCode, errorCode: 0, errorMessage: data.text };
            }
        });
    }

    async patchAccessKey(name: string, friendlyName: string | null = null, ttl: number = 0) {
        return this.patch(`/accessKeys/${encodeURI(name)}`, { friendlyName, ttl }).then(data => {
            if (data.httpCode == 200) {
                const rs = this.jsonDecode(data);
                if (_.get(rs, 'status') !== "ERROR") {
                    return { status: "OK", httpCode: data.httpCode, results: rs };
                } else {
                    return rs;
                }
            } else {
                return { status: "ERROR", httpCode: data.httpCode, errorCode: 0, errorMessage: data.text };
            }
        });
    }

    async createAccessKey() {
        const time = Date.now();
        const friendlyName = `Login-${time}`;
        const ttl = 30 * 2 * 24 * 60 * 60 * 1000;
        const createdBy = friendlyName;
        const isSession = true;
        return this.post(`/accessKeys`, { friendlyName, ttl, createdBy, isSession }).then(data => {
            if (data.httpCode == 200) {
                const rs = this.jsonDecode(data);
                if (_.get(rs, 'status') !== "ERROR") {
                    return { status: "OK", httpCode: data.httpCode, results: rs };
                } else {
                    return rs;
                }
            } else {
                return { status: "ERROR", httpCode: data.httpCode, errorCode: 0, errorMessage: data.text };
            }
        });
    }

    async checkEmailExists(email: string) {
        return this.get(`/users/exists?email=${encodeURI(email)}`).then(this.jsonDecode);
    }

    async sendRegisterCode(email: string) {
        return this.post(`/users/registerCode`, { email }).then(this.jsonDecode);
    }

    async checkRegisterCodeExists(email: string, code: string) {
        const query = `email=${encodeURI(email)}&token=${encodeURI(code)}`;
        return this.get(`/users/registerCode/exists?${query}`).then(this.jsonDecode);
    }

    async register(email: string, password: string, token: string) {
        return this.post(`/users`, { email, password, token }).then(this.jsonDecode);
    }

    async password(oldPassword: string, newPassword: string) {
        return this.patch(`/users/password`, { oldPassword, newPassword }).then(this.jsonDecode);
    }

    buildReadmeUrl(): string {
        return `${this.baseURI}/README.md`;
    }

    private jsonDecode(response: { text: string, httpCode?: number }): any {
        try {
            return JSON.parse(response.text);
        } catch (e: any) {
            return { status: 'ERROR', httpCode: response.httpCode, errorCode: 0, errorMessage: response.text || e.message, results: response.text }
        }
    }

    async get(uri: string): Promise<FetchResult> {
        return request(this.baseURI + uri, {
            method: 'GET',
            headers: this.headers
        }, TIMEOUT);
    }

    async post(uri: string, params: object = {}): Promise<FetchResult> {
        return request(this.baseURI + uri, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(params)
        }, TIMEOUT);
    }

    async patch(uri: string, params: object = {}): Promise<FetchResult> {
        return request(this.baseURI + uri, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(params)
        }, TIMEOUT);
    }

    async delete(uri: string, params: object = {}): Promise<FetchResult> {
        return request(this.baseURI + uri, {
            method: 'DELETE',
            headers: this.headers,
            body: JSON.stringify(params)
        }, TIMEOUT);
    }

    isAuth(): boolean {
        return !!this.headers.Authorization;
    }

    getHeaders(): Record<string, string> {
        return this.headers;
    }

    deleteAuthToken(): void {
        delete this.headers.Authorization;
    }

    setAuthToken(creds: string | string[]): this {
        let arr: string[];
        if (typeof creds === 'string') {
            const index = creds.indexOf(':');
            if (index !== -1) {
                arr = [creds.substring(0, index), creds.substring(index + 1)];
            } else {
                arr = [creds, ''];
            }
        } else if (Array.isArray(creds)) {
            arr = creds;
        } else {
            arr = [];
        }

        if (arr.length === 0) arr = ['', ''];
        if (arr.length === 1) arr.push('');
        if (arr.length > 2) throw new Error('auth option can only have two keys `[user, pass]`');
        if (typeof arr[0] !== 'string') throw new Error('auth option `user` must be a string');
        if (typeof arr[1] !== 'string') throw new Error('auth option `pass` must be a string');

        if (!arr[0] && !arr[1]) {
            delete this.headers.Authorization;
        } else {
            // Buffer.from 兼容 node/browser
            this.headers.Authorization = 'Basic ' + (typeof Buffer !== 'undefined'
                ? Buffer.from(arr.join(':')).toString('base64')
                : btoa(arr.join(':')));
        }
        return this;
    }
}

const restApi = new RestApi();
export default restApi;
