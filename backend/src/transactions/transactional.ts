import ConnectionStorage from './connectionStorage';
import TransactionError from '../errors/transactionError';
import SessionStorage from "./sessionStorage";

export default function Transactional() {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        const sessionStorage = new SessionStorage();
        descriptor.value = async function (...args: any[]){
            return sessionStorage.run(async () => {
                const connectionStorage = new ConnectionStorage();
                const connection = connectionStorage.getConnection();
                if (!connection) {
                    throw new TransactionError('Connections is not established');
                }
                const session = await connection.startSession();
                sessionStorage.storeSession(session);
                session.startTransaction();
                try {
                    const result = await originalMethod.apply(this, args);
                    await session.commitTransaction();
                    return result;
                } catch (e) {
                    await session.abortTransaction();
                    throw e;
                }
            })
        }
        return descriptor;
    }
}