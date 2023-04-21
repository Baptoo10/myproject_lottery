// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract Lottery{

    address public manager;
    address payable [] public players;

    constructor () {
        manager = msg.sender;
    }


    modifier OnlyManagerCanCall(){ //a modifier prevent the use of multiple same code lines
        require(msg.sender == manager); //the code line only write once
        _; //the rest of the code of the function
    }
    
    function getManagerAddress () public view returns(address){ //view is just a call type function ==> no wei are gonne be spend
        return manager;
    }

    function getBalance() public view returns (uint){
        return address(this).balance;
    }
    
    function getPlayers() public view returns(address payable[] memory) {

        return players;

    }
    


    function enter() public payable {
        require(msg.value >= 0.001 ether); //require() au moins 0.1 ether doit etre envoye
        players.push(payable(msg.sender));

        /*
         Member "push" not found or not visible after argument-dependent lookup in address payable[] storage ref.

         error shows in Solidity 0.8, and it's because in 0.8 msg.sender is not automatically payable anymore.
         So you need to make it payable first.
        */
    }

   


    function random() private view returns (uint256) { //ou uint car uint=uint256
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players))); //abi.encodePacked is use to fix the following issue : TypeError: Wrong argument count for function call: 3 arguments given but expected 1. This function requires a single bytes argument. Use abi.encodePacked(...) to obtain the pre-0.5.0 behaviour or abi.encode(...) to use ABI encoding.
    }
    
    function pickWinner() public OnlyManagerCanCall { //view returns (address){ //OnlyManagerCanCall keyword to call the modifier
        
       // getBalance();
        
        uint index = random() % players.length;
        players[index].transfer(address(this).balance);

        reset();
    }

    function reset() private {
        if(address(this).balance == 0){
            delete players; //paidPlayers.length = 0
        }
    }

   
    
    /* ReturnEntries() private{
        require(msg.sender == manager);

    }
*/
    function ReturnMyEntry() public {

    }

}