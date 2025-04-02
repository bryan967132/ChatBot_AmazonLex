import React from 'react';
import ChatContainer from './components/ChatContainer';
import './App.css';

function App() {
    return (
        <div className="app-container">
            <div className="chat-wrapper">
                <ChatContainer />
            </div>
        </div>
    );
}

export default App;