"use client";

type Responder = {
  id: string;
  name?: string;
  eta?: string;
};

type GeoResponderMapProps = {
  responders?: Responder[];
};

export default function GeoResponderMap({ responders = [] }: GeoResponderMapProps) {
  return (
    <section className="panel">
      <h2>Tier 2 Responder Map</h2>
      <p>Background geolocation query placeholder for nearby CPR-certified responders.</p>
      <div className="mapPlaceholder">
        <p>Map Canvas Placeholder</p>
        <p>Responders Found: {responders.length}</p>
      </div>
    </section>
  );
}
