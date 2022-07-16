require("@nomicfoundation/hardhat-toolbox");
const projectId = '7156e0dc3e0f4083b0ba8132ce71e6e6';
const fs = require('fs')
const keyData = fs.readFileSync('./p-key.txt', {
  encoding:'utf8', flag:'r'
});

module.exports = {
  defaultNetwork: 'hardhat',
  networks:{
    //connecting hardhat
    hardhat:{
      chainId: 1337 //config standard
    },
    //connecting rinkeby testnet from infura  
    rinkeby:{
      url:`https://rinkeby.infura.io/v3/${projectId}`,
      accounts:[keyData]
    }
  },
  solidity:{
    version :  "0.8.9",
    setting: {
      optimizer : {
        enabled : true,
        runs: 200
      }
    }
  },
};
