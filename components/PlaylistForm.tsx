/* eslint-disable , @next/next/no-img-element, react/no-unescaped-entities,  */
/* eslint-disable,  @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React, { useEffect, useState } from "react"
import { publicClient } from "@/config"
import { Terminal } from "lucide-react"
import { toast } from "react-toastify"
import { WalletClient, createWalletClient, custom, parseEther } from "viem"
import { morphHolesky } from "viem/chains"
import { useAccount } from "wagmi"

import { FlexibleProvider } from "@/types/wallet"
import { replayABI } from "@/config/abi"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";

export const PlaylistForm = () => {
  const [tracks, setTracks] = useState([{ title: "", link: "" }])
  const [price, setPrice] = useState("")
  const [royaltyPercentage, setRoyaltyPercentage] = useState("")
  const [playlistTitle, setPlaylistTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(false)
  const [walletClient, setWalletClient] = useState<WalletClient | null>(null)
  const [error, setError] = useState<string>("")
  const [showAlert, setShowAlert] = useState<boolean>(false) // New state for alert visibility

  const { address, isConnecting, isDisconnected } = useAccount()

  useEffect(() => {
    checkMetaMaskInstallation()
  }, [])

  function checkMetaMaskInstallation(): void {
    const provider = typeof window !== "undefined" ? window.ethereum : undefined
    const isInstalled = !!provider?.isMetaMask
    setIsMetaMaskInstalled(isInstalled)

    if (isInstalled && provider) {
      const flexibleProvider = provider as FlexibleProvider

      const client = createWalletClient({
        chain: morphHolesky,
        transport: custom(flexibleProvider),
      })
      setWalletClient(client)
    }
  }

  const addTrack = () => {
    setTracks((prevTracks) => [...prevTracks, { title: "", link: "" }])
  }

  const updateTrack = (index, field, value) => {
    setTracks((prevTracks) => {
      const newTracks = [...prevTracks]
      newTracks[index][field] = value
      return newTracks
    })
  }

  const removeTrack = (index) => {
    setTracks((prevTracks) => prevTracks.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    if (!isMetaMaskInstalled || !walletClient) {
      setError("Please install web3 wallet to create an ad.")
      return
    }

    e.preventDefault()
    setIsSubmitting(true)

    try {
      const [account] = await walletClient.getAddresses()

      const filteredTracks = tracks.filter(
        (track) => track.title.trim() !== "" && track.link.trim() !== ""
      )

      const imageDefault =
        "https://bafkreihebtxhajjpn66bqusp7dty3elpz2u3smrjoicxkesdco6vjtmp7e.ipfs.flk-ipfs.xyz"

      const metadata = {
        name: playlistTitle || "Replay Playlist NFT",
        description: "A playlist of selected tracks curated for Replay users",
        image: imageDefault,
        tracks: filteredTracks,
        platform: "Replay",
        attributes: [
          { trait_type: "Number of Tracks", value: filteredTracks.length },
          { trait_type: "Creator", value: address },
          { trait_type: "platform", value: "Replay" },
        ],
      }

      const priceInWei = parseEther(price || "0")
      const royaltyPercentageNum = Number(royaltyPercentage) || 0
      const amountNum = Number(amount) || 1

      const { request } = await publicClient.simulateContract({
        account,
        address: "0xbD348DE884F32c3D4fff2c16b3E9d2C9b2bD41Ab",
        abi: replayABI,
        functionName: "createPlaylist",
        args: [
          address,
          JSON.stringify(metadata),
          priceInWei,
          royaltyPercentageNum,
          amountNum,
        ],
      })

      await walletClient.writeContract(request)

      toast.success("Playlist NFT successfully created!")
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 5000)
    } catch (error) {
      console.error("Error creating playlist:", error)
      toast.error("Failed to create playlist. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-purple-800 dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Your Sound, Your Rules!
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Here you can add track by track, from your best moods!
      </p>
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
      {showAlert && (
        <Alert variant="success" className="mb-4">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Your playlist has been created successfully!
          </AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tracks.map((track, index) => (
          <div key={index}>
            <LabelInputContainer className="mb-4">
            <input
              className="w-full p-3 mb-2 border rounded-md"
              type="text"
              placeholder="Track Title"
              value={track.title}
              onChange={(e) => updateTrack(index, "title", e.target.value)}
            />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
            <input
              className="w-full p-3 mb-2 border rounded-md"
              type="text"
              placeholder="Track Link"
              value={track.link}
              onChange={(e) => updateTrack(index, "link", e.target.value)}
            />
            </LabelInputContainer>
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeTrack(index)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
              >
                Remove Track
              </button>
            )}
          </div>
        ))}
      </div>
      <Button
        type="button"
        onClick={addTrack}
        className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-md mb-4"
        disabled={isSubmitting}
      >
        Add Track
      </Button>
       
      <Input
        className="w-full p-3 mb-4 border rounded-md"
        type="number"
        placeholder="Price (ETH)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        disabled={isSubmitting}
      />
      <Input
        className="w-full p-3 mb-4 border rounded-md"
        type="number"
        placeholder="Royalty Percentage"
        value={royaltyPercentage}
        onChange={(e) => setRoyaltyPercentage(e.target.value)}
        disabled={isSubmitting}
      />
      <Input
        className="w-full p-3 mb-4 border rounded-md"
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={isSubmitting}
      />
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Playlist"}
          <BottomGradient />
        </button>
    </form>
    </div>
  )
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};


const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
