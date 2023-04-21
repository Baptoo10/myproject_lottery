const assert = require("assert");
const ganache = require("ganache");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider()); //provider allow us to be connected to any network, in this case, ganache 


const {
    interface,
    bytecode
} = require("../src/compile");


//local variables
let accounts; //to list every accounts
let lottery; //to instance our contracts

beforeEach(async() => { //to deploy our contract and get a list of all of our accounts

    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(JSON.parse(JSON.stringify(interface)))
        .deploy({
            data: bytecode,
        })
        .send({
            from: accounts[0],
            gas: '1000000'
        });

});

describe('Lottery Contract', () => { //it statement is to test differents aspects of our contract

    //function to be sure all is deployed correctly
    it('deploys a contract', () => {
        assert.ok(lottery.options.address); //savoir où le contrat a été déployé (l'adresse). Le ok permet de dire "j'execute si lottery.options.address contains value"
    });

    it('allows one account to enter', async() => { //test afin de savoir si une adresse peut bien rentrer dans la pool après avoir payé 
        await lottery.methods.enter().send({
            from: accounts[0], //compte 0 ==  compte test (manager)
            value: web3.utils.toWei('1', 'ether') //to be sure at least 1 ether has been sent
        });


        const players = await lottery.methods.getPlayers().call({ //test de la methode getPlayers()
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]); // test accounts[0] == players[0]
        assert.equal(1, players.length); // test l'array players est long de 1 (=1 element)

    });


    it('allows multiples accounts to enter', async() => { //test afin de savoir si une adresse peut bien rentrer dans la pool après avoir payé 
        await lottery.methods.enter().send({
            from: accounts[0], //compte 0 ==  compte test (manager)
            value: web3.utils.toWei('1', 'ether') //to be sure at least 1 ether has been sent
        });
        await lottery.methods.enter().send({
            from: accounts[1], //compte 0 ==  compte test (manager)
            value: web3.utils.toWei('1', 'ether') //to be sure at least 1 ether has been sent
        });
        await lottery.methods.enter().send({
            from: accounts[2], //compte 0 ==  compte test (manager)
            value: web3.utils.toWei('1', 'ether') //to be sure at least 1 ether has been sent
        });

        const players = await lottery.methods.getPlayers().call({ //test de la methode getPlayers()
            from: accounts[0]
        });

        assert.equal(accounts[0], players[0]); // test accounts[0] == players[0]
		assert.equal(accounts[1], players[1]); // test accounts[0] == players[0]
        assert.equal(accounts[2], players[2]); // test accounts[0] == players[0]

        assert.equal(3, players.length); // test l'array players est long de 1 (=1 element)

    });

    it('Requires a minimum of ether to enter', async() => {

    	try{
    		await lottery.methods.enter().send({
    			from: accounts[0],
    			value: 50 // OU web3.utils.toWei('0.5', 'ether') //50 == 50 wei //le mini pour rentrer est de 1 ether (voir Lottery.sol)
    		});

    		assert(false); //to be very sure the test fails ==> assert(false) will fail our test no matter what. It's executed if the code just above doesn't return an error (not possible in theory)
    	}catch(err){
    		assert(err);
    	}
   	});

   	it('Only manager can call pickWinner()', async() => {
		
		try{
    		await lottery.methods.pickWinner().send({
    			from: accounts[1] //not the manager, manager is accounts[0]
    		});
    		assert(false); //to be very sure the test fails ==> assert(false) will fail our test no matter what. It's executed if the code just above doesn't return an error (not possible in theory)
    	}catch(err){
    		assert(err);
    	}
   	});

	it('Sends money to the winner and resets the players array', async() => {
		
		await lottery.methods.enter().send({
			from: accounts[0],
			value: web3.utils.toWei('1', 'ether')
		});

    	const initialBalance = await web3.eth.getBalance(accounts[0]);
   		
    	await lottery.methods.pickWinner().send({ //winner will automaticly be accounts[0] (=manager) because we only setted up 1 account 
    		from: accounts[0]
    	});

    	const finalBalance = await web3.eth.getBalance(accounts[0]);

    	const difference = finalBalance-initialBalance;
    	console.log('Difference : ', difference);
    	assert(difference > web3.utils.toWei('0.9', 'ether')); //1 ether - gas cost


    	const players = await lottery.methods.getPlayers().call({ //test de la methode getPlayers()
            from: accounts[0]
        });
		assert.equal(0, players.length); // test l'array players est vide (=0 element)
    	

		const balance = await lottery.methods.getBalance().call({ //test de la methode getBalance()
            from: accounts[0]
        });
    	assert.equal(0, balance);
   	});


/* these 2 tests are code just above (const players ... & const balance ...)
it('checks there are no players after pick winner',async()=>{
 
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2','ether')
        })
 
        await lottery.methods.pickWinner().send({
            from: accounts[0]
        })
 
        const players = await lottery.methods.getPlayers().call();
        console.log(players.length);
        assert(players.length == 0);
 
    })
 
    it('checks the lottery balance is empty after pick winner is called',async()=>{
 
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2','ether')
        })
 
        await lottery.methods.pickWinner().send({
            from: accounts[0]
        })
 
        const balance = await web3.eth.getBalance(lottery.options.address);
        console.log(balance);
        assert(balance==0)
 
    })
*/

});