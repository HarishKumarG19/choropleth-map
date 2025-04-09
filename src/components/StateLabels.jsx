import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';
import './App.css';

export function StateLabels({ geoJson }) {
  const map = useMap();

  useEffect(() => {
    if (!geoJson) return;

    geoJson.features.forEach(feature => {
      const name = feature.properties.NAME; // or .name if lowercase
      const coordinates = L.geoJSON(feature).getBounds().getCenter(); // get center of the state

      const label = L.marker(coordinates, {
        icon: L.divIcon({
          className: 'state-label',
          html: `<div>${name}</div>`,
          iconSize: [100, 20]
        })
      });

      label.addTo(map);
    });
  }, [geoJson, map]);

  return null;
}