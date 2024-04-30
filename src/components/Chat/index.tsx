import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { baseUrl } from "../../axios.config";

interface Message {
  _id: string;
  sender_id: string;
  receiver_id: string;
  message: string;
}

interface ChatProps {
  userId: string;
}

interface RecentUser {
  id: string;
  name: string;
  lastChat: string;
}

const Chat: React.FC<ChatProps> = ({ userId }) => {
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

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
    <div style={{ display: "flex" }}>
      <div
        style={{
          flex: "1 1 30%",
          borderRight: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <h2>Recent Users</h2>
        <ul>
          {recentUsers.map((user) => (
            <li
              key={user.id}
              onClick={() => {
                setSelectedUser(user.id);
                setSelectedUserName(user.name);
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="flex gap-2 p-3 rounded-md">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-ellipsis max-w-full text-gray-400">
                    {user.lastChat}
                  </p>
                </div>
              </div>
              <hr className="w-full" />
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: "1 1 70%", padding: "10px" }}>
        {selectedUser && (
          <>
            <h2>Chat with {selectedUserName}</h2>
            <div style={{ maxHeight: "400px", overflowY: "scroll" }}>
              {messages.map((msg) => (
                <div key={msg._id}>
                  <p>{msg.message}</p>
                </div>
              ))}
            </div>
            <div>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
