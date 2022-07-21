import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
// importing nftaddress and nftmarketaddress from config file
import { nftaddress, nftmarketaddress } from '../config'

// importing smart contracts
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import MyMarket from '../artifacts/contracts/MyMarket.sol/MyMarket.json'
// import { url } from 'inspector'

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
    // const provider = new ethers.providers.JsonRpcProvider()
    // const provider = new ethers.providers.Web3Provider(web3.currentProvider)
    // const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    // const marketContract = new ethers.Contract(nftmarketaddress, MyMarket.abi, provider)
    
    // const {ethereum} = window; 
    // const provider = new ethers.providers.Web3Provider(ethereum).getSigner();
    const provider = new ethers.providers.JsonRpcProvider('https://rinkeby.infura.io/v3/7156e0dc3e0f4083b0ba8132ce71e6e6',4)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, MyMarket.abi, provider)
    console.log(marketContract)
    const data =  await marketContract.fetchMarketTokens();
    console.log(data);

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
  // function to buy nfts for market
    async function buyNFT(nft={
      price:0.002 ,
      tokenId:1
    }){
      const Web3Moda = new Web3Modal()
      const connection = await Web3Moda.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(nftmarketaddress, MyMarket.abi, signer)

      const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
      const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
        value: price
      })

      await transaction.wait()
      loadNFTs()
    }

    if(lodingState === 'loaded' && !nfts.length)return (<h1 className='px-20 py-7 text-4x1'>No Nfts in marketplace</h1>)
  
    return (
    <div className='flex justify-center'>
      <div className="px-4" style={{maxWidth: '160px'}}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg: grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft,i)=>(
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image}/>
                <div className='p-4'>
                  <p style={{height: '64px'}} className="text-3xl font-semibold">{nft.name}</p>
                  <div style={{height:"72px", overflow:'hidden'}}>
                    <p className='text-gray-400'>{nft.description}</p>
                  </div>
                </div>
                <div className='p-4 bg-white'>
                  <p className='text-3xl mb-4 font-bold text-white'>{nft.price} ETH</p>
                  <button className='w-full bg-purple-500 text-white font-bold py-3 px-12 rounded' onClick={()=> buyNFT(nft)}> Buy
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
