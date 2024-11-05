/* eslint-disable , @next/next/no-img-element, react/no-unescaped-entities,  */
/* eslint-disable,  @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client"

import React, { useState } from "react"
import {
  Award,
  Edit,
  Heart,
  LineChart,
  Maximize2,
  Minimize2,
  Music,
  Plus,
  Search,
  Settings,
  Share2,  
  Upload,
  Wallet,
  X,
} from "lucide-react"

// Marketplace Component
export const PlaylistMarket = () => {
  const dummyPlaylists = [
    { id: 1, name: "Summer Vibes", price: "0.1", creator: "0x123..." },
    { id: 2, name: "Chill Beats", price: "0.05", creator: "0x456..." },
  ]

  return (
    <div className="space-y-4">
      {dummyPlaylists.map((playlist) => (
        <div
          key={playlist.id}
          className="bg-white/50 p-4 rounded-lg flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold text-purple-700">{playlist.name}</h3>
            <p className="text-sm text-purple-600">By: {playlist.creator}</p>
          </div>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600">
            Buy {playlist.price} ETH
          </button>
        </div>
      ))}
    </div>
  )
}
