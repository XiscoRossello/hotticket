'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, ArrowLeft, Map } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// Dynamically import map to avoid SSR issues
const HeatmapClient = dynamic(() => import('@/components/HeatmapClient'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-full h-full bg-surface">
      <Loader2 className="animate-spin text-primary" size={40} />
    </div>
  ),
})

export default function HeatmapPage() {
  const [points, setPoints] = useState<{lat: number, lng: number}[]>([])
  const [center, setCenter] = useState<[number, number] | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = useMemo(() => createClient(), [])

  const loadHeatmapData = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { data: commerce } = await supabase
      .from('commerces')
      .select('id, latitude, longitude')
      .eq('owner_id', user.id)
      .single()

    if (!commerce) return

    // Default center to commerce location if available
    if (commerce.latitude && commerce.longitude) {
      setCenter([commerce.latitude, commerce.longitude])
    } else {
      // Default fallback (Madrid roughly)
      setCenter([40.4168, -3.7038])
    }

    // Get events for this commerce
    const { data: events } = await supabase
      .from('events')
      .select('id')
      .eq('commerce_id', commerce.id)

    const eventIds = events?.map(e => e.id) || []

    if (eventIds.length > 0) {
      const { data: items } = await supabase
        .from('wallet_items')
        .select('scanned_latitude, scanned_longitude')
        .in('event_id', eventIds)
        .not('scanned_latitude', 'is', null)

      if (items) {
        const heatmapPoints = items.map(item => ({
          lat: item.scanned_latitude!,
          lng: item.scanned_longitude!,
        }))
        setPoints(heatmapPoints)
        
        // If we have points but didn't have commerce center, use first point
        if (heatmapPoints.length > 0 && (!commerce.latitude || !commerce.longitude)) {
          setCenter([heatmapPoints[0].lat, heatmapPoints[0].lng])
        }
      }
    }

    setLoading(false)
  }, [supabase])

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      loadHeatmapData()
    })
    return () => cancelAnimationFrame(id)
  }, [loadHeatmapData])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/backoffice"
          className="p-2 rounded-xl border border-border hover:bg-surface transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Map className="text-primary" />
            Mapa de calor del recinto
          </h1>
          <p className="text-gray-500">Visualiza dónde se han escaneado las entradas en tiempo real</p>
        </div>
      </div>

      <div className="bg-surface rounded-2xl border border-border overflow-hidden h-[600px] relative">
        <div className="absolute top-4 right-4 z-10 bg-background/90 backdrop-blur-sm p-3 rounded-xl border border-border">
          <p className="text-sm font-medium">Total escaneos: <span className="text-primary">{points.length}</span></p>
        </div>
        {center && (
          <HeatmapClient points={points} center={center} />
        )}
      </div>
    </div>
  )
}
