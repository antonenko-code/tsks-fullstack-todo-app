import {Schema, Document, Query} from 'mongoose';
import SessionStorage from "./sessionStorage";

enum Operations {
    'updateOne' = 'updateOne',
    'deleteOne' = 'deleteOne',
    'save' = 'save',
    'init' = 'init',
    'validate' = 'validate',
    'count' = 'count',
    'estimatedDocumentCount' = 'estimatedDocumentCount',
    'countDocuments' = 'countDocuments',
    'deleteMany' = 'deleteMany',
    'distinct' = 'distinct',
    'find' = 'find',
    'findOne' = 'findOne',
    'findOneAndDelete' = 'findOneAndDelete',
    'findOneAndRemove' = 'findOneAndRemove',
    'findOneAndReplace' = 'findOneAndReplace',
    'findOneAndUpdate' = 'findOneAndUpdate',
    'replaceOne' = 'replaceOne',
    'updateMany' = 'updateMany',
}

export default function transactionPlugin(schema: Schema) {
    const sessionStorage = new SessionStorage();
    const operations = Object.keys(Operations);
    for (let i = 0; i < operations.length; i++) {
        schema.pre(operations[i], async function (next: any) {
            const session = sessionStorage.getSession();
            if (session) {
                if (this instanceof Document) {
                    const doc = this as Document;
                    doc.$session() || doc.$session(session);
                } else if (this instanceof Query) {
                    const query = this as Query<any, any>;
                    query.getOptions().session || query.session(session);
                }
            }
        });
    }
}