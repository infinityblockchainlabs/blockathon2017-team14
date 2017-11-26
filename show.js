const router        = require('express').Router();
const db            = require('./db.js');

const Web3          = require('web3');
const web3          = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const contract      = require('./contractInfo.js');
const instance      = web3.eth.contract(contract.abi).at(contract.address);

router.get('/', (req, res) => {
    db.Get((info) => {
        let customer = info.address;
        let length = Number(instance.getStoreCount.call().toString(10));
        let addrArr = [];
        let nameArr = [];
        for (let i = 0; i < length; ++i) {
            let storeAddr = instance.storeList.call(i);
            let storeName = instance.storeName.call(storeAddr);
            nameArr.push(storeName);
            addrArr.push(storeAddr);
        }
        instance.getToken(customer, addrArr, {
            from: customer,
            gas: 400000,
        }, (err, tokenCnt) => {
            for (let i = 0; i < length; ++i) {
                res.write(nameArr[i] + ' ' + tokenCnt[i] + '\n');
            }
            res.end();
        });
    })
});

module.exports = router;