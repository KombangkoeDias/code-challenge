const Web3 = require("web3");
const fs = require("fs");

const tokenBalanceRetrieverABI = JSON.parse(
  fs.readFileSync("./build/contracts/TokenBalanceRetriever.json", "utf8")
).abi;

async function getBalances(walletAddress, tokenAddresses) {
  // Connect to the BSC test network
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://data-seed-prebsc-1-s2.binance.org:8545"
    )
  );

  // Get the contract instance
  const tokenBalanceRetriever = new web3.eth.Contract(
    tokenBalanceRetrieverABI,
    "0xA8669b32736565f74C4A407E0f52f2b10326263b"
  );

  // Call the `getBalances` function
  const balances = await tokenBalanceRetriever.methods
    .getBalances(walletAddress, tokenAddresses)
    .call();

  // Log the balances
  console.log(balances);
}

getBalances("0x60bB6c1B4a0F5B1ea820be6c762384982b8a658c", [
  "0x9B42aCE18d34DE987666C7dED2428A1e1573e327",
  "0xf96997598155fA6BeC5Be8b14A0b71fE70d838d1",
]);
