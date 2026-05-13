'use client'

import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix leaflet icon paths
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png',
})

interface Point {
  lat: number
  lng: number
  weight?: number
}

interface HeatmapClientProps {
  points: Point[]
  center: [number, number]
}

export default function HeatmapClient({ points, center }: HeatmapClientProps) {
  return (
    <MapContainer
      center={center}
      zoom={17} // Zoomed in to see the venue
      style={{ height: '100%', width: '100%' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.map((p, i) => (
        <CircleMarker
          key={i}
          center={[p.lat, p.lng]}
          radius={20}
          pathOptions={{
            color: 'red',
            fillColor: 'red',
            fillOpacity: 0.3,
            stroke: false,
          }}
        />
      ))}
    </MapContainer>
  )
}
