import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

type TierTwoResponder = {
  id: string;
  tier: 2;
  cprCertified: boolean;
  [key: string]: unknown;
};

type PublishEmergencyLocationPayload = {
  latitude: number;
  longitude: number;
  incidentType: string;
};

type EmergencyTriggerResponse = {
  ok: boolean;
  incidentId: string;
};

export async function getTierTwoResponders() {
  const respondersQuery = query(
    collection(db, "responders"),
    where("tier", "==", 2),
    where("cprCertified", "==", true),
    limit(25),
  );

  const snapshot = await getDocs(respondersQuery);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as TierTwoResponder[];
}

export async function publishEmergencyLocation({
  latitude,
  longitude,
  incidentType,
}: PublishEmergencyLocationPayload) {
  const response = await fetch("/api/emergency-trigger", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      latitude,
      longitude,
      incidentType,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to broadcast emergency trigger.");
  }

  return (await response.json()) as EmergencyTriggerResponse;
}
