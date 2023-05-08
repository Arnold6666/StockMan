import React, { Fragment, useState, useEffect } from 'react';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

export default function Chatgpt() {
  const [messages, setMessages] = useState([{
    messages: "Hello, I am ChatGPT!",
    sender: "ChatGPT"
  }]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender:"user"
    }

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    // 更新 messages state
    // 處理給chatGpt的請求與回復

  }

  return (
    <div style={{ position: "relative", height: "800px", width: "700px" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {message.map((message,i)=>{
              return <Message key={i} modal={message}/>
            })}
          </MessageList>
          <MessageInput placeholder='Type message here' onsend={handleSend}/>
        </ChatContainer>
      </MainContainer>
    </div>
  )
}