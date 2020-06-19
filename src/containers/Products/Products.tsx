import { FormattedMessage } from "react-intl"

import { messages } from "./Products.messages"

export function Products() {
  return (
    <div>
      <FormattedMessage {...messages.title} />
    </div>
  )
}
