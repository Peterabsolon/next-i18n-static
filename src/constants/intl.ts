export type TLocale = "cs" | "en"

export type TDictionaries = {
  [key in TLocale]: {
    [messageKey: string]: string
  }
}
