import Icon from "@mdi/react";
import { mdiCurrencyBtc, mdiCurrencyEur, mdiGold, mdiHelp } from "@mdi/js";
import { CurrencyType } from "../../types/currency";

export default function CurrencyFlag({
    currency,
    className = "h-6 w-6 flex items-center",
}: {
    currency: CurrencyType;
    className?: string;
}) {
    switch (currency) {
        case "EUR":
            return <IconItem className={className} icon={mdiCurrencyEur} />;

        case "BTC":
            return <IconItem className={className} icon={mdiCurrencyBtc} />;

        case "XAG":
        case "XAU":
            return <IconItem className={className} icon={mdiGold} />;

        case "XDR":
            return <IconItem className={className} icon={mdiHelp} />;
    }

    const country = flags[currency] ?? "";

    return (
        <div className={className}>
            <span
                className={`fi fi-${country} fis`}
                style={{
                    width: "inherit",
                    height: "inherit",
                    borderRadius: "50%",
                }}
            ></span>
        </div>
    );
}

function IconItem({ className, icon }: { className: string; icon: string }) {
    return (
        <div className={className}>
            <Icon path={icon} size={1} />
        </div>
    );
}

const flags: {
    [code: string]: string;
} = {
    AFN: "af",
    ALL: "al",
    DZD: "dz",
    USD: "us",
    AOA: "ao",
    XCD: "vc",
    ARS: "ar",
    AMD: "am",
    AWG: "aw",
    AUD: "tv",
    AZN: "az",
    BSD: "bs",
    BHD: "bh",
    BDT: "bd",
    BBD: "bb",
    BOB: "bo",
    BYN: "by",
    BYR: "by",
    BZD: "bz",
    XOF: "tg",
    BMD: "bm",
    INR: "in",
    BOV: "bo",
    BAM: "ba",
    BWP: "bw",
    NOK: "sj",
    BRL: "br",
    BND: "bn",
    BTN: "bt",
    BGN: "bg",
    BIF: "bi",
    CVE: "cv",
    KHR: "kh",
    XAF: "ga",
    CAD: "ca",
    KYD: "ky",
    CLP: "cl",
    CLF: "cl",
    COP: "co",
    CNY: "cn",
    COU: "co",
    KMF: "km",
    CDF: "cd",
    NZD: "tk",
    CRC: "cr",
    HRK: "hr",
    CUP: "cu",
    CUC: "cu",
    ANG: "sx",
    DKK: "gl",
    DJF: "dj",
    DOP: "do",
    EGP: "eg",
    ERN: "er",
    ETB: "et",
    FKP: "fk",
    FJD: "fj",
    XPF: "wf",
    GMD: "gm",
    GEL: "ge",
    GHS: "gh",
    GIP: "gi",
    GTQ: "gt",
    GBP: "gb",
    GGP: "gg",
    GNF: "gn",
    GYD: "gy",
    CZK: "cz",
    HNL: "hn",
    HKD: "hk",
    HTG: "ht",
    HUF: "hu",
    IMP: "im",
    ISK: "is",
    IDR: "id",
    IRR: "ir",
    IQD: "iq",
    ILS: "il",
    JEP: "je",
    JMD: "jm",
    JPY: "jp",
    JOD: "jo",
    KZT: "kz",
    KES: "ke",
    KPW: "kp",
    KRW: "kr",
    KWD: "kw",
    KGS: "kg",
    LAK: "la",
    LBP: "lb",
    ZAR: "za",
    LRD: "lr",
    LSL: "ls",
    LTL: "lt",
    LVL: "lv",
    LYD: "ly",
    CHF: "li",
    MOP: "mo",
    MGA: "mg",
    MWK: "mw",
    MYR: "my",
    MVR: "mv",
    MRU: "mr",
    MRO: "mr",
    MUR: "mu",
    MXV: "mx",
    MDL: "md",
    MNT: "mn",
    MAD: "eh",
    MXN: "mx",
    MZN: "mz",
    MMK: "mm",
    NAD: "na",
    NPR: "np",
    NIO: "ni",
    NGN: "ng",
    OMR: "om",
    PAB: "pa",
    PKR: "pk",
    PGK: "pg",
    PYG: "py",
    PEN: "pe",
    PHP: "ph",
    PLN: "pl",
    QAR: "qa",
    MKD: "mk",
    RON: "ro",
    RUB: "ru",
    RWF: "rw",
    SHP: "sh",
    WST: "ws",
    STN: "st",
    STD: "st",
    SAR: "sa",
    RSD: "rs",
    SCR: "sc",
    SLE: "sl",
    SLL: "sl",
    SGD: "sg",
    SBD: "sb",
    SOS: "so",
    SSP: "ss",
    LKR: "lk",
    SDG: "sd",
    SRD: "sr",
    SEK: "se",
    SVC: "sv",
    SZL: "sz",
    CHW: "ch",
    SYP: "sy",
    TWD: "tw",
    TJS: "tj",
    TZS: "tz",
    THB: "th",
    TOP: "to",
    TTD: "tt",
    TND: "tn",
    TRY: "tr",
    TMT: "tm",
    UGX: "ug",
    UAH: "ua",
    AED: "ae",
    USN: "us",
    UYU: "uy",
    UZS: "uz",
    VUV: "vu",
    VED: "ve",
    VEF: "ve",
    VES: "ve",
    VND: "vn",
    YER: "ye",
    ZMW: "zm",
    ZMK: "zm",
    ZWL: "zw",
};
