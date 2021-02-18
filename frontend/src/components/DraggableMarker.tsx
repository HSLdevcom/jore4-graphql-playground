import React, { useCallback, useMemo, useRef, useState } from "react";
import { Marker, MarkerProps, Popup } from "react-leaflet";

// based on https://react-leaflet.js.org/docs/example-draggable-marker

interface Props {
  position: MarkerProps["position"];
  onUpdate: (geojson: any) => void;
  onDelete: () => void;
}

export const DraggableMarker = ({ position, onUpdate, onDelete }: Props) => {
  const [draggable, setDraggable] = useState(false);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          // FIXME: marker is 'never' type
          // FIXME: maybe rather pass just new coordinates (rather than whole geojson) object as callback value
          const latlng = (marker as any).getLatLng();
          const geojson = {
            type: "Point",
            coordinates: [latlng.lat, latlng.lng],
          };
          onUpdate(geojson);
        }
      },
    }),
    [onUpdate]
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <button onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </button>
        <button onClick={onDelete}>Delete</button>
      </Popup>
    </Marker>
  );
};
