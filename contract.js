const Web3          = require('web3');
const web3          = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const contract      = require('./contractInfo.js');
const instance      = web3.eth.contract(contract.abi).at(contract.address);

module.exports = {
    instance
}