import { cookieStorage, createStorage, http } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { morph, morphHolesky } from '@reown/appkit/networks'
import { createWalletClient, createPublicClient, custom, getAddress } from 'viem'




// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) {
    throw new Error('Project ID is not defined')
}

export const networks = [morph, morphHolesky]

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({
        storage: cookieStorage
    }),
    ssr: true,
    projectId,
    networks
})

export const config = wagmiAdapter.wagmiConfig


export const publicClient = createPublicClient({
    chain: morphHolesky,
    transport: http(process.env.REACT_APP_RPC_URL)
})

export const replayAddress = '0xbD348DE884F32c3D4fff2c16b3E9d2C9b2bD41Ab';