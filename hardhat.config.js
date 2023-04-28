require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  etherscan: {
    apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjZTMyYjRhMS0yNjg4LTQxODktOTk0NS0yZjYzYTZiNjNkZTUiLCJpYXQiOjE2ODI3MTI5MjMuNjksImlzcyI6Ik15dGhYIEF1dGggU2VydmljZSIsImV4cCI6MTk5ODI4ODkyMy42ODcsInVzZXJJZCI6IjY0NGMyOGI5ZjRiZjU4MTNhOTU5MjE3MCJ9.GBr1FoCoZFNkcaW7_AxH62Al-uiCl7O8eNe5baK2FpQ'
  },
  networks: {
    mynetwork: {
      url: "http://localhost:8545",
      chainId: 31337
    }
  }

};
