import React, { useState, useEffect, useRef } from 'react';

class StoryManager {
    constructor() {
        this.messages = [{
            id: 1,
            text: "You are not a cultivator.\n\nFor fifteen years, you have lived as a farmer in the Valley of Wei.",
            timestamp: new Date()
        }];
        this.listeners = new Set();
    }

    addMessage(message) {
        this.messages.push({
            id: Date.now() + Math.random(),
            text: message,
            timestamp: new Date()
        });
        this.notifyListeners();
    }

    getMessages() {
        return [...this.messages];
    }

    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    notifyListeners() {
        this.listeners.forEach(listener => listener());
    }
}

export const storyManager = new StoryManager();

export function StoryDisplay() {
    const [messages, setMessages] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        setMessages(storyManager.getMessages());

        const unsubscribe = storyManager.subscribe(() => {
            setMessages(storyManager.getMessages());
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div 
            ref={scrollRef}
            style={{
                height: '300px',
                overflowY: 'auto',
                border: '1px solid #ccc',
                padding: '10px',
                backgroundColor: '#f9f9f9'
            }}
        >
            {messages.map(message => (
                <div key={message.id} style={{ marginBottom: '8px' }}>
                    <div style={{ fontSize: '14px', color: '#333' }}>
                        {message.text}
                    </div>
                    <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>
                        {message.timestamp.toLocaleTimeString()}
                    </div>
                </div>
            ))}
        </div>
    );
}