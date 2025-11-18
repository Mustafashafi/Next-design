'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: 'AI', text: 'Hi! I’m your AI Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const chatBoxRef = useRef(null);

  const scrollChat = () => {
    const chatBox = chatBoxRef.current;
    if (!chatBox) return;
    chatBox.scrollTop = chatBox.scrollHeight;
  };

  useEffect(() => {
    scrollChat();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'You', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('https://mustafan8n7.app.n8n.cloud/webhook/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      let botReply = '';
      const contentType = res.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        const data = await res.json();
        botReply = data.reply ?? 'No reply from bot.';
      } else {
        botReply = await res.text();
      }

      setMessages(prev => [...prev, { sender: 'AI', text: botReply }]);
    } catch {
      setMessages(prev => [...prev, { sender: 'AI', text: 'Error connecting to AI agent.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      <button
        className={`chat-toggle ${open ? 'hidden' : ''}`}
        onClick={() => setOpen(true)}
      >
        🤖
      </button>

      {open && (
        <div className="chat-wrapper">
          <div className="chat-container">
            <div className="chat-header">
              <span className="bot-avatar">🤖</span>
              <h3>AI Assistant</h3>
              <button className="close-btn" onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="chat-box" ref={chatBoxRef}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`message ${msg.sender === 'AI' ? 'ai' : 'user'}`}>
                  <div className="bubble">
                    {msg.sender === 'AI' ? (
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="message ai">
                  <div className="bubble typing">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              )}
            </div>

            <div className="input-box">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                disabled={loading}
              />
              <button onClick={handleSend} disabled={loading}>
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .chat-toggle {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #186cb5;
          color: white;
          border: none;
          padding: 16px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
          z-index: 500;
          transition: transform 0.2s ease;
        }
        .chat-toggle.hidden { display: none !important; }
        .chat-toggle:hover { transform: scale(1.1); }

        .chat-wrapper {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 90%;
          max-width: 400px;
          height: 400px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 12px 24px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 999;
        }

        .chat-container { display: flex; flex-direction: column; height: 100%; }

        .chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          background: #186cb5;
          color: white;
          font-weight: bold;
        }

        .bot-avatar { font-size: 22px; }
        .close-btn { background: transparent; border: none; color: white; cursor: pointer; }

        .chat-box {
          flex: 1;
          padding: 10px;
          background: #f8fafc;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #186cb5 #e2e8f0;
        }
        .chat-box::-webkit-scrollbar { width: 8px; }
        .chat-box::-webkit-scrollbar-track { background: #e2e8f0; border-radius: 4px; }
        .chat-box::-webkit-scrollbar-thumb { background: #186cb5; border-radius: 4px; border: 2px solid #e2e8f0; }

        .message { display: flex; margin-bottom: 10px; }
        .message.user { justify-content: flex-end; }
        .message.ai { justify-content: flex-start; }

        .bubble {
          max-width: 90%;
          padding: 10px;
          padding-left:20px;
          border-radius: 18px;
          font-size: 13px;
          line-height: 1.4;
          white-space: pre-wrap;
        }
        .user .bubble { background: #186cb5; color: white; }

        /* UPDATED: Left spacing for AI messages */
        .ai .bubble {
          background: #e2e8f0;
          color: #186cb5;
         
        }

        /* UPDATED: Remove extra space under headings */
        .bubble h1,
        .bubble h2,
        .bubble h3,
        .bubble h4,
        .bubble h5,
        .bubble h6 {
          margin: 0 0 4px 0 !important;
          padding: 0;
          line-height: 1.1;
          font-weight: bold;
        }

        .bubble p {
          margin: 0.2em 0;
        }

        .bubble ul,
        .bubble ol {
          margin: 0.2em 0 0.2em 1.2em;
        }

        .bubble li {
          margin: 0.1em 0;
        }

        .typing { display: flex; gap: 5px; align-items: center; }
        .dot { width: 6px; height: 6px; background: #666; border-radius: 50%; animation: blink 1.5s infinite; }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes blink { 0%,80%,100%{opacity:0.2;} 40%{opacity:1;} }

        .input-box { display: flex; border-top: 1px solid #ddd; }
        input { flex: 1; padding: 14px; font-size: 15px; border: none; outline: none; }
        button { background: #186cb5; color: white; border: none; padding: 0 16px; cursor: pointer; }
        input::placeholder {
    color: #186cb5; /* Placeholder text color */
    opacity: 1;     /* Ensures the color shows fully */
    font-family:'Noto Naskh Arabic', serif;
  }
      `}</style>
    </>
  );
}
