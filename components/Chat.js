'use client';

import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  // ✅ Smart scroll handling
  const scrollToBottom = (smooth = true) => {
    const chatBox = chatBoxRef.current;
    if (!chatBox) return;

    const isNearBottom =
      chatBox.scrollHeight - chatBox.scrollTop - chatBox.clientHeight < 100;

    if (isNearBottom) {
      // Scroll fully to bottom when near bottom
      chatBox.scrollTo({
        top: chatBox.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto',
      });
    } else {
      // Scroll slightly to reveal new message
      chatBox.scrollBy({
        top: 80,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'You', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('https://mustafan8n3.app.n8n.cloud/webhook/chat', {
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

      setMessages((prev) => [...prev, { sender: 'AI', text: botReply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: 'AI', text: 'Error connecting to AI agent.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <div className="chat-header">
          <span className="bot-avatar">🤖</span>
          <h3>AI Assistant</h3>
        </div>

        <div className="chat-box" ref={chatBoxRef}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.sender === 'AI' ? 'ai' : 'user'}`}>
              <div className="bubble">
                <strong>{msg.sender === 'AI' ? 'AI' : 'You'}:</strong> {msg.text}
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

      <style jsx>{`
        .chat-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #eef2f3, #dfe9f3);
          padding: 20px;
        }

        .chat-container {
          width: 420px;
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 0.4s ease;
        }

        .chat-header {
          background: #0070f3;
          color: white;
          text-align: center;
          padding: 14px;
          font-size: 18px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .bot-avatar {
          font-size: 20px;
        }

        /* ✅ Dynamic height & scrollbar after max height */
        .chat-box {
          padding: 16px;
          background: #f8fafc;
          overflow-y: auto;
          scroll-behavior: smooth;
          transition: all 0.4s ease;

          min-height: 120px;
          max-height: 320px;
          height: auto;
        }

        .chat-box::-webkit-scrollbar {
          width: 6px;
        }

        .chat-box::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 8px;
        }

        .chat-box::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        .message {
          display: flex;
          margin-bottom: 10px;
          animation: fadeIn 0.3s ease-in-out;
        }

        .message.user {
          justify-content: flex-end;
        }

        .message.ai {
          justify-content: flex-start;
        }

        .bubble {
          max-width: 75%;
          padding: 10px 14px;
          border-radius: 18px;
          font-size: 15px;
          line-height: 1.4;
          word-wrap: break-word;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }

        .user .bubble {
          background: #0070f3;
          color: white;
          border-bottom-right-radius: 4px;
        }

        .ai .bubble {
          background: #e2e8f0;
          color: #333;
          border-bottom-left-radius: 4px;
        }

        .typing {
          display: flex;
          gap: 5px;
          align-items: center;
          height: 24px;
        }

        .dot {
          width: 6px;
          height: 6px;
          background: #666;
          border-radius: 50%;
          animation: blink 1.5s infinite;
        }

        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        .input-box {
          display: flex;
          border-top: 1px solid #ddd;
          background: white;
        }

        input {
          flex: 1;
          border: none;
          padding: 14px;
          font-size: 15px;
          outline: none;
          border-radius: 0;
        }

        input:focus {
          background: #f1f5ff;
        }

        button {
          background: #0070f3;
          color: white;
          border: none;
          padding: 0 16px;
          cursor: pointer;
          transition: background 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        button:hover {
          background: #005bb5;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blink {
          0%, 80%, 100% {
            opacity: 0.2;
          }
          40% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
