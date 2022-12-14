require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("dotenv").config();

const OPTIMISM_RPC_URL = process.env.OPTIMISM_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const REPORT_GAS = process.env.REPORT_GAS || false;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    goerliOptimism: {
      url: OPTIMISM_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      chainId: 420,
    },
  },
  // Network with chainId: 420 not supported. You can specify the url manually via --api-url <url>.
  //   etherscan: {
  //     apiKey: {
  //       goerliOptimism: ETHERSCAN_API_KEY,
  //     },
  //   },
  gasReporter: {
    enabled: REPORT_GAS,
    currency: "USD",
    outputFile: "gas-report.txt",
    noColors: true,
    // coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
    player: {
      default: 1,
    },
  },
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  mocha: {
    timeout: 200000, // 200 seconds max for running tests
  },
};
