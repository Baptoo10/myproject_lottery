import web3 from './web3';


const address = '0xC439e73A5bc3Ae9941DB59aDaF80278482dE10d3';
const abi = [{
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        }, {
            "inputs": [],
            "name": "ReturnMyEntry",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [],
            "name": "enter",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        }, {
            "inputs": [],
            "name": "getBalance",
            "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "getManagerAddress",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "getPlayers",
            "outputs": [{
                "internalType": "address payable[]",
                "name": "",
                "type": "address[]"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "manager",
            "outputs": [{
                "internalType": "address",
                "name": "",
                "type": "address"
            }],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "pickWinner",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{
                "internalType": "uint256",
                "name ": "",
                "type ": "uint256 "
            }],
            "name ": "players",
            "outputs ": [{
            "internalType ": "address payable",
            "name ": "",
            "type ": "address"
            }],
            "stateMutability": "view",
            "type": "function "}];

/*
const abi2 = [{
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {
    "inputs": [],
    "name": "ReturnMyEntry",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [],
    "name": "enter",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
}, {
    "inputs": [],
    "name": "getBalance",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getManagerAddress",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "getPlayers",
    "outputs": [{
        "internalType": "address payable[]",
        "name": "",
        "type": "address[]"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "manager",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [],
    "name": "pickWinner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "name": "players",
    "outputs": [{
        "internalType": "address payable",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}];
*/


const contractInstance = new web3.eth.Contract(abi, address);

export default contractInstance;






