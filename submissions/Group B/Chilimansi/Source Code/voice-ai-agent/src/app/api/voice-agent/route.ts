import { NextResponse } from "next/server";

type VoiceAgentAction = "start-session" | "stop-session";

type VoiceAgentPayload = {
  action?: VoiceAgentAction;
  sessionId?: string;
};

export async function POST(request: Request) {
  const payload = (await request.json()) as VoiceAgentPayload;
  const sessionId = crypto.randomUUID();

  return NextResponse.json({
    ok: true,
    sessionId,
    requestedAction: payload.action,
    awsBedrock: {
      provider: "aws-bedrock",
      status: "placeholder",
      modelId: process.env.AWS_BEDROCK_MODEL_ID ?? null,
    },
    elevenLabs: {
      provider: "elevenlabs",
      status: "placeholder",
      voiceId: process.env.ELEVENLABS_VOICE_ID ?? null,
    },
  });
}
