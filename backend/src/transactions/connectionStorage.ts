import mongoose from 'mongoose';

export default class ConnectionStorage {

    private static instance = new ConnectionStorage();
    private _connection: mongoose.Connection | null = null;

    constructor() {
        return ConnectionStorage.instance;
    }

    setConnection(connection: mongoose.Connection) {
        this._connection = connection;
    }

    getConnection() : mongoose.Connection | null {
        return this._connection;
    }
}