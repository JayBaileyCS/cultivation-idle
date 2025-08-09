import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { storyMessages } from './storyMessages';

class StoryManager {
    constructor() {
        this.messages = [{
            id: 1,
            category: "Advancement",
            desc: "Chi Gathering 1",
            text: storyMessages['Advancement']['Chi Gathering'][1].text,
            timestamp: new Date()
        }];
        this.listeners = new Set();
    }

    addMessage(message) {
        this.messages.push({
            id: Date.now() + Math.random(),
            category: message.category,
            desc: message.desc,
            text: message.text,
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
                height: '550px',
                overflowY: 'auto',
                border: '1px solid #ccc',
                padding: '10px',
                backgroundColor: '#f9f9f9'
            }}
        >
            {messages.map(message => (
                <div key={message.id} style={{ marginBottom: '8px' }}>
                    <div style={{ fontSize: '14px', color: '#333' }}>
                        <ReactMarkdown>
                            {`**${message.desc}:** ${message.text}`}
                        </ReactMarkdown>
                    </div>
                    <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>
                        {message.timestamp.toLocaleTimeString()}
                    </div>
                </div>
            ))}
        </div>
    );
}