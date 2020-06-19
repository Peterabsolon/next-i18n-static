import { AppProps } from "next/app"
import Link from "next/link"
import { ReactNode, useState, FC, useEffect } from "react"
import { IntlProvider, addLocaleData } from "react-intl"

import {
  TLocales,
  TLocale,
  TDictionaries,
  DEFAULT_LOCALE,
} from "../constants/intl"
import { ROUTES } from "../constants/routes"

export default function MyApp({ Component, pageProps }: AppProps): ReactNode {
  const [ready, setReady] = useState<boolean>(false)
  const [locale, setLocale] = useState<TLocale>("en")
  const [dictionaries, setDictionaries] = useState<TDictionaries>({
    cs: {},
    en: {},
  })

  useEffect(() => {
    loadLocale()
  }, [])

  const loadLocale = async () => {
    const savedLocale = window.localStorage.getItem("locale") || ""
    const validLocale = Object.keys(TLocales).includes(savedLocale)
      ? savedLocale
      : DEFAULT_LOCALE

    handleChangeLocale(validLocale as TLocale)
  }

  const fetchDictionary = async (locale: TLocale) => {
    const dict = await import(`../translations/locales/${locale}.json`)
    setDictionaries({ ...dictionaries, [locale]: dict })
  }

  const fetchLocaleData = async (locale: TLocale) => {
    const localeData = await import(`react-intl/locale-data/${locale}`)
    addLocaleData(localeData.default)
  }

  const handleSetLocale = (locale: TLocale) => {
    window.localStorage.setItem("locale", locale)
    setLocale(locale)
  }

  const handleChangeLocale = async (locale: TLocale) => {
    if (locale !== "en") {
      await fetchLocaleData(locale)
      await fetchDictionary(locale)
    }

    handleSetLocale(locale)
    setReady(true)
  }

  if (!ready) {
    // or some loader...
    return null
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
      // Use EN version for the link (so Next knows what to resolve from ~/pages)
      const href = paths.en

      // Grab localised version for the URL & label
      const path = paths[locale]
      const label = labels[locale]

      return (
        <Link href={href} as={path} key={path}>
          <a style={{ marginRight: 5 }}>{label}</a>
        </Link>
      )
    })}
  </div>
)
