/* eslint-disable , @next/next/no-img-element, react/no-unescaped-entities,  */
/* eslint-disable,  @typescript-eslint/ban-ts-comment */
// @ts-nocheck
"use client"

import React, { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation";
import PlaylistCard from "@/components/PlaylistCard";
import usePlaylistContract  from "@/hooks/usePlaylistContract"

const VibePlaylistsPage = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const address = searchParams.get('address') || pathname.split('/')[2];

  const {
    purchasePlaylist,
    getPlaylist,
    getPlaylistsByCreator,
    isLoading,
    error
  } = usePlaylistContract();

  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        console.log('Fetching playlists for address:', address);
        const tokenIds = await getPlaylistsByCreator(address);
        console.log('Fetched playlists:', tokenIds);
        const playlistData = await Promise.all(tokenIds.map(async (tokenId) => {
          const playlist = await getPlaylist(tokenId);
          return {
            id: tokenId.toString(),
            creator: playlist.creator,
            price: playlist.price.toString(),
            royaltyPercentage: playlist.royaltyPercentage.toString(),
            metadataURI: playlist.metadataURI,
            isActive: playlist.isActive,
            plays: playlist.plays.toString(),
            likes: playlist.likes.toString(),
          }
        }));
        setPlaylists(playlistData);
      } catch (error) {
        console.error("Error fetching playlists:", error)
      }
    }

    if (address) {
      fetchPlaylists()
    }
  }, [address, getPlaylist, getPlaylistsByCreator])

  const handlePlaylistPurchase = async (playlist) => {
    try {
      console.log('Purchasing playlist:', playlist.id);
      await purchasePlaylist(playlist.id, playlist.price);
      console.log('Playlist purchased:', playlist.id);
    } catch (error) {
      console.error("Error purchasing playlist:", error)
    }
  }

  console.log('Playlists', playlists)

  return (
    <div className="container mx-auto py-8 ">
      <h1 className="text-4xl font-bold mb-8">Welcome!</h1>
      {isLoading ? (
        <div className="flex justify-center">loading...</div>
      ) : (
          <div className="grid grid-cols-1 md:grid-cols-auto-fill minmax(200px, 1fr) gap-6">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} onPurchase={handlePlaylistPurchase} />
          ))}
        </div>
      )}
    </div>
  )
}

export default VibePlaylistsPage