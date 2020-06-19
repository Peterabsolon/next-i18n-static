import { AppProps } from "next/app"
import { ReactNode, useState } from "react"
import { IntlProvider, addLocaleData } from "react-intl"

type TLocale = "cs" | "en"

type TDictionaries = {
  [key in TLocale]: {
    [messageKey: string]: string
  }
}

export default function MyApp({ Component, pageProps }: AppProps): ReactNode {
  const [locale, setLocale] = useState<TLocale>("en")
  const [dictionaries, setDictionaries] = useState<TDictionaries>({
    cs: {},
    en: {},
  })

  const fetchDictionary = async (locale: TLocale) => {
    if (locale !== "en") {
      const dict = await import(`../translations/locales/${locale}.json`)
      setDictionaries({ ...dictionaries, [locale]: dict })
    }
  }

  const fetchLocaleData = async (locale: TLocale) => {
    if (locale !== "en") {
      const localeData = await import(`react-intl/locale-data/${locale}`)
      addLocaleData(localeData.default)
    }
  }

  const handleChangeLocale = async (locale: TLocale) => {
    await fetchLocaleData(locale)
    await fetchDictionary(locale)
    setLocale(locale)
  }

  return (
    <IntlProvider locale={locale} messages={dictionaries[locale]}>
      <div>
        <div>locale: {locale}</div>

        <div>
          <button type="button" onClick={() => handleChangeLocale("en")}>
            EN
          </button>

          <button type="button" onClick={() => handleChangeLocale("cs")}>
            CZ
          </button>
        </div>

        <Component {...pageProps} locale={locale} />
      </div>
    </IntlProvider>
  )
}
