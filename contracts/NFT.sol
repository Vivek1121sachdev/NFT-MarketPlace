//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//we will bring in the openzeppelin ERC721 NFT functionalty
import  '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import  '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import  '@openzeppelin/contracts/utils/Counters.sol';

//we are inheriting ERC721URIStorage from openzeppelin 
//we are not inherinting ERC721 directly here because ERC721URIStorage is inheriting(see in nodemodules/openzeppelin/extention/ERC721URIStorage) 
contract NFT is ERC721URIStorage{

    //counters allow us to keep track of tokenIds
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    //address of maketplace for NFTs to interact
    address ContractAddress;
    //OBJ: give the NFT market the ability to transact with tokens or change owenership
    // setApprovalForAll allows us to do that with contract address

    //contructor set up our address
    constructor(address marketplaceAddress) ERC721('VsPlace','VS'){
        ContractAddress = marketplaceAddress;
    }

    function mintToken(string memory tokenURI) public returns(uint){
        _tokenIds.increment(); //from Counters.sol
        uint256 newItemId = _tokenIds.current(); //from Counters.sol
        _mint(msg.sender,newItemId); // from ERC721.sol
        //set the token URI
        _setTokenURI(newItemId,tokenURI); //from ERC721URIStorage.sol
        setApprovalForAll(ContractAddress, true); //from ERC721.sol
        //mint the token and set it for sale - return the id to do so
        return newItemId;
    }
}
