import { createContext } from "react";
import { CurrencyList } from "../types/currency";

export const CurrencyContext = createContext<CurrencyList>({});
