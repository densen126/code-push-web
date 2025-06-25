import { Buffer } from 'buffer';
import _ from 'lodash';
import { common } from '../config';
import fetch from '../core/fetch';

const TIMEOUT = 10000;

export interface JsonResponse {
    httpCode: number;
    text: string;
}

class RestApi {
    private static instance: RestApi | null = null;
    private baseURI: string;
    private headers: Record<string, string>;
    private uuid?: string;
    private aQQGuid?: string;

    constructor() {
        if (RestApi.instance) return RestApi.instance;
        RestApi.instance = this;

        this.baseURI = __DEV__
            ? _.get(common, 'api.devURL', 'http://localhost:3000')
            : _.get(common, 'api.URL', 'http://localhost:3000');

        this.headers = { Accept: 'application/json', 'Content-Type': 'application/json' };

        this.dealResponse = this.dealResponse.bind(this);
        this.jsonDecode = this.jsonDecode.bind(this);
        this.setAuthToken = this.setAuthToken.bind(this);
        this.deleteAuthToken = this.deleteAuthToken.bind(this);
    }

    setUUID(sessid: string, aQQGuid: string) {
        this.uuid = sessid;
        this.aQQGuid = aQQGuid;
    }

    getProducts() {
        return this.get('/apps').then(this.jsonDecode);
    }

    login(account: string, password: string) {
        return this.post('/auth/login', { account, password, minutes: 43200 }).then(this.jsonDecode);
    }

    getAccessKeys() {
        return this.get('/accessKeys').then(this.jsonDecode);
    }

    getDeployments(appName: string) {
        return this.get(`/apps/${appName}/deployments`).then((data) => {
            if (data.httpCode === 200) {
                const rs = this.jsonDecode(data);
                if (_.get(rs, 'status') !== 'ERROR') {
                    return { status: 'OK', httpCode: data.httpCode, results: rs };
                }
                return rs;
            }
            return { status: 'ERROR', httpCode: data.httpCode, errorCode: 0, errorMessage: data.text };
        });
    }

    addProducts(appName: string, os: string, platform: string) {
        return this.post('/apps', { name: appName, os, platform }).then((data) => {
            if (data.httpCode === 200) {
                const rs = this.jsonDecode(data);
                if (_.get(rs, 'status') !== 'ERROR') {
                    return { status: 'OK', httpCode: data.httpCode, results: rs };
                }
                return rs;
            }
            return { status: 'ERROR', httpCode: data.httpCode, errorCode: 0, errorMessage: data.text };
        });
    }

    removeAccessKey(name: string) {
        return this.delete(`/accessKeys/${encodeURI(name)}`).then((data) => {
            if (data.httpCode === 200) {
                const rs = this.jsonDecode(data);
                if (_.get(rs, 'status') !== 'ERROR') {
                    return { status: 'OK', httpCode: data.httpCode, results: rs };
                }
                return rs;
            }
            return { status: 'ERROR', httpCode: data.httpCode, errorCode: 0, errorMessage: data.text };
        });
    }

    patchAccessKey(name: string, friendlyName: string | null = null, ttl = 0) {
        return this.patch(`/accessKeys/${encodeURI(name)}`, { friendlyName, ttl }).then((data) => {
            if (data.httpCode === 200) {
                const rs = this.jsonDecode(data);
                if (_.get(rs, 'status') !== 'ERROR') {
                    return { status: 'OK', httpCode: data.httpCode, results: rs };
                }
                return rs;
            }
            return { status: 'ERROR', httpCode: data.httpCode, errorCode: 0, errorMessage: data.text };
        });
    }

    createAccessKey() {
        const time = new Date().getTime();
        const friendlyName = `Login-${time}`;
        const ttl = 30 * 2 * 24 * 60 * 60 * 1000;
        const createdBy = friendlyName;
        const isSession = true;
        return this.post('/accessKeys', { friendlyName, ttl, createdBy, isSession }).then((data) => {
            if (data.httpCode === 200) {
                const rs = this.jsonDecode(data);
                if (_.get(rs, 'status') !== 'ERROR') {
                    return { status: 'OK', httpCode: data.httpCode, results: rs };
                }
                return rs;
            }
            return { status: 'ERROR', httpCode: data.httpCode, errorCode: 0, errorMessage: data.text };
        });
    }

