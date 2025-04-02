import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ message, isBot }) => {
    return (
        <div className={`message-wrapper ${isBot ? 'bot' : 'user'}`}>
            <div className="message-bubble" dangerouslySetInnerHTML={{ __html: message }} />
        </div>
    );
};

export default ChatMessage;