import { FormattedMessage } from "react-intl"

import { messages } from "./Home.messages"

export function Home() {
  return (
    <div>
      <FormattedMessage {...messages.title} />
    </div>
  )
}
