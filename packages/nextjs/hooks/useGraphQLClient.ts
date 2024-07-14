import { useChainId } from 'wagmi'
import { GraphQLClient } from 'graphql-request'
import { optimismSepolia, arbitrumSepolia, baseSepolia } from 'viem/chains'

const chainToGraphName = {
  [optimismSepolia.id]: 'worldcare-new',
  [arbitrumSepolia.id]: 'worldcare-arbitrum',
  [baseSepolia.id]: 'worldcare-base'
} as const

export const useGraphQLClient = () => {
  const chainId = useChainId()
  const name = chainToGraphName[chainId] ?? chainToGraphName[optimismSepolia.id]

  return new GraphQLClient(`https://api.studio.thegraph.com/query/83120/${name}/version/latest`)
}
