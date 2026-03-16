type StartSessionPayload = {
  incidentType?: string;
  eapFile?: string;
};

type VoiceAgentResponse = {
  ok: boolean;
  sessionId: string;
  requestedAction?: string;
};

export async function startConvoAISession(payload: StartSessionPayload) {
  const response = await fetch("/api/voice-agent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: "start-session",
      ...payload,
    }),
  });

  if (!response.ok) {
    throw new Error("Unable to start conversational AI session.");
  }

  return (await response.json()) as VoiceAgentResponse;
}

export async function stopConvoAISession(sessionId: string) {
  const response = await fetch("/api/voice-agent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: "stop-session",
      sessionId,
    }),
  });

  if (!response.ok) {
    throw new Error("Unable to stop conversational AI session.");
  }

  return (await response.json()) as VoiceAgentResponse;
}
