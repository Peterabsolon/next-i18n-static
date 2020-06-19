import { FormattedMessage } from "react-intl";
import { messages } from "./MyPage.messages";
export function MyPage() {
    return (<div>
      <FormattedMessage {...messages.title}/>
    </div>);
}
