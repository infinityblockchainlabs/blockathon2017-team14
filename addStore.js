const router        = require('express').Router();
const fs            = require('fs');
const db            = require('./db.js');

const Web3          = require('web3');
const web3          = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const contract      = require('./contractInfo.js');
const instance      = web3.eth.contract(contract.abi).at(contract.address);

const template      = fs.readFileSync('templates/addStore.html', 'utf-8');

router.get('/', (req, res) => {
    res.send(template);
});

router.post('/', (req, res) => {
    db.Get((info) => {
        console.log(info);
        let storeAddr = info.address;
        let storeName = req.body.storeName;
        let tokenCnt  = req.body.tokenCnt;
        instance.addStore(storeAddr, storeName, tokenCnt, {
            from: storeAddr,
            gas: 400000
        })
        res.redirect('/');
    });
});

module.exports = router;

