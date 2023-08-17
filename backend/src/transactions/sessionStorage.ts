import { AsyncLocalStorage } from 'async_hooks';
import { ClientSession } from 'mongoose';

export default class SessionStorage {

    private static SESSION_KEY = "session";
    private static instance = new SessionStorage();
    private storage = new AsyncLocalStorage<Map<any, any>>();

    constructor() {
        return SessionStorage.instance;
    }

    async run(fn: (...args: any[]) => any): Promise<any> {
        return await this.storage.run(new Map(), fn);
    }

    storeSession(session: ClientSession) {
        this.storage.getStore()?.set(SessionStorage.SESSION_KEY, session);
    }

    getSession(): ClientSession {
        return this.storage.getStore()?.get(SessionStorage.SESSION_KEY);
    }
}
