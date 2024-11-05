"use client"

import React, { useState } from "react"
import {
  Heart,
  Maximize2,
  Minimize2,
  Music,
  Plus,
  Search,
  Settings,
  Share2,
  X,
} from "lucide-react"

export const MusicPlayer = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Visualizer */}
      <div className="bg-purple-900 p-4 rounded-lg">
        <div className="flex justify-between h-12">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="w-2 bg-purple-300"
              style={{
                height: `${Math.random() * 100}%`,
                transition: "height 0.2s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center bg-purple-200 p-2 rounded-lg">
        <div className="flex gap-2">
          <button className="p-2 hover:bg-purple-300 rounded-full">
            <Music size={16} />
          </button>
          <button className="p-2 hover:bg-purple-300 rounded-full">
            <Heart size={16} />
          </button>
          <button className="p-2 hover:bg-purple-300 rounded-full">
            <Share2 size={16} />
          </button>
        </div>
        <div className="text-xs font-medium text-purple-700">
          Level 5 · 520 XP
        </div>
      </div>
    </div>
  )
}
