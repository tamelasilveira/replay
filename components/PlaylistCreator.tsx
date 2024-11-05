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

export const PlaylistCreator = () => {
  return (
    <div className="space-y-4">
      <div className="bg-white/50 p-4 rounded-lg">
        <input
          type="text"
          placeholder="Playlist Name"
          className="w-full p-2 rounded border-2 border-purple-300 bg-white/50"
        />
        <div className="mt-4 flex gap-2">
          <input
            type="number"
            placeholder="Price (ETH)"
            className="flex-1 p-2 rounded border-2 border-purple-300 bg-white/50"
          />
          <input
            type="number"
            placeholder="Royalty %"
            className="flex-1 p-2 rounded border-2 border-purple-300 bg-white/50"
          />
        </div>
      </div>
      <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600">
        Create Playlist
      </button>
    </div>
  )
}
