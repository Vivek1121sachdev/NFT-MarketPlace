import { ethers } from 'ethers'
import { useState } from 'react'
import Web3Modal from 'web3modal'
import { create as ipfsHttpClient } from 'ipfs-http-client'

// importing nftaddress and nftmarketaddress from config file
import { nftaddress, nftmarketaddress } from '../config'

// importing smart contracts
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import MyMarket from '../artifacts/contracts/MyMarket.sol/MyMarket.json'
import { useRouter } from 'next/router'

//in this component we set the ipfs  up to host our nft data of file storage

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0/')
export default function MintItem(){
    const [fileUrl, setFileUrl] = useState(null)
    const [formInput, setFormInput] = useState({price:"", name:"", description:""})
    const router = useRouter()

    //set up a function to fireoff when we update file in our form -we can add our NFT images- IPFS

    async function onChange(e){
        const file = e.target.files[0]
        try{

        
        const added = await client.add (
            file,{
                progress: (prog) => console.log(`received: ${prog}`)
            }
        )
        const url = `https://ipfs.infura.io:5001/api/v0/${added.path}`
        setFileUrl(url)
        } catch(error) {
            console.log('Error uploading file', error)
        }
    }
}111