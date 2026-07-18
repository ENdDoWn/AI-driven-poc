"use client";

import { useState, useCallback } from "react";
import type { ComponentNode } from "@/types/components";
import { generateUI } from "@/lib/api";
import PromptInput from "@/components/PromptInput";
import PreviewPanel from "@/components/PreviewPanel";

interface ChatMessage {
  role: "user" | "ai";
  text: string;
}

export default function Home() {
  const [components, setComponents] = useState<ComponentNode[] | null>(null);
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [grillPrompt, setGrillPrompt] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (prompt: string) => {
      setIsLoading(true);
      setError(null);

      // Add user message to history
      setHistory((prev) => [...prev, { role: "user", text: prompt }]);

      const requirementPrompt = grillPrompt
        ? `Grill with doc requirements\nOriginal request: ${grillPrompt}\nUser answers: ${prompt}`
        : prompt;

      try {
        const response = await generateUI({
          prompt: requirementPrompt,
          current_json: components,
          grill_complete: grillPrompt !== null,
        });

        if (response.status === "needs_clarification") {
          setGrillPrompt(prompt);
          setHistory((prev) => [
            ...prev,
            { role: "ai", text: `${response.message}\n\n${(response.questions || []).map((question, i) => `${i + 1}. ${question}`).join("\n")}\n\nกรุณาตอบรายละเอียดในข้อความถัดไปครับ` },
          ]);
          return;
        }

        setGrillPrompt(null);
        setComponents(response.components);
        setHistory((prev) => [
          ...prev,
          {
            role: "ai",
            text: `✅ สร้างเสร็จแล้ว! (${response.components.length} components)`,
          },
        ]);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ";
        setError(message);
        setHistory((prev) => [
          ...prev,
          { role: "ai", text: `❌ Error: ${message}` },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [components, grillPrompt]
  );

  return (
    <main className="app-layout">
      <PromptInput
        onSubmit={handleSubmit}
        isLoading={isLoading}
        history={history}
      />
      <PreviewPanel components={components} error={error} />
    </main>
  );
}
