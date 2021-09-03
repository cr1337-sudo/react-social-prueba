import "./message.css"
import {format} from "timeago.js"

const Message = ({message, own}) => {
  return(
    <div class={own ? "message own" : "message"}>
      <div className="messageTop">
        <img src="https://pbs.twimg.com/profile_images/1033743266041290752/iUhPnzVK_400x400.jpg" alt="" className="messageImg" />
        <p className="messageText">
          {message.text}
        </p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}

export default Message
