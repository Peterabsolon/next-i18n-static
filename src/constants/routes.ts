import { TLocale } from "../constants/intl"

type TRouteKey = "home" | "products"

type TRoute = {
  labels: {
    [key in TLocale]: string
  }
  paths: {
    [key in TLocale]: string
  }
}

type TRoutes = { [key in TRouteKey]: TRoute }

export const ROUTES: TRoutes = {
  home: {
    labels: {
      en: "Home",
      cs: "Domů",
    },
    paths: {
      en: "/",
      cs: "/",
    },
  },

  products: {
    labels: {
      en: "Products",
      cs: "Produkty",
    },
    paths: {
      en: "/products",
      cs: "/produkty",
    },
  },
}
