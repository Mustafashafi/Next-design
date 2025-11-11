'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, X } from 'lucide-react';

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: 'AI', text: 'Hi! I’m your AI Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const chatBoxRef = useRef(null);

  // Scroll to the typing bubble if loading, else top of last AI message
  const scrollChat = () => {
    const chatBox = chatBoxRef.current;
    if (!chatBox) return;

    if (loading) {
      const typingBubble = chatBox.querySelector('.message.ai .bubble.typing');
      if (typingBubble) chatBox.scrollTop = typingBubble.offsetTop;
    } else {
      const aiMessages = chatBox.querySelectorAll('.message.ai');
      if (aiMessages.length > 0) {
        const lastAI = aiMessages[aiMessages.length - 1];
        chatBox.scrollTop = lastAI.offsetTop;
      } else {
        chatBox.scrollTop = chatBox.scrollHeight; // fallback
      }
    }
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
      const res = await fetch('https://mustafan8n4.app.n8n.cloud/webhook/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      let botReply = '';
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
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
      {!open && (
        <button className="chat-toggle" onClick={() => setOpen(true)}>
          🤖 Chat
        </button>
      )}

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
                  <div className="bubble">{msg.text}</div>
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
          background: #0070f3;
          color: white;
          border: none;
          padding: 16px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 18px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .chat-toggle:hover { transform: scale(1.1); }

        .chat-wrapper {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 320px;
          max-height: 500px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 12px 24px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .chat-container { display: flex; flex-direction: column; height: 100%; }

        .chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          background: linear-gradient(135deg,#0070f3,#00c6ff);
          color: white;
          font-weight: bold;
        }

        .bot-avatar { font-size: 22px; }
        .close-btn { background: transparent; border: none; color: white; cursor: pointer; }

        .chat-box {
          flex: 1;
          padding: 16px;
          background: #f8fafc;
          overflow-y: auto;
          max-height: 300px;
        }
        .chat-box::-webkit-scrollbar { width: 6px; }
        .chat-box::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 8px;
        }

        .message { display: flex; margin-bottom: 10px; }
        .message.user { justify-content: flex-end; }
        .message.ai { justify-content: flex-start; }

        .bubble {
          max-width: 75%;
          padding: 10px 14px;
          border-radius: 18px;
          font-size: 15px;
          line-height: 1.4;
          word-wrap: break-word;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        .user .bubble { background: #0070f3; color: white; border-bottom-right-radius: 4px; }
        .ai .bubble { background: #e2e8f0; color: #333; border-bottom-left-radius: 4px; }

        .typing { display: flex; gap: 5px; align-items: center; height: 24px; }
        .dot { width: 6px; height: 6px; background: #666; border-radius: 50%; animation: blink 1.5s infinite; }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }

        .input-box { display: flex; border-top: 1px solid #ddd; }
        input { flex: 1; padding: 14px; font-size: 15px; border: none; outline: none; }
        input:focus { background: #f1f5ff; }
        button { background: #0070f3; color: white; border: none; padding: 0 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        button:hover { background: #005bb5; }

        @keyframes blink { 0%,80%,100%{opacity:0.2;} 40%{opacity:1;} }
      `}</style>
    </>
  );
}
