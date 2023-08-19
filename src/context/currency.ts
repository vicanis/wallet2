import { createContext, useContext } from "react";
import { CurrencyList } from "../types/currency";

const CurrencyContext = createContext<CurrencyList>({});

export const CurrencyProvider = CurrencyContext.Provider;

export const useCurrencyContext = () =>
    useContext<CurrencyList>(CurrencyContext);
