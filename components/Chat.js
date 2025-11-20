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
      const res = await fetch('https://mustafan8n12.app.n8n.cloud/webhook/chat', {
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

      // normalize list markers that were accidentally split across lines
      const normalizeReply = (text) => {
        if (!text) return text;
        // unify newlines
        text = text.replace(/\r\n/g, '\n');

        const lines = text.split('\n');
        const out = [];

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          // If line is only a list marker like "1.", "1)", "-", "*", "+" (possibly with surrounding spaces)
          if (/^\s*(?:\d+[\.|\)]|[-*+])\s*$/.test(line)) {
            // find next non-empty line
            let j = i + 1;
            while (j < lines.length && lines[j].trim() === '') j++;
            if (j < lines.length) {
              // merge marker with following line
              lines[j] = line.trim() + ' ' + lines[j].trim();
              // skip pushing the marker-only line
              continue;
            } else {
              out.push(line);
            }
          } else {
            // handle cases where marker and text are split by a single newline without being marker-only
            // e.g. "1.\nMicrosoft" (no blank line) — merge when previous line ends with marker and next line starts with capitalized word
            if (out.length > 0 && /(?:\d+[\.|\)]|[-*+])\s*$/.test(out[out.length - 1]) && line.trim() !== '') {
              out[out.length - 1] = out[out.length - 1].trim() + ' ' + line.trim();
            } else {
              out.push(line);
            }
          }
        }

        return out.join('\n');
      };

      const formatted = normalizeReply(botReply);
      setMessages(prev => [...prev, { sender: 'AI', text: formatted }]);
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
        /* Theme variables scoped to the component */
        .chat-wrapper {
          --primary: #186cb5;
          --ai-bg: #eef6fb;
          --user-bg: var(--primary);
          --muted: #6b7280;
          
        }

        .chat-toggle {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #186cb5;
          color: white;
          border: none;
          width: 60px;
          height: 60px;
          padding: 0;
          border-radius: 50%;
          cursor: pointer;
          font-size: 20px;
          z-index: 500;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 12px 30px rgba(11,115,255,0.22);
          border: 3px solid rgba(255,255,255,0.9);
          transition: transform 160ms ease, box-shadow 160ms ease;
        }
        .chat-toggle.hidden { display: none !important; }
        .chat-toggle:hover { transform: translateY(-3px) scale(1.03); box-shadow: 0 12px 30px rgba(24,108,181,0.22); }

        .chat-wrapper {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: calc(100% - 48px);
          max-width: 420px;
          height: min(72vh, 520px);
          background: white;
          border-radius: 14px;
          box-shadow: 0 18px 40px rgba(2,6,23,0.12);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 999;
        }

        @media (min-width: 640px) {
          .chat-wrapper { width: 360px; }
        }

        .chat-container { display: flex; flex-direction: column; height: 100%; }

        .chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          background: var(--primary);
          color: white;
          font-weight: 600;
        }

        .bot-avatar {
          font-size: 18px;
          width: 40px;
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
        }
        .close-btn { background: transparent; border: none; color: white; cursor: pointer; padding: 6px; border-radius: 6px; }
        .close-btn:hover { background: rgba(255,255,255,0.06); }

        .chat-box {
          flex: 1;
          padding: 12px;
          background: #fbfeff;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 8px;
          scrollbar-width: thin;
          scrollbar-color: var(--primary) #e6eef8;
        }
        .chat-box::-webkit-scrollbar { width: 10px; }
        .chat-box::-webkit-scrollbar-track { background: #e9f0f7; border-radius: 6px; }
        .chat-box::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #1e73b8, #155f9f); border-radius: 6px; border: 2px solid #e9f0f7; }

        .message { display: flex; margin: 0; }
        .message.user { justify-content: flex-end; }
        .message.ai { justify-content: flex-start; }

        .bubble {
          max-width: 90%;
          padding: 10px 14px;
          border-radius: 16px;
          font-size: 14px;
          line-height: 1.4;
          white-space: pre-wrap;
          word-break: break-word;
          transition: transform 120ms ease, box-shadow 120ms ease;
        }

        .user .bubble {
          background: var(--user-bg);
          color: white;
          border-radius: 18px 18px 6px 18px;
          box-shadow: 0 8px 22px rgba(24,108,181,0.18);
          align-self: flex-end;
        }

        .ai .bubble {
          background: var(--ai-bg);
          color: var(--primary);
          border-radius: 18px 18px 18px 6px;
          align-self: flex-start;
          padding-left:22px;
        }

        .bubble h1,
        .bubble h2,
        .bubble h3,
        .bubble h4,
        .bubble h5,
        .bubble h6 {
          margin: 0 0 0.08em 0 !important;
          padding: 0;
          line-height: 1.12;
          font-weight: 700;
        }

        /* Reduce paragraph spacing inside bubbles */
        .bubble p { margin: 0 0 0.06em 0; }

        /* Tighter list spacing: keep marker and text on the same line */
        .bubble ul,
        .bubble ol {
          margin: 0 0 0.25em 0;
          padding-left: 1.4em; /* space for marker */
          list-style-position: outside;
        }

        /* Compact list items while preserving marker alignment */
        .bubble li {
          margin: 0.06em 0;
          line-height: 1.18;
          display: list-item;
        }

        /* If Markdown renders paragraphs inside list items, keep them inline so the marker sits on the same line */
        .bubble li p { display: inline; margin: 0; }

        /* Make the marker more visible and aligned */
        .bubble li::marker { color: var(--primary); font-weight: 700; font-size: 1em; }

        .typing { display: flex; gap: 6px; align-items: center; }
        .dot { width: 7px; height: 7px; background: #9aa6b2; border-radius: 50%; animation: blink 1.4s infinite; }
        .dot:nth-child(2) { animation-delay: 0.18s; }
        .dot:nth-child(3) { animation-delay: 0.36s; }
        @keyframes blink { 0%,80%,100%{opacity:0.2;} 40%{opacity:1;} }

        .input-box { display: flex; gap: 8px; padding: 10px; border-top: 1px solid rgba(15,23,42,0.04); background: #fff; }
        input { flex: 1; padding: 10px 14px; font-size: 14px; border: 1px solid rgba(24, 108, 181, 0.42); border-radius: 999px; outline: none; background: #f6fbff; }
        input:focus { box-shadow: 0 6px 18px rgba(24,108,181,0.08); border-color: #186cb5; color:#186cb5; }
        button { background: var(--primary); color: white; border: none; width: 44px; height: 44px; border-radius: 999px; display: inline-flex; align-items: center; justify-content: center; cursor: pointer; }
        button:disabled { opacity: 0.6; cursor: default; }
        input::placeholder { color: #186cb5; opacity: 1; font-family: 'Noto Naskh Arabic', serif; }

        /* small adjustments for very small screens */
        @media (max-width: 420px) {
          .chat-wrapper { right: 12px; left: 12px; width: auto; bottom: 12px; height: calc(80vh); }
          .chat-toggle { right: 12px; bottom: 12px; }
        }
      `}</style>
    </>
  );
}
