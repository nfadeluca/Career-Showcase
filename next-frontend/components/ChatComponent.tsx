'use client'

import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { animateScroll } from 'react-scroll'
import AnimatedImageComponent from './AnimatedImageComponent'

type Message = { sender: 'user' | 'Nick'; text: string }

const ChatComponent: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'Nick',
      text: "Hello! I'm an AI meant to simulate Nick. I'm powered by the GPT API. How can I help you today?",
    },
  ])
  const [input, setInput] = useState('')
  const [triggerImageChange, setTriggerImageChange] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = async () => {
    if (input.trim() === '') return

    const userMessage: Message = { sender: 'user', text: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')

    try {
      const response = await axios.post(`/backend-flask/api/ask_nick`, {
        query: input,
        history: newMessages,
      })
      const aiMessage: Message = { sender: 'Nick', text: response.data.response }
      setMessages([...newMessages, aiMessage])
      setTriggerImageChange(true)
    } catch (error) {
      console.error('Error fetching response from API:', error)
      const errorMessage: Message = {
        sender: 'Nick',
        text: 'Sorry, there was an error processing your request.',
      }
      setMessages([...newMessages, errorMessage])
      setTriggerImageChange(true)
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

  useEffect(() => {
    if (triggerImageChange) {
      const timer = setTimeout(() => setTriggerImageChange(false), 1000)
      return () => clearTimeout(timer)
    }
  }, [triggerImageChange])

  return (
    <div className="mt-16 flex h-full w-full items-center justify-center">
      <div className="flex h-[70vh] w-full flex-row space-x-4">
        <AnimatedImageComponent triggerChange={triggerImageChange} />
        <div className="flex h-[70vh] w-3/4 flex-col rounded-lg bg-white p-4 shadow-lg dark:bg-gray-900">
          <div id="messagesContainer" className="mb-4 flex-1 overflow-y-auto pr-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
              >
                <div
                  className={`max-w-xs rounded-lg px-4 py-2 ${message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-black dark:bg-gray-800 dark:text-white'
                    }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex focus:outline-none focus:border-transparent">
            <input
              type="text"
              className="flex-1 rounded-l-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-transparent focus:border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:dark:border-gray-600"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
            />
            <button
              className="rounded-r-lg bg-blue-500 px-4 py-2 text-white focus:outline-none focus:border-transparent"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatComponent
