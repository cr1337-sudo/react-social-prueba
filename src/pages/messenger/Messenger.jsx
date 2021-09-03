import "./messenger.css";
import Conversation from "../../components/conversations/Conversations";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState("")
  const socket = useRef()
  const scrollRef = useRef();
  const { user } = useContext(AuthContext);

  useEffect(()=>{
    socket.current =  io("ws://localhost:8008")
    socket.current.on("getMessage", data=>{
      setArrivalMessage({
        sender:data.senderId,
        text:data.text,
        createdAt: Date.now()
      })
    })
  },[])

  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages(prev=>[...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    socket.current.emit("addUser", user._id)
    socket.current.on("getUsers", users=>{
      console.log(users)
    })

  }, [socket])

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getMessages();
  }, [currentChat]);

useEffect(() => {
  
}, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(member => member !== user._id)

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage

    })
    try {
      const res = await axios.post("/messages/", message);
      setMessages([...messages, res.data]);
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      setNewMessage("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="messenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input
            type="text"
            placeholder="Search friends"
            className="chatMenuInput"
          />
          {conversations.map((conversation) => (
            <div onClick={() => setCurrentChat(conversation)}>
              <Conversation
                key={conversation._id}
                conversation={conversation}
                currentUser={user}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat ? (
            <>
              <div className="chatBoxTop">
                {messages.map((m) => (
                  <>
                    <div ref={scrollRef}></div>
                    <Message message={m} own={m.sender === user._id} />
                  </>
                ))}
              </div>
              <div className="chatBoxBottom">
                <form action="/" onSubmit={handleSubmit}>
                  <textarea
                    id=""
                    className="chatMessageInput"
                    name=""
                    rows="3"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" type="submit">
                    Send
                  </button>
                </form>
              </div>
            </>
          ) : (
            <span className="noConversationText">Please select a chat</span>
          )}
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline />
        </div>
      </div>
    </div>
  );
};

export default Messenger;
