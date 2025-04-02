import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import './ChatContainer.css';

const API_URL = import.meta.env.VITE_API_HOST || 'http://127.0.0.1:3000';

const ChatContainer = () => {
    const [messages, setMessages] = useState([
        { text: "<p>¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?</p>", isBot: true }
    ]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const handleSendMessage = async (message) => {
        setMessages(prev => [...prev, { text: `<p>${message}</p>`, isBot: false }]);
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });

            const data = await response.json();
            console.log(data)

            if(data.sessionState.intent.name === 'NPacientes') {
                setMessages(prev => [...prev, ...data.messages.map(msg => ({text: msg.content, isBot: true}))]);
            }

        } catch (error) {
            console.error("Error en la API:", error);
            setMessages(prev => [...prev, { text: "Lo siento, hubo un error en el servidor.", isBot: true }]);
        }

        setLoading(false);
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="chat-container">
            <div className="chat-header">
                <div className="chat-header-info">
                    <h1>ChatBot</h1>
                    <span className="status">En línea</span>
                </div>
            </div>

            <div className="messages-area">
                {messages.map((msg, index) => (
                    <ChatMessage key={index} message={msg.text} isBot={msg.isBot} />
                ))}
                {loading && <ChatMessage message="Escribiendo..." isBot={true} />}
                <div ref={messagesEndRef} />
            </div>

            <div className="input-area">
                <ChatInput onSendMessage={handleSendMessage} />
            </div>
        </div>
    );
};

export default ChatContainer;