// ChoroplethMap.jsx
import { MapContainer, TileLayer, GeoJSON} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import usStates from '../data/world-geo.json';
import {Legend} from "./Legend";
import {StateLabels} from "./StateLabels"; // your geojson file

const stateCounts = {
  Maine: 12,
  Texas: 30,
  California: 25,
  "New York": 18,
  Illinois: 29,
  Florida: 35,
  Georgia: 22,
  Pennsylvania: 15,
  Ohio: 11,
  Michigan: 27,
  "North Carolina": 28,
  "New Jersey": 14,
  Virginia: 19,
  Washington: 16,
  Arizona: 46,
  Massachusetts: 13,
  Tennessee: 8,
  Indiana: 10,
  Missouri: 55,
  Wisconsin: 34,
  Minnesota: 33,
  "South Carolina": 20,
  Alabama: 19,
  Colorado: 17,
  Maryland: 21,
  Kentucky: 38,
  Oregon: 96,
  Oklahoma: 11,
  Connecticut: 10,
  Iowa: 27,
  Nebraska: 30,
  Montana: 45
};

const getColor = (count) => {
  return count > 40 ? '#08306b' :
         count > 30 ? '#2171b5' :
         count > 20 ? '#4292c6' :
         count > 10 ? '#6baed6' :
                      '#c6dbef';
};

export default function ChoroplethMap() {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log(usStates.features[0].properties);
    // Add partner count to each state feature
    const enriched = {
      ...usStates,
      features: usStates.features.map((feature) => {
        const stateName = feature.properties.NAME;
        const count = stateCounts[stateName] || 0;
        return {
          ...feature,
          properties: {
            ...feature.properties,
            count
          }
        };
      })
    };
    setData(enriched);
  }, []);


  const style = (feature) => ({
    fillColor: getColor(feature.properties.count),
    weight: 1,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.7
  });

  const onEachFeature = (feature, layer) => {
    const name = feature.properties.NAME;
    const count = feature.properties.count;
    layer.bindTooltip(`${name}: ${count} partners`, {
      permanent: false,
      direction: 'center',
      className: 'custom-tooltip'
    });
  };

  return (
    <MapContainer center={[37.8, -96]} zoom={5} style={{ height: '100vh' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {data && (
        <GeoJSON data={data} style={style} onEachFeature={onEachFeature} />
      )}
      <Legend />
      <StateLabels geoJson={data} />
    </MapContainer>
  );
}