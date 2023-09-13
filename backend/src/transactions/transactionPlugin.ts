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
        const operation = operations[i] as Operations;
        schema.pre(Operations[operation], async function (this: (Document | Query<any, any>), next: any) {
            const session = sessionStorage.getSession();
            if (session) {
                if (this instanceof Document) {
                    this.$session() || this.$session(session);
                } else if (this instanceof Query) {
                    this.getOptions().session || this.session(session);
                }
            }
            if (next && next instanceof Function) {
                next();
            }
        });
    }
}