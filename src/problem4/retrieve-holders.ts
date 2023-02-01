import { ethers } from "ethers";
import * as fs from "fs";

/**
 * Gets the token amounts of specified holder addresses for a token contract.
 *
 * @param holderAddresses The Ethereum addresses of the holders.
 * @returns (as a Promise) The map from address to token amount.
 */
async function getTokenAmount(holderAddresses: Array<string>) {
  // Connect to the Binance Smart Chain network using the specified RPC node
  const provider = new ethers.providers.JsonRpcProvider(
    "https://bsc-dataseed1.binance.org/"
  );

  // The address of the token contract
  const contractAddress = "0xc0ecb8499d8da2771abcbf4091db7f65158f1468";

  // Load the ABI (Application Binary Interface) from the JSON file
  const abi = JSON.parse(fs.readFileSync("SWTH_abi.json", "utf8"));

  // Create a contract object for the token contract
  const contract = new ethers.Contract(contractAddress, abi, provider);

  var balances = new Map<string, number>();

  for (const holderAddress of holderAddresses) {
    const balance = await contract.balanceOf(holderAddress);
    balances.set(holderAddress, balance);
  }

  // Return the token balance
  return balances;
}

var holderAddresses = [
  "0xb5d4f343412dc8efb6ff599d790074d0f1e8d430",
  "0x0020c5222a24e4a96b720c06b803fb8d34adc0af",
  "0xd1d8b2aae2ebb2acf013b803bc3c24ca1303a392",
];

// Use a for loop to get the token amount for each address in the holderAddresses array
getTokenAmount(holderAddresses)
  .then((balances) => {
    for (let [address, balance] of balances) {
      console.log(address, balance.toString());
    }
  })
  .catch((error) => {
    console.error(error);
  });
