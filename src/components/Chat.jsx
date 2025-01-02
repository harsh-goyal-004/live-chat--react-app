import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { listenMessage, sendMessage } from "../firebase/chatService";

function Chat() {
  const { id } = useParams(); //Extract Reciever ID
  console.log(id);
  const recieverId = id;
  const senderId = useSelector((state) => state.auth.userData.uid);
  const chatId =
    senderId < recieverId
      ? `${senderId}_${recieverId}`
      : `${recieverId}_${senderId}`;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState();

  useEffect(() => {
    const unsubscribe = listenMessage(chatId, setMessages);
    return () => unsubscribe(); //cleanup on unmount
  }, [id]);

  const handleNewMessage = async () => {
    if (newMessage.trim() !== "") {
      await sendMessage(chatId, senderId, newMessage);
      setNewMessage("");
    }
  };

  return (
    <>
      <div className="relative min-h-screen ">
        <div>
          {messages.length > 0
            ? messages.map((msg) => (
                <div
                  className={
                    msg.sender === senderId
                      ? "flex flex-col justify-items-end items-end"
                      : "flex flex-col justify-items-start items-start"
                  }
                >
                  <p
                    className={
                      msg.sender === senderId
                        ? "inline-block border-2 bg-white px-2 my-2 rounded-lg text-lg rounded-tr-none mr-3 "
                        : "inline-block border-2 bg-white px-2 my-2 rounded-lg text-lg rounded-b-lg rounded-tl-none ml-3 "
                    }
                  >
                    {msg.text}
                  </p>
                </div>
              ))
            : null}
        </div>

        <div className="absolute bottom-0 w-full ">
          <div className="flex items-center">
            <input
              className="py-2 pl-2 flex-grow border border-gray-300 "
              type="text"
              placeholder="Type something..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2  hover:bg-blue-600 "
              onClick={handleNewMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
