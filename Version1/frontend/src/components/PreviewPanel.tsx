"use client";

import type { ComponentNode } from "@/types/components";
import ComponentRenderer from "./ComponentRenderer";

interface PreviewPanelProps {
  components: ComponentNode[] | null;
  error: string | null;
}

export default function PreviewPanel({ components, error }: PreviewPanelProps) {
  return (
    <div className="preview-panel">
      <div className="preview-toolbar">
        <div className="preview-dots">
          <span className="dot dot--red" />
          <span className="dot dot--yellow" />
          <span className="dot dot--green" />
        </div>
        <div className="preview-url">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.5 }}>
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2"/>
            <path d="M2 12h20" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span>my-sme-website.local</span>
        </div>
      </div>

      <div className="preview-content">
        {error && (
          <div className="preview-error">
            <div className="error-icon">❌</div>
            <h3>เกิดข้อผิดพลาด</h3>
            <p>{error}</p>
          </div>
        )}

        {!components && !error && (
          <div className="preview-placeholder">
            <div className="placeholder-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="3" y1="9" x2="21" y2="9"/>
                <line x1="9" y1="21" x2="9" y2="9"/>
              </svg>
            </div>
            <h3>Live Preview</h3>
            <p>เว็บไซต์ที่ AI สร้างจะแสดงที่นี่</p>
          </div>
        )}

        {components && components.length > 0 && (
          <div className="preview-render">
            <ComponentRenderer components={components} />
          </div>
        )}
      </div>
    </div>
  );
}
