"use client"

import React, { type ReactNode } from "react"
import { projectId, wagmiAdapter } from "@/config"
import { morph, morphHolesky } from "@reown/appkit/networks"
import { createAppKit } from "@reown/appkit/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider, cookieToInitialState, type Config } from "wagmi"

// Set up queryClient
const queryClient = new QueryClient()

if (!projectId) {
  throw new Error("Project ID is not defined")
}

// Set up metadata
const metadata = {
  name: "replay",
  description:
    "Create, share, and own your music playlists on the blockchain ✨",
  url: "https://replay.torridparadise.com",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
}

// Create the modal
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [morphHolesky, morph],
  defaultNetwork: morphHolesky,
  metadata: metadata,
  features: {
    analytics: true,
  },
})

function ContextProvider({
  children,
  cookies,
}: {
  children: ReactNode
  cookies: string | null
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  )

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default ContextProvider
