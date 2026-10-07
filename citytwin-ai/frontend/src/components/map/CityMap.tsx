'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useUIStore, useCityStore } from '@/lib/store';
import LayerControls from './LayerControls';
import MapLegend from './MapLegend';

// Fix for default leaflet icons in next.js
import L from 'leaflet';
L.Icon.Default.imagePath = '/images/leaflet/';

const MAP_CENTER: [number, number] = [28.6139, 77.2090];
const MAP_ZOOM = 11;

// Map updater component to handle programmatic centering
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function CityMap() {
  const { activeLayer, mapCenter } = useUIStore();
  const { junctions, roads, incidents, aqi } = useCityStore();
  
  // MOCK DATA for initial render since backend might not be connected
  const [mockRoads, setMockRoads] = useState<any[]>([]);
  const [mockIncidents, setMockIncidents] = useState<any[]>([]);
  
  useEffect(() => {
    // Generate some mock roads around Delhi
    const r = [];
    for(let i=0; i<20; i++) {
      const lat1 = 28.5 + Math.random() * 0.2;
      const lng1 = 77.1 + Math.random() * 0.2;
      r.push({
        id: i,
        positions: [[lat1, lng1], [lat1 + (Math.random()-0.5)*0.05, lng1 + (Math.random()-0.5)*0.05]],
        congestion: Math.random(),
        speed: 20 + Math.random() * 40
      });
    }
    setMockRoads(r);
    
    setMockIncidents([
      { id: 1, pos: [28.61, 77.22], type: 'accident', severity: 'high' },
      { id: 2, pos: [28.55, 77.18], type: 'fire', severity: 'critical' }
    ]);
  }, []);

  const displayRoads = roads.length > 0 ? roads : mockRoads;
  const displayIncidents = incidents.length > 0 ? incidents : mockIncidents;

  const getRoadColor = (congestion: number) => {
    if (congestion > 0.7) return '#f43f5e'; // Red
    if (congestion > 0.4) return '#f59e0b'; // Yellow
    return '#10b981'; // Green
  };

  return (
    <div className="absolute inset-0 h-full w-full">
      <MapContainer 
        center={MAP_CENTER} 
        zoom={MAP_ZOOM} 
        style={{ height: '100%', width: '100%', background: '#0a0e1a' }}
        zoomControl={false}
      >
        <MapUpdater center={mapCenter} />
        
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {activeLayer === 'traffic' && displayRoads.map(road => (
          <Polyline 
            key={`road-${road.id}`}
            positions={road.positions}
            pathOptions={{ 
              color: getRoadColor(road.congestion), 
              weight: 4 + (road.congestion * 4),
              opacity: 0.8
            }}
          >
            <Popup className="glass-popup">
              <div className="p-2">
                <h4 className="font-bold mb-1">Road Segment #{road.id}</h4>
                <p>Congestion: {(road.congestion * 100).toFixed(0)}%</p>
                <p>Avg Speed: {road.speed.toFixed(1)} km/h</p>
              </div>
            </Popup>
          </Polyline>
        ))}

        {(activeLayer === 'incidents' || activeLayer === 'traffic') && displayIncidents.map(inc => (
          <CircleMarker
            key={`inc-${inc.id}`}
            center={inc.pos}
            radius={8}
            pathOptions={{
              color: inc.severity === 'critical' ? '#e11d48' : '#f59e0b',
              fillColor: inc.severity === 'critical' ? '#f43f5e' : '#fbbf24',
              fillOpacity: 0.7,
              weight: 2
            }}
            className="pulse-glow"
          >
            <Popup>
              <div className="p-2">
                <strong className="text-red-400 uppercase">{inc.type}</strong>
                <p>Severity: {inc.severity}</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}

      </MapContainer>
      
      <div className="absolute top-4 right-4 z-[400]">
        <LayerControls />
      </div>
      <div className="absolute bottom-4 left-4 z-[400]">
        <MapLegend />
      </div>
    </div>
  );
}
