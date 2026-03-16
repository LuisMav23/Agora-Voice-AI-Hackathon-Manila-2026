"use client";

import { useEffect, useState } from "react";

type WearableTriggerSimulatorProps = {
  onSOSBroadcast?: () => void | Promise<void>;
};

type TriggerStatus = "idle" | "countdown" | "broadcasted" | "cancelled";

export default function WearableTriggerSimulator({
  onSOSBroadcast,
}: WearableTriggerSimulatorProps) {
  const [status, setStatus] = useState<TriggerStatus>("idle");
  const [secondsLeft, setSecondsLeft] = useState(10);

  useEffect(() => {
    if (status !== "countdown") {
      return undefined;
    }

    const timer = setInterval(() => {
      setSecondsLeft((currentValue) => {
        if (currentValue <= 1) {
          clearInterval(timer);
          setStatus("broadcasted");
          if (onSOSBroadcast) {
            void onSOSBroadcast();
          }
          return 0;
        }
        return currentValue - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onSOSBroadcast, status]);

  const startSimulation = () => {
    setStatus("countdown");
    setSecondsLeft(10);
  };

  const cancelAlert = () => {
    setStatus("cancelled");
    setSecondsLeft(10);
  };

  return (
    <section className="panel">
      <h2>Wearable Trigger Simulator</h2>
      <p>Simulates smartwatch anomaly events such as a hard fall or heart-rate spike.</p>
      {status === "countdown" && <p>Are you okay? Broadcasting SOS in {secondsLeft}s.</p>}
      {status === "broadcasted" && <p>SOS sent to Tiered Responder Network.</p>}
      {status === "cancelled" && <p>Alert cancelled by user.</p>}
      {status === "idle" && <p>No active anomaly trigger.</p>}
      <div className="buttonRow">
        <button type="button" onClick={startSimulation}>
          Trigger Anomaly
        </button>
        <button type="button" onClick={cancelAlert} disabled={status !== "countdown"}>
          I&apos;m Okay
        </button>
      </div>
    </section>
  );
}
