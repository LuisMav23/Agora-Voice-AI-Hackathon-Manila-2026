"use client";

import { useState } from "react";
import { startConvoAISession, stopConvoAISession } from "@/lib/agora/convoAIClient";

type SessionStatus = "idle" | "starting" | "active" | "stopping";

type StartSessionPayload = {
  incidentType?: string;
  eapFile?: string;
};

export function useConvoAI() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [status, setStatus] = useState<SessionStatus>("idle");

  const startSession = async (payload: StartSessionPayload) => {
    setStatus("starting");
    const session = await startConvoAISession(payload);
    setSessionId(session.sessionId);
    setStatus("active");
    return session;
  };

  const stopSession = async () => {
    if (!sessionId) {
      return null;
    }
    setStatus("stopping");
    const result = await stopConvoAISession(sessionId);
    setSessionId(null);
    setStatus("idle");
    return result;
  };

  return {
    sessionId,
    status,
    startSession,
    stopSession,
  };
}
