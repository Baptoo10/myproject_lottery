import Web3 from "web3";

// Request account access if needed
if (window.ethereum) {
// If the Ethereum provider (MetaMask) is available, request account access
window.ethereum.request({ method: "eth_requestAccounts" });
}

// if window.ethereum exists, create a new Web3 instance using the provider from MetaMask
// otherwise, set web3 to null
const web3 = window.ethereum ? new Web3(window.ethereum) : null;


// Export the web3 instance for use in other parts of the application
export default web3;


/*import Web3 from "web3";
 
// Request account access if needed
window.ethereum.request({ method: "eth_requestAccounts" });
 
// Create a new Web3 instance using the provider from MetaMask
const web3 = new Web3(window.ethereum);
 
export default web3;
*/
/*Deppreciated code :

import Web3 from "web3";
 
window.ethereum.request({ method: "eth_requestAccounts" });
 
const web3 = new Web3(window.ethereum);
 
export default web3;*/

