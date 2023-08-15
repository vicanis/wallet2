export type ApiLayerCurrencyList = {
    currencies: {
        [code: string]: string;
    };
};

export type ApiLayerExchangeData = {
    quotes: {
        [code: string]: number;
    };
    source: string;
    timestamp: number;
};

type ApiLayerResponseSuccess<T extends {}> = {
    success: true;
} & T;

type ApiLayerResponseFailure = {
    success: false;
    message: string;
};

export type ApiLayerResponse<T extends {}> =
    | ApiLayerResponseSuccess<T>
    | ApiLayerResponseFailure;
