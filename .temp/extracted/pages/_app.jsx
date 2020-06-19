var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState } from "react";
import { IntlProvider, addLocaleData } from "react-intl";
export default function MyApp({ Component, pageProps }) {
    const [locale, setLocale] = useState("en");
    const [dictionaries, setDictionaries] = useState({
        cs: {},
        en: {},
    });
    const fetchDictionary = (locale) => __awaiter(this, void 0, void 0, function* () {
        if (locale !== "en") {
            const dict = yield import(`../translations/locales/${locale}.json`);
            setDictionaries(Object.assign(Object.assign({}, dictionaries), { [locale]: dict }));
        }
    });
    const fetchLocaleData = (locale) => __awaiter(this, void 0, void 0, function* () {
        if (locale !== "en") {
            const localeData = yield import(`react-intl/locale-data/${locale}`);
            addLocaleData(localeData.default);
        }
    });
    const handleChangeLocale = (locale) => __awaiter(this, void 0, void 0, function* () {
        setLocale(locale);
        fetchDictionary(locale);
        fetchLocaleData(locale);
    });
    return (<IntlProvider locale={locale} messages={dictionaries[locale]}>
      <div>locale: {locale}</div>

      <div>
        <button type="button" onClick={() => handleChangeLocale("en")}>
          EN
        </button>

        <button type="button" onClick={() => handleChangeLocale("cs")}>
          CZ
        </button>
      </div>
      <Component {...pageProps}/>
    </IntlProvider>);
}
