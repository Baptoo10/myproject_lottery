const path = require('path');     //This line imports the 'path' module that allows the code to work with file and directory paths
const fs = require('fs');     //This line imports the 'fs' module which provides an API for interacting with the file system
const solc = require("solc");    //This line imports the 'solc' module which is a solidity compiler

const lotteryPath = path.resolve(__dirname , 'contracts' , 'Lottery.sol');    //This line creates a file path for the 'Inbox.sol' file using the 'path' module and the '__dirname' variable
const source = fs.readFileSync(lotteryPath, 'utf8');     //This line reads the 'Inbox.sol' file using the 'fs' module and stores the file's contents as a string in the 'source' variable

var input = {     //This line creates an object called 'input' with properties for language, sources, and settings
    language: 'Solidity', //specifies that the language is Solidity
    sources: {
            '../contracts/Lottery.sol': {
                            content: source //uses the contents of the 'source' variable as the content for the 'Inbox.sol' source
            }
    },
    settings: {
                outputSelection: {
                               '*': {
                                    '*': ['*'] //specifies that all information for all contracts should be included in the output
                              }
                }
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));     //This line uses the 'solc' module to compile the 'input' object and stores the output in a variable called 'output'

const interface = output.contracts['Lottery.sol'].Lottery.abi;
const bytecode = output.contracts['Lottery.sol'].Lottery.evm.bytecode.object;

module.exports = {
    interface,
    bytecode,
};
