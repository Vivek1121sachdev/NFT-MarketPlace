import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Web3Modal from 'Web3Modal'
// importing nftaddress and nftmarketaddress from config file
import { nftaddress, nftmarketaddress } from '../config'

// importing smart contracts
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import MyMarket from '../artifacts/contracts/MyMarket.sol/MyMarket.json'

export default function Home() {
  const [nfts, setNfts] = useState([])
  const [lodingState , setLoadingState] = useState('not-loaded')

  // to render our NFTs
  useEffect(()=> {
    loadNFTs()
  },[])

  // async because we are loading nfts from blockchain data
  async function loadNFTs(){

    // what we want to load
    // ***proivder, tokenContract, marketContract, data for our  marketItems***

    //The JSON-RPC API is a popular method for interacting with Ethereum and is available in all major Ethereum node implementations (e.g. Geth and Parity) as well as many third-party web services (e.g. INFURA)
    const provider = new ethers.providers.JsonRpcProvider()
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, MyMarket.abi, provider)
    const data = await marketContract.fetchMarketTokens()
    
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      //we want get the token metadata - json
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(),'ether')
      let item = {
        price,
        tokenId : i.tokenId.toNumber(),
        seller: i.seller,
        owner : i.owner,
        image : meta.data.image,
        name : meta.data.name,
        description : meta.data.description
      }
      return item
    }))

    setNfts(items)
    setLoadingState('loaded')
   } 
  return (
    <div>
    </div>
  )
}
