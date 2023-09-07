export default function ExceptionHandler(errors: (new (...args: any[]) => any)[] = []) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            try {
                return await originalMethod.apply(this, args);
            } catch (e: any) {
                const next = args[2];
                if (errors.length === 0 || errors.some(type => e instanceof type)) {
                    next(e);
                } else {
                    throw e;
                }
            }
        }
    }
}