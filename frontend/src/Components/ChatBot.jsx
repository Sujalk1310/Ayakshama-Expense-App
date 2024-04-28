import React, { useState, useRef, useEffect } from 'react';
import { Textarea } from "flowbite-react";
import { IoSend } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { RiRobot3Fill } from "react-icons/ri";
import { postAPI } from '../axiosUrls';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const ChatBot = () => {
  const [query, setQuery] = useState("");
  const [showBot, setShowBot] = useState(false);
  const [chatHistory, setChatHistory] = useState([{ type: 'bot', message: "Welcome Sir/Ma'am, How may I help you?" }]);

  const chatContainerRef = useRef(null);
  const navigate = useNavigate();

  const toggleChatBot = () => {
    setShowBot(!showBot);
  };

  const handleSendQuery = async (e) => {
    e.preventDefault();
    if (query !== '') {
      const userQuery = { type: 'user', message: query };
      setChatHistory(prevHistory => [...prevHistory, userQuery]);
      setQuery('');
      let message = await sendRequest(query);
      setTimeout(() => {
        const botResponse = { type: 'bot', message: message };
        setChatHistory(prevHistory => [...prevHistory, botResponse]);
      }, 500);
    }
  };

  const sendRequest = async (query) => {
    try {
      const response = await postAPI('/llm', { query });
      return response.data.data;
    } catch (error) {
      toast.error(error.message); 
      if (error.statusCode === 401) navigate('/');
    }
  }

  useEffect(() => {
    // Scroll to the bottom of chat container when new message is added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className='hidden md:block'>
      {showBot ? (
        <div className="fixed bottom-4 right-4 z-50 drop-shadow-xl">
          <div className="flex flex-col h-[400px] max-w-[400px] bg-dark rounded-xl chat-background">

            {/* Cancel button for the chat bot */}
            <div className="absolute p-2" style={{ left: "-45px" }} onClick={toggleChatBot}>
              <MdCancel className="text-white drop-shadow text-2xl cursor-pointer hover:scale-125 transition duration-300 ease-in-out" />
            </div>

            {/* Chat history */}
            <div ref={chatContainerRef} className='overflow-y-scroll d-flex flex-column chat-hist m-auto w-full mt-16'>
              {chatHistory.map((chat, index) => (
                <div key={index} className={`p-3 mt-2 ${chat.type === 'user' ? 'bg-blue-500 text-white align-self-end rounded mx-3' : 'bg-white align-self-start text-black rounded mx-3'}`}>
                  <ReactMarkdown>{chat.message}</ReactMarkdown> 
                </div>
              ))}
            </div>

            {/* Text area and the send button */}
            <div className=''>
              <form className='flex px-2 border-t-2 justify-center p-2 gap-2 m-2' onSubmit={handleSendQuery}>
                <Textarea
                  className='textarea rounded-md mb-0 flex-grow px-3 pt-2 border border-black'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter your query here"
                  required
                />
                <button type='submit' className="bg-blue-500 text-xl w-[60px] hover:bg-blue-700 flex justify-content-center align-items-center text-white font-bold rounded border border-black">
                  <IoSend />
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ fontSize: "40px" }} className="fixed text-white bottom-8 rounded-circle bg-dark shadow-xl p-3 border-5 border-white right-8 z-50 cursor-pointer rounded-full overflow-hidden hover:scale-110 transition duration-300 ease-in-out" onClick={toggleChatBot}>
          <RiRobot3Fill />
        </div>
      )}
    </div>
  )
}

export default ChatBot;
