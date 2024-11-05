/* eslint-disable , @next/next/no-img-element, react/no-unescaped-entities,  */
/* eslint-disable,  @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { publicClient, replayAddress } from "@/config"
import { Address, getAddress } from "viem"

import { replayABI } from "@/config/abi"

// Define interfaces for better type safety
interface UserProfile {
  address: Address
  name: string
  bio: string
  level: number
  xp: number
  profilePicture: string
}

interface Playlist {
  id: string
  name: string
  price: string
  thumbnailUrl: string
  description: string
  isForSale: boolean
  creator: Address
}

// Utility function to convert address to checksum format
const toChecksumAddress = (address: string): Address => {
  return getAddress(address)
}

/**
 * Fetches user profile from the blockchain.
 * @param address - The Ethereum address of the user.
 * @returns Promise<UserProfile | null> - User profile data or null if failed.
 */
export const fetchUserProfile = async (
  address: string
): Promise<UserProfile | null> => {
  try {
    if (!address) {
      console.error("Address is undefined or empty")
      return null
    }
    console.log(`Fetching profile for address: ${address}`)
    const checksumAddress = toChecksumAddress(address)

    const response = await publicClient.readContract({
      address: replayAddress,
      abi: replayABI,
      functionName: "getUserProfile",
      args: [checksumAddress],
    })

    console.log("Profile data received:", response)
    if (response) {
      return {
        address: response.creator,
        name: response.name || "Anonymous",
        bio: response.bio || "No bio provided",
        level: response.level,
        xp: response.xp,
        profilePicture: response.profilePicture || "default-avatar-url.jpg",
      }
    } else {
      console.warn("No profile data returned from contract")
      return null
    }
  } catch (error) {
    console.error("Error fetching profile:", error)
    return null
  }
}

/**
 * Fetches playlists for a user from the blockchain.
 * @param address - The Ethereum address of the user.
 * @returns Promise<Playlist[]> - Array of playlists or empty array if failed.
 */
export const fetchUserPlaylists = async (
  address: string
): Promise<Playlist[]> => {
  try {
    if (!address) {
      console.error("Address is undefined or empty")
      return []
    }
    console.log(`Fetching playlists for address: ${address}`)
    const checksumAddress = toChecksumAddress(address)

    const { result: playlistIds } = await publicClient.readContract({
      address: replayAddress,
      abi: replayABI,
      functionName: "getPlaylistsByCreator",
      args: [checksumAddress],
    })

    console.log(`Found ${playlistIds.length} playlists for the user.`)

    if (!playlistIds || playlistIds.length === 0) {
      console.log("No playlists found for the user.")
      return []
    }

    const playlists = await Promise.all(
      playlistIds.map(async (tokenId: string) => {
        try {
          const playlist = await publicClient.readContract({
            address: replayAddress,
            abi: replayABI,
            functionName: "getPlaylist",
            args: [tokenId],
          })

          // Fetching metadata for each playlist
          const metadata = await fetch(playlist.metadataURI).then((res) =>
            res.json()
          )

          return {
            id: tokenId,
            name: playlist.metadataURI ? metadata.name : "Unknown",
            price: playlist.price,
            thumbnailUrl: metadata.image || "default-image-url.jpg",
            description: playlist.description,
            isForSale: playlist.isActive,
            creator: playlist.creator,
          }
        } catch (innerError) {
          console.error(
            `Failed to fetch details for playlist ${tokenId}:`,
            innerError
          )
          return null // Return null for playlists we couldn't fetch
        }
      })
    )

    // Filter out any null entries from the map function
    const validPlaylists = playlists.filter(
      (playlist): playlist is Playlist => playlist !== null
    )

    console.log(
      `Successfully fetched ${validPlaylists.length} out of ${playlistIds.length} playlists.`
    )
    return validPlaylists
  } catch (error) {
    console.error("Error fetching playlists:", error)
    return []
  }
}
