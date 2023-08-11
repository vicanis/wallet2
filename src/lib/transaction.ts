import { TransactionOptions } from "mongodb";

export const DefaultTransactionOptions: TransactionOptions = {
    readPreference: "primary",
    readConcern: {
        level: "local",
    },
    writeConcern: {
        w: "majority",
    },
};
