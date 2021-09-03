import { useEffect, useState } from "react";
import "./conversations.css";
import axios from "axios";

const Conversations = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + friendId);
        setUser(res.data)
      } catch (e) {
        console.log(e);
      }
    };
      getUser()
  }, [currentUser, conversation]);
  return(
    <div className="conversation">
      <img src="https://pbs.twimg.com/profile_images/1033743266041290752/iUhPnzVK_400x400.jpg" alt="n" className="conversationImg" />
      <span className="conversationName">{user?.username}</span>
    </div>
  )
};

export default Conversations;
