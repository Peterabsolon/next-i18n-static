// Enums can be treated as a value -> used for map, filter etc
export enum TLocales {
  "cs" = "cs",
  "en" = "en",
}

// Generate keys from the enum. Yields union type: 'cs' | 'en'
export type TLocale = keyof typeof TLocales

export const DEFAULT_LOCALE: TLocale = "cs"

export type TDictionaries = {
  [key in TLocale]: {
    [messageKey: string]: string
  }
}
