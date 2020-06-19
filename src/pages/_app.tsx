import { AppProps } from "next/app"
import Link from "next/link"
import { ReactNode, useState, FC } from "react"
import { IntlProvider, addLocaleData } from "react-intl"

import { TLocales, TLocale, TDictionaries } from "../constants/intl"
import { ROUTES } from "../constants/routes"

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
      <>
        <LocaleSelect locale={locale} handleChange={handleChangeLocale} />
        <Navigation locale={locale} />
        <Component {...pageProps} locale={locale} />
      </>
    </IntlProvider>
  )
}

const LocaleSelect: FC<{
  locale: TLocale
  handleChange: (locale: TLocale) => void
}> = ({ locale, handleChange }) => (
  <div style={{ marginBottom: 24 }}>
    <div>Locale: {locale}</div>

    <div>
      {Object.keys(TLocales).map((locale) => (
        <button
          key={locale}
          type="button"
          // Object.keys nukes type information so we need to typecast using "as" here
          onClick={() => handleChange(locale as TLocale)}
        >
          {locale}
        </button>
      ))}
    </div>
  </div>
)

const Navigation: FC<{ locale: TLocale }> = ({ locale }) => (
  <div style={{ marginBottom: 24 }}>
    {Object.values(ROUTES).map(({ labels, paths }) => {
      const path = paths[locale]
      const label = labels[locale]

      return (
        <Link href={path} key={path}>
          <a style={{ marginRight: 5 }}>{label}</a>
        </Link>
      )
    })}
  </div>
)
