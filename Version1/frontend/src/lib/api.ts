/**
 * API client for communicating with the FastAPI backend.
 */

import type { GenerateRequest, GenerateResponse } from "@/types/components";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/**
 * Generate or edit UI components based on a natural language prompt.
 *
 * @param request - The generation request containing prompt and optional current JSON.
 * @returns The generated component tree.
 * @throws Error if the API call fails.
 */
export async function generateUI(
  request: GenerateRequest
): Promise<GenerateResponse> {
  const response = await fetch(`${API_BASE_URL}/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message =
      (errorData as { detail?: string }).detail ||
      `API Error: ${response.status} ${response.statusText}`;
    throw new Error(message);
  }

  return response.json();
}
