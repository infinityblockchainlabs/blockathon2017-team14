pragma solidity ^0.4.0;

contract Token {
    mapping (address => mapping (address => uint64)) public balance;
    mapping (address => uint64) public outBalance;
    mapping (address => uint64) public addressType;

    address[] public storeList;
    mapping (address => string) public storeName;
    uint64 public rate = 1;

    function getStoreCount() constant public returns(uint256) {
        return storeList.length;
    }

    function addStore(address store, string name, uint64 value) public {
        if (addressType[store] == 0) {
            storeList.push(store);
            storeName[store] = name;
        }
        addressType[store] = 1;
        balance[store][store] += value;
    }

    function supplyToken(address store, address user, uint64 amount) public {        
        require(addressType[store] == 1);
        require(addressType[user] == 0);
        require(balance[store][store] >= amount);
        balance[store][store] -= amount;
        balance[store][user] += amount;
    }

    function returnToken(address user, address store, uint64 amount) public {
        require(addressType[user] == 0);
        require(addressType[store] == 1);
        require(balance[store][user] >= amount);
        balance[store][store] += amount;
        balance[store][user] -= amount;
    }

    function getToken(address user, address[] store) constant public returns(uint64[]) {
        uint64[] a;
        for (uint256 i = 0; i < store.length; ++i) {
            a.push(balance[store[i]][user]);
        }
        return a;
    }

    function buySharedToken(address store, uint64 value) payable public {
        require(addressType[store] == 1);
        uint64 amount = value * rate;
        outBalance[store] += amount;
    }

    function transferSharedToken(address a, address b, uint64 tokenCnt) public {
        require(addressType[a] != addressType[b]);
        require(outBalance[a] >= tokenCnt);
        outBalance[a] -= tokenCnt;
        outBalance[b] += tokenCnt;
    }

    function sellSharedToken(address store, uint64 tokenCnt) public {
        require(addressType[store] == 1);
        require(outBalance[store] >= tokenCnt);
        outBalance[store] -= tokenCnt;
        store.transfer(tokenCnt / rate);
    }

    function () payable public {
        
    }
}