    checkEmailExists(email: string) {
        return this.get(`/users/exists?email=${encodeURI(email)}`).then(this.jsonDecode);
    }

    sendRegisterCode(email: string) {
        return this.post('/users/registerCode', { email }).then(this.jsonDecode);
    }

    checkRegisterCodeExists(email: string, code: string) {
        const query = `email=${encodeURI(email)}&token=${encodeURI(code)}`;
        return this.get(`/users/registerCode/exists?${query}`).then(this.jsonDecode);
    }

    register(email: string, password: string, token: string) {
        return this.post('/users', { email, password, token }).then(this.jsonDecode);
    }

    password(oldPassword: string, newPassword: string) {
        return this.patch('/users/password', { oldPassword, newPassword }).then(this.jsonDecode);
    }

    buildReadmeUrl() {
        return `${this.baseURI}/README.md`;
    }

    private dealResponse(response: Response): Promise<JsonResponse> {
        return response.text().then((text) => {
            if (__DEV__) {
                console.log(this.headers);
                console.log(response.url);
                console.log(text);
            }
            return { httpCode: response.status, text };
        });
    }

    private jsonDecode(response: JsonResponse) {
        try {
            return JSON.parse(response.text);
        } catch (e: any) {
            return { status: 'ERROR', httpCode: response.httpCode, errorCode: 0, errorMessage: e.message, results: response.text };
        }
    }

    private get(uri: string): Promise<JsonResponse> {
        return fetch(this.baseURI + uri, {
            method: 'GET',
            headers: this.headers,
            timeout: TIMEOUT,
        })
            .then(this.dealResponse)
            .catch(() => ({ httpCode: 0, text: '网络错误，请重试!' }));
    }

    private post(uri: string, params: Record<string, unknown> = {}): Promise<JsonResponse> {
        return fetch(this.baseURI + uri, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(params),
            timeout: TIMEOUT,
        })
            .then(this.dealResponse)
            .catch(() => ({ httpCode: 0, text: '网络错误，请重试!' }));
    }

    private patch(uri: string, params: Record<string, unknown> = {}): Promise<JsonResponse> {
        return fetch(this.baseURI + uri, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(params),
            timeout: TIMEOUT,
        })
            .then(this.dealResponse)
            .catch(() => ({ httpCode: 0, text: '网络错误，请重试!' }));
    }

    private delete(uri: string, params: Record<string, unknown> = {}): Promise<JsonResponse> {
        return fetch(this.baseURI + uri, {
            method: 'DELETE',
            headers: this.headers,
            body: JSON.stringify(params),
            timeout: TIMEOUT,
        })
            .then(this.dealResponse)
            .catch(() => ({ httpCode: 0, text: '网络错误，请重试!' }));
    }

    isAuth() {
        return !_.isEmpty(this.headers.Authorization);
    }

    getHeaders() {
        return this.headers;
    }

    deleteAuthToken() {
        delete this.headers.Authorization;
    }

    setAuthToken(creds: string | [string, string]) {
        if (typeof creds === 'string') {
            const index = creds.indexOf(':');
            if (index !== -1) {
                creds = [creds.substr(0, index), creds.substr(index + 1)];
            }
        }

        if (!Array.isArray(creds)) creds = Array.prototype.slice.call(arguments);

        switch (creds.length) {
        case 0:
            creds = ['', ''];
            break;
        case 1:
            creds.push('');
            break;
        case 2:
            break;
        default:
            throw new Error('auth option can only have two keys `[user, pass]`');
        }

        if (typeof creds[0] !== 'string') throw new Error('auth option `user` must be a string');
        if (typeof creds[1] !== 'string') throw new Error('auth option `pass` must be a string');

        if (!creds[0] && !creds[1]) delete this.headers.Authorization;
        else this.headers.Authorization = 'Basic ' + Buffer.from(creds.join(':')).toString('base64');

        return this;
    }
}

export default new RestApi();
