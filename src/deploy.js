const HDWalletProvider =  require('@truffle/hdwallet-provider');
const Web3 = require('web3'); 
const { interface, bytecode } = require('./compile'); //to deploy the contract


const provider = new HDWalletProvider( //to unlock an account wallet / video 57
		'consider arrange crush endless gospel balance civil below crucial crawl session slush', //account seed
		'https://goerli.infura.io/v3/71cd4d96c71445f98d189f347cf73b22'
	);

const web3 = new Web3(provider); 

const deploy = async() => {
	const accounts = await web3.eth.getAccounts();

	console.log('Attempting to deploy from account', accounts[0]);
	
	gasLimit = await web3.eth.estimateGas({ data: bytecode });
	_gasPrice = await web3.eth.getGasPrice();

	console.log('GasLIMIT : ', gasLimit, ' GasPRICE : ', _gasPrice);

//const gasPriceWei = '386737913019';
const gasPriceEther = web3.utils.fromWei(_gasPrice, 'ether');
console.log(gasPriceEther); // output: 0.386737913019


const AccAddr = accounts[0];

web3.eth.getBalance(AccAddr).then(balance => {
    const balanceInEther = web3.utils.fromWei(balance, 'ether');
    console.log(`Balance of ${AccAddr}: ${balanceInEther} ether`);
  }).catch(console.error);


	const result = await new web3.eth.Contract(JSON.parse(JSON.stringify(interface)))
																	.deploy({data : bytecode})
																	.send({from: accounts[0],
																		   gas: '1000000' });

	console.log(JSON.stringify(interface));														
	console.log('Contract deployed to', result.options.address);
	provider.engine.stop();
};

deploy();




/*
const HDWalletProvider =  require('@truffle/hdwallet-provider');
const Web3 = require('web3'); 
const { interface, bytecode } = require('./compile'); //to deploy the contract


const provider = new HDWalletProvider( //to unlock an account wallet / video 57
		'consider arrange crush endless gospel balance civil below crucial crawl session slush', //account seed
		'https://goerli.infura.io/v3/71cd4d96c71445f98d189f347cf73b22'
	);

const web3 = new Web3(provider); 



const deploy = async() => {
const accounts =  await web3.eth.getAccounts();

const AccAddr = accounts[0];

web3.eth.getBalance(AccAddr).then(balance => {
    const balanceInEther = web3.utils.fromWei(balance, 'ether');
    console.log(`Balance of ${AccAddr}: ${balanceInEther} ether`);
  }).catch(console.error);
	
	console.log('Attempting to deploy from account', accounts[0]);
	
	const result = await new web3.eth.Contract(JSON.parse(JSON.stringify(interface)))
    .deploy({data : bytecode})
    .send({
        gas: web3.utils.toHex(1000000), 
       	gasPrice: web3.utils.toHex(web3.utils.toWei('0.01', 'ether')),
        from: accounts[0]
    });

	console.log(JSON.stringify(interface));														
	console.log('Contract deployed to', result.options.address);
	provider.engine.stop();
};

deploy();
*/

