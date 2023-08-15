export type ExchangeResponse = {
    rates: { [code: string]: number };
    source: string;
    timestamp: Date;
};

export type ExchangeRates = {
    [source: string]: {
        [code: string]: number;
    };
};
