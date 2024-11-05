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

export const UserStats = () => {
  return (
    <div className="bg-white/50 p-4 rounded-lg space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-purple-700">Level 5</h3>
          <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
            <div className="bg-purple-500 h-2 rounded-full w-3/4"></div>
          </div>
        </div>
        <Award className="text-purple-500" size={32} />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-purple-100 p-4 rounded-lg">
          <p className="text-sm text-purple-600">Total XP</p>
          <p className="font-bold text-purple-700">520 XP</p>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg">
          <p className="text-sm text-purple-600">Playlists Created</p>
          <p className="font-bold text-purple-700">3</p>
        </div>
      </div>
    </div>
  )
}
