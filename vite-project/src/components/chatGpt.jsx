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
import axios from 'axios';


export default function Chatgpt() {
  
  if(sessionStorage.getItem("key") === null){
      sessionStorage.setItem('key', prompt("請輸入您的 OpenAI API key"))
  }

  console.log(sessionStorage.getItem("key"));

  const [typing, setTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      message: "您好，請問您有什麼問題",
      sender: "ChatGPT",
    }
  ]);

  const handleSend = async (message) => {

    axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem("key")}`;

    const newMessage = {
      message,
      sender: "user",
      direction: "outgoing"
    }

    // 更新 messages state
    const newMessages = [...messages, newMessage]; // 所有舊訊息，加上新訊息

    setMessages(newMessages);

    // 設定一個等候中的顯示訊息
    setTyping(true);
    // 處理給chatGpt的請求與回復
    await processMessageToChatGPT(newMessages);
  }

  async function processMessageToChatGPT(chatMessages) {
    // chatMessages {sender: "user" or "ChatGPT", message: "The message content here"}
    // apiMessages {role: "user" or "assistant", message: "The message content here"}

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant"
      } else {
        role = "user"
      }
      return { role: role, content: messageObject.message }
    })

    // role : "user" -> 使用者輸入的訊息, "assistant" -> 來自GPT的回覆
    //  "system" -> 通常為一個起始訊息，設定我們想要gpt使用哪種方式回覆

    const systemMessage = {
      role: "system",
      content: "已具有20年經驗的投資顧問來回答所有問題"
    }

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages //[message1, message2, message3]
      ]
    }


    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', apiRequestBody, {
        header: {
          "Content-Type": "application/json"
        },
        // body: JSON.stringify(apiRequestBody)

      })
      // console.log(response);
      setMessages(
        [...chatMessages, {
          message: response.data.choices[0].message.content,
          sender: "ChatGPT"
        }]
      )
      setTyping(false);
    } catch (error) {
      console.error(error)
    }

  }

  return (
    <section className='container mt-5'>
      <div className='position-relative col-8 mx-auto rounded' style={{ height: "800px" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior='smooth'
              typingIndicator={typing ? <TypingIndicator content="ChatGPT is typing" /> : null}
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} />
              })}

            </MessageList>
            <MessageInput placeholder="輸入相關問題" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </section>

  )
}