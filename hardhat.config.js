// require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
// require("@nomicfoundation/hardhat-chai-matchers"); c
// const projectId = 'sfTjDD035Yha6wjbzWH3yaikoGA5s-A8';
const fs = require('fs')
const keyData = fs.readFileSync('./p-key.txt', {
  encoding:'utf8', flag:'r'
});
// const ALCHEMY_API_URL = process.env.ALCHEMY_API_URL;
// const RINKEBY_P_KEY = process.env.RINKEBY_P_KEY; 

module.exports = {
  defaultNetwork: 'hardhat',
  networks:{
    //connecting hardhat
    hardhat:{
      chainId: 1337 //config standard
    },
    //connecting rinkeby testnet from alchemy  
    rinkeby:{
      url:'https://rinkeby.infura.io/v3/7156e0dc3e0f4083b0ba8132ce71e6e6',
      accounts:[keyData]
    }
  },
  solidity:{
    version :  "0.8.4",
    setting: {
      optimizer : {
        enabled : true,
        runs: 200
      }
    }
  },
};
