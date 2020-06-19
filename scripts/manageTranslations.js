/*
 * This script takes the extracted string outputted by babel-react-intl plugin
 * and generates two files per supported locale. This library tracks translations
 * and makes sure there are no duplicate keys
 */

const manageTranslations = require("react-intl-translations-manager").default

manageTranslations({
  messagesDirectory: ".temp/messages/.temp",
  translationsDirectory: "src/translations/locales/",
  languages: ["cs"], // Any translation --- don't include the default language
})
