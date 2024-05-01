import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from "react";
import axios from "axios";
import { baseUrl } from "../../axios.config";
import { UserContext } from "../../App";
import { IoSend } from "react-icons/io5";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import { PiChatCircleTextThin } from "react-icons/pi";

interface Message {
  _id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
  seen: boolean;
}

interface ChatProps {}

interface RecentUser {
  id: string;
  name: string;
  lastChat: string;
  receiver_id: string;
  sender_id: string;
  seen: boolean;
}

const Chat: React.FC<ChatProps> = () => {
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const { userId } = useContext(UserContext);

  const socket = io(baseUrl);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const fetchRecentUsers = useCallback(() => {
    return new Promise<RecentUser[]>(async (resolve, reject) => {
      try {
        const response = await axios.get<string[]>(
          `${baseUrl}/chat/recent-users/${userId}`
        );

        const chatUserIds = Array.from(
          new Set(response.data.filter((id) => id))
        );

        const usersInfoPromises = chatUserIds.map((sellerId) =>
          sellerId !== userId ? axios.get(baseUrl + "/user/" + sellerId) : null
        );

        const recentUsers: any = [];
        const usersInfo = await Promise.all(
          usersInfoPromises.filter((promise) => promise)
        );

        for (let i = 0; i < usersInfo.length; i++) {
          const user = usersInfo[i]?.data;
          if (user) {
            let lastChat;
            try {
              lastChat = await axios.get(
                baseUrl + `/chat/recent/${userId}/${user._id}`
              );
            } catch (e) {}
            recentUsers.push({
              id: user._id,
              name: user.first_name + user.last_name,
              lastChat: lastChat?.data.message || "",
              receiver_id: lastChat?.data.receiver_id || "",
              sender_id: lastChat?.data.sender_id || "",
              seen: lastChat?.data.seen || true,
            });
          }
        }
        resolve(recentUsers);
      } catch (error) {
        reject(error);
      }
    });
  }, [userId]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const recentUsers = await fetchRecentUsers();
        setRecentUsers(recentUsers);
      } catch (e) {}
    };
    fetch();
  }, [fetchRecentUsers]);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser);
    }
  }, [selectedUser]);

  useEffect(() => {
    socket.on("new_message", (newMessage: Message) => {
      if (
        (newMessage.sender_id === userId &&
          newMessage.receiver_id === selectedUser) ||
        (newMessage.receiver_id === userId &&
          newMessage.sender_id === selectedUser)
      ) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
      setRecentUsers((prev) =>
        prev.map((user) => {
          if (
            user.id === newMessage.sender_id ||
            user.id === newMessage.receiver_id
          ) {
            return {
              ...user,
              lastChat: newMessage.message,
              seen: newMessage.seen,
              receiver_id: newMessage.receiver_id,
              sender_id: newMessage.sender_id,
            };
          }
          return user;
        })
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [selectedUser, userId, socket]);

  const fetchMessages = async (otherUserId: string) => {
    try {
      const response = await axios.get<Message[]>(
        `${baseUrl}/chat/${userId}/${otherUserId}`
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    try {
      if (selectedUser) {
        await axios.post(baseUrl + "/chat/send", {
          sender_id: userId,
          receiver_id: selectedUser,
          message,
        });
        setMessage("");
        fetchMessages(selectedUser);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="">
      <div className="flex gap-1 px-6 my-5">
        <Link
          to={"/QuickBizz"}
          className="text-gray-600 hover:underline hover:text-primary text-sm"
        >
          Home
        </Link>
        <div className="text-gray-400">/</div>
        <Link
          to={"/account"}
          className="text-gray-600 hover:underline hover:text-primary text-sm"
        >
          Account
        </Link>
        <div className="text-gray-400">/</div>
        <Link
          to={"/account/messages"}
          className="text-gray-600 hover:underline hover:text-primary text-sm"
        >
          Message
        </Link>
      </div>
      <div style={{ display: "flex" }} className="flex h-[75vh]">
        <div
          style={{
            width: "30%",
          }}
          className="flex flex-col p-5"
        >
          <h2 className="text-lg font-semibold text-gray-600 mb-4">Messages</h2>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            id="search-in-chat"
            placeholder="Search in chat"
            className="text-sm p-2 mb-4 rounded-sm bg-gray-100 text-gray-600 w-full focus:outline-none focus:outline-primary"
          />
          <div className="overflow-hidden max-w-full">
            <ul>
              {recentUsers.map((user) => (
                <li
                  key={user.id}
                  onClick={() => {
                    setSelectedUser(user.id);
                    setSelectedUserName(user.name);
                  }}
                  style={{ cursor: "pointer" }}
                  className="text-gray-600 hover:font-normal hover:text-gray-600"
                >
                  <div className="w-full flex gap-2 p-3 hover:bg-gray-100 rounded my-1">
                    <div className="min-w-10 min-h-10 bg-gray-200 rounded-full"></div>
                    <div className="w-full">
                      <p className="font-normal text-gray-800">{user.name}</p>
                      {/* <div className="w-full flex items-center justify-between gap-3"> */}
                      <p
                        className="text-sm w-[70%] flex"
                        style={{
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          color: user.seen ? "#999999" : "#333333",
                        }}
                      >
                        {user.sender_id === userId && user.lastChat
                          ? "You: " + user.lastChat
                          : user.lastChat
                          ? user.lastChat
                          : ""}
                        {!user.lastChat && "Start a chat"}
                      </p>
                      {/* {!user.seen && user.lastChat && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div> */}
                    </div>
                  </div>
                  <hr />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          style={{ width: "70%", padding: "10px" }}
          className="flex flex-col border-t border-gray-600 mr-7"
        >
          {selectedUser ? (
            <>
              <div className="flex items-center w-full p-3 px-5 gap-2">
                <div className="rounded-full bg-gray-200 w-10 h-10"></div>
                <div>{selectedUserName}</div>
              </div>
              <div className="overflow-x-hidden  flex-grow px-7">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`p-2 text-sm text-white ${
                      msg.sender_id === userId
                        ? "bg-secondaryLight"
                        : "bg-secondaryDark"
                    } w-max mb-3`}
                    style={{
                      borderRadius:
                        msg.sender_id === userId
                          ? "10px 10px 0 10px"
                          : "10px 10px 10px 0",
                      marginLeft: msg.sender_id === userId ? "auto" : "0",
                      marginRight: msg.sender_id !== userId ? "auto" : "0",
                      maxWidth: "66.66%",
                      overflowWrap: "break-word",
                    }}
                  >
                    <p>{msg.message}</p>
                  </div>
                ))}
                <div ref={messagesEndRef} className="w-full h-12" />
              </div>
              <div className="flex w-full gap-3">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full bg-gray-100 rounded-md p-3 text-sm outline-none text-gray-600 focus:outline-none border border-transparent focus:border-secondaryDark"
                />
                <button
                  onClick={sendMessage}
                  className="bg-secondaryDark p-2 px-3 text-white rounded-md"
                >
                  <IoSend size={20} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col flex-grow items-center justify-center mt-16 text-center">
              <PiChatCircleTextThin size={50} className="mb-4" />
              <div>Your chat will appear here. </div>
              <div className="text-sm text-gray-500">
                (Chat are end to end encrypted)
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
