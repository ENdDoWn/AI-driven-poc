"use client";

import { useState, useRef, useEffect } from "react";

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
  history: { role: "user" | "ai"; text: string }[];
}

export default function PromptInput({
  onSubmit,
  isLoading,
  history,
}: PromptInputProps) {
  const [value, setValue] = useState("");
  const historyEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSubmit(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="prompt-panel">
      <div className="prompt-header">
        <div className="prompt-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>AI UI Builder</span>
        </div>
        <span className="prompt-badge">POC</span>
      </div>

      <div className="prompt-history">
        {history.length === 0 && (
          <div className="prompt-empty">
            <div className="prompt-empty-icon">✨</div>
            <h3>เริ่มสร้าง website ของคุณ</h3>
            <p>พิมพ์คำอธิบายเว็บไซต์ที่คุณต้องการ แล้ว AI จะสร้างให้</p>
            <div className="prompt-suggestions">
              <button
                className="suggestion-chip"
                onClick={() => onSubmit("สร้างหน้าเว็บร้านกาแฟ มี hero section สวยๆ แสดงเมนูกาแฟ 3 รายการ และฟอร์มติดต่อ")}
                disabled={isLoading}
              >
                ☕ ร้านกาแฟ
              </button>
              <button
                className="suggestion-chip"
                onClick={() => onSubmit("สร้างเว็บไซต์ร้านอาหารไทย มี navbar, hero section พร้อมรูปอาหาร, เมนูแนะนำ 4 รายการ, และ footer")}
                disabled={isLoading}
              >
                🍜 ร้านอาหาร
              </button>
              <button
                className="suggestion-chip"
                onClick={() => onSubmit("สร้างเว็บไซต์บริษัทรับเหมาก่อสร้าง มี hero section, บริการ 3 อย่าง, ฟอร์มขอใบเสนอราคา")}
                disabled={isLoading}
              >
                🏗️ รับเหมาก่อสร้าง
              </button>
            </div>
          </div>
        )}

        {history.map((msg, i) => (
          <div key={i} className={`prompt-message prompt-message--${msg.role}`}>
            <div className="message-avatar">
              {msg.role === "user" ? "👤" : "🤖"}
            </div>
            <div className="message-content">
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="prompt-message prompt-message--ai">
            <div className="message-avatar">🤖</div>
            <div className="message-content message-loading">
              <span className="loading-dot" />
              <span className="loading-dot" />
              <span className="loading-dot" />
            </div>
          </div>
        )}

        <div ref={historyEndRef} />
      </div>

      <form className="prompt-form" onSubmit={handleSubmit}>
        <textarea
          className="prompt-textarea"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="อธิบายเว็บไซต์ที่ต้องการ... (Enter เพื่อส่ง, Shift+Enter ขึ้นบรรทัดใหม่)"
          rows={3}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="prompt-submit"
          disabled={isLoading || !value.trim()}
          aria-label="Send prompt"
        >
          {isLoading ? (
            <svg width="20" height="20" viewBox="0 0 24 24" className="spinner">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="60" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}
