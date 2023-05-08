import React, { Fragment, useState, useEffect } from 'react';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

export default function Chatgpt() {

  const [typing, setTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      message: "Hello, I am ChatGPT!",
      sender: "ChatGPT",
    }
  ]);

  const handleSend = async (message) => {

    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    }

    // 更新 messages state
    const newMessages = [...messages, newMessage]; // 所有舊訊息，加上新訊息

    setMessages(newMessages);

    // 設定一個等候中的顯示訊息
    setTyping(true);
    // 處理給chatGpt的請求與回復

  }

  return (
    <section className='container'>
      <div className='position-relative col-8 mx-auto' style={{height:"800px"}}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              typingIndicator={ typing ? <TypingIndicator content="正在回覆中"/> : null}
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />
              })}

            </MessageList>
            <MessageInput placeholder="輸入相關問題" onsend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </section>

  )
}