/* eslint-disable , @next/next/no-img-element, react/no-unescaped-entities,  */
/* eslint-disable,  @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from "react"
import { ShoppingCart } from "lucide-react"

import { replayABI } from "@/config/abi"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const PurchasePlaylistPage = () => {
  const handlePurchase = async (tokenId, price) => {
    try {
      await purchasePlaylist(tokenId, price)
      alert("Purchase successful!")
    } catch (error) {
      console.error("Purchase failed:", error)
      alert("Purchase failed. Check console for details.")
    }
  }

  // Example playlist data
  const playlists = [
    { id: 1, name: "Summer Hits", price: "0.05", isActive: true },
    { id: 2, name: "Chill Vibes", price: "0.1", isActive: true },
    { id: 3, name: "Workout Mix", price: "0.08", isActive: false },
  ]

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Purchase Playlists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playlists.map((playlist) => (
          <Card key={playlist.id} className="shadow-lg">
            <CardHeader>
              <CardTitle>{playlist.name}</CardTitle>
              <CardDescription>Price: {playlist.price} ETH</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Additional details about the playlist can go here */}
            </CardContent>
            <CardFooter>
              {playlist.isActive ? (
                <Button
                  onClick={() => handlePurchase(playlist.id, playlist.price)}
                  className="w-full flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={20} />
                  <span>Buy</span>
                </Button>
              ) : (
                <span className="text-gray-500">Not Available</span>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default PurchasePlaylistPage
