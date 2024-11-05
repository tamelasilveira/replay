/* eslint-disable , @next/next/no-img-element, react/no-unescaped-entities,  */
/* eslint-disable,  @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { useCallback, useState } from "react"
import { replayAddress } from "@/config"
import { parseEther } from "viem"
import { usePublicClient, useWalletClient } from "wagmi"

import { replayABI } from "@/config/abi"

const usePlaylistContract = () => {
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Função para comprar uma playlist
  const purchasePlaylist = useCallback(
    async (tokenId, price) => {
      if (!walletClient) {
        setError("Wallet client not available")
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        console.log('Purchasing playlist:', tokenId, 'with price:', price);
        const { request } = await publicClient.simulateContract({
          address: replayAddress,
          abi: replayABI,
          functionName: "purchasePlaylist",
          args: [tokenId],
          value: parseEther(price.toString()),
        })

        const hash = await walletClient.writeContract(request)
        await publicClient.waitForTransactionReceipt({ hash })
        console.log('Playlist purchased:', tokenId);
      } catch (err) {
        console.error("Error purchasing playlist:", err);
        setError(err.message || "Error purchasing playlist")
      } finally {
        setIsLoading(false)
      }
    },
    [publicClient, walletClient]
  )

  // Função para obter uma playlist
  const getPlaylist = useCallback(
    async (tokenId) => {
      setIsLoading(true)
      setError(null)

      try {
        console.log('Fetching playlist:', tokenId);
        const playlist = await publicClient.readContract({
          address: replayAddress,
          abi: replayABI,
          functionName: "getPlaylist",
          args: [tokenId],
        })

        console.log('Fetched playlist:', playlist);
        return playlist
      } catch (err) {
        console.error("Error fetching playlist:", err);
        setError(err.message || "Error fetching playlist")
      } finally {
        setIsLoading(false)
      }
    },
    [publicClient]
  )

  // Função para obter playlists de um criador
  const getPlaylistsByCreator = useCallback(
    async (creator) => {
      setIsLoading(true)
      setError(null)

      try {
        console.log('Fetching playlists for creator:', creator);
        const tokenIds = await publicClient.readContract({
          address: replayAddress,
          abi: replayABI,
          functionName: "getPlaylistsByCreator",
          args: [creator],
        })

        console.log('Fetched playlists:', tokenIds);
        return tokenIds
      } catch (err) {
        console.error("Error fetching playlists:", err);
        setError(err.message || "Error fetching playlists")
      } finally {
        setIsLoading(false)
      }
    },
    [publicClient]
  )

  return {
    purchasePlaylist,
    getPlaylist,
    getPlaylistsByCreator,
    isLoading,
    error,
  }
}

export default usePlaylistContract