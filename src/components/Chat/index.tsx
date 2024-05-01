import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { baseUrl } from "../../axios.config";
import { UserContext } from "../../App";
import { IoSend } from "react-icons/io5";

interface Message {
  _id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
}

interface ChatProps {}

interface RecentUser {
  id: string;
  name: string;
  lastChat: string;
}

const Chat: React.FC<ChatProps> = () => {
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const { userId } = useContext(UserContext);

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
            try {
              const lastChat = await axios.get(
                baseUrl + `/chat/recent/${userId}/${user._id}`
              );
              recentUsers.push({
                id: user._id,
                name: user.first_name + user.last_name,
                lastChat: lastChat.data.message,
              });
            } catch (e) {}
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
    <div style={{ display: "flex" }} className="flex h-[80vh]">
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
                <div className="w-full flex gap-2 p-3 hover:bg-gray-100 rounded mb-1">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="w-full">
                    <p className="font-normal text-gray-800">{user.name}</p>
                    <p
                      className="text-sm w-full text-gray-400"
                      style={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {user.lastChat}
                    </p>
                  </div>
                </div>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div style={{ width: "70%", padding: "10px" }} className="flex flex-col">
        {selectedUser && (
          <>
            <div className="flex items-center w-full p-3 px-5 gap-2">
              <div className="rounded-full bg-gray-200 w-10 h-10"></div>
              <div>{selectedUserName}</div>
            </div>
            <div className="overflow-x-hidden overflow-y-auto flex-grow px-7">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`p-2 text-sm text-white bg-secondaryDark w-max mb-3`}
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
        )}
      </div>
    </div>
  );
};

export default Chat;
