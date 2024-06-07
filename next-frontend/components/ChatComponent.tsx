'use client'

import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { animateScroll } from 'react-scroll'

type Message = { sender: 'user' | 'ai'; text: string }

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: "Hello! I'm an AI meant to simulate Nick. I'm powered by the GPT API. How can I help you today?",
    },
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = async () => {
    if (input.trim() === '') return

    const userMessage: Message = { sender: 'user', text: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')

    try {
      const response = await axios.post('http://localhost/api/ask_nick', {
        query: input,
        history: newMessages,
      })
      const aiMessage: Message = { sender: 'ai', text: response.data.response }
      setMessages([...newMessages, aiMessage])
    } catch (error) {
      console.error('Error fetching response from API:', error)
      const errorMessage: Message = {
        sender: 'ai',
        text: 'Sorry, there was an error processing your request.',
      }
      setMessages([...newMessages, errorMessage])
    }
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      animateScroll.scrollToBottom({
        containerId: 'messagesContainer',
        duration: 500,
        delay: 0,
        smooth: 'easeInOutQuad',
      })
    }
  }, [messages])

  return (
    <div className="mt-16 flex h-full w-full items-center justify-center">
      <div className="flex h-[50vh] w-4/5 flex-col rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
        <div id="messagesContainer" className="mb-4 flex-1 overflow-y-auto pr-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
            >
              <div
                className={`max-w-xs rounded-lg px-4 py-2 ${message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white'
                  }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex">
          <input
            type="text"
            className="flex-1 rounded-l-lg border border-gray-300 px-4 py-2 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
          />
          <button
            className="rounded-r-lg bg-blue-500 px-4 py-2 text-white"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatComponent
