import { TLocale } from "../constants/intl"

type TRouteKey = "home" | "products"

type TRoute = {
  paths: {
    [key in TLocale]: string
  }
}

type TRoutes = { [key in TRouteKey]: TRoute }

export const routes: TRoutes = {
  home: {
    paths: {
      en: "/",
      cs: "/",
    },
  },

  products: {
    paths: {
      en: "/products",
      cs: "/produkty",
    },
  },
}
