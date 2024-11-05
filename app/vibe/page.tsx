/* eslint-disable , @next/next/no-img-element, react/no-unescaped-entities,  */
/* eslint-disable,  @typescript-eslint/ban-ts-comment */
// @ts-nocheck

"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Github,
  LineChart,
  Maximize2,
  Minimize2,
  Music,
  Search,
  Settings,
  Share2,
  Upload,
  Wallet,
  X,
} from "lucide-react"
import { useAccount, useConnect, useDisconnect } from "wagmi"

import { PlaylistForm } from "@/components/PlaylistForm"


const AppPage = () => {
  const { isConnected, address } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()

  const [playlistData, setPlaylistData] = useState({
    metadataURI: "",
    price: "",
    royaltyPercentage: "",
    amount: "",
  })

  return (
    <div className="min-h-screen p-4">      
      <PlaylistForm />
    </div>
  )
}

export default AppPage
