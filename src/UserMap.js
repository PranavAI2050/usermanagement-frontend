import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import { Oval } from 'react-loader-spinner';
// import 'leaflet/dist/leaflet.css';  

// Set default marker icon globally
const DefaultIcon = L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const defaultPosition = [20, 0]; // Equator & Prime Meridian

// Component to update map view on center or zoom changes
const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const UserMap = ({ latitude, longitude }) => {
  const [mapCenter, setMapCenter] = useState(defaultPosition);
  const [zoom, setZoom] = useState(2);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (
      latitude !== null &&
      latitude !== undefined &&
      longitude !== null &&
      longitude !== undefined
    ) {
      setMapCenter([latitude, longitude]);
      setZoom(13);
      setLoading(false);
    } else {
      setMapCenter(defaultPosition);
      setZoom(2);
      setLoading(true);
    }
  }, [latitude, longitude]);

  if (!defaultPosition && loading)
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
        <Oval height={40} width={40} color="blue" />
      </div>
    );

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoom}
      style={{
        height: '400px',
        width: '100%',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapUpdater center={mapCenter} zoom={zoom} />
      <Marker position={mapCenter}>
        <Popup>User location.</Popup>
      </Marker>
    </MapContainer>
  );
};

export default UserMap;
