// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenBalanceRetriever {
    function getBalances(address wallet, address[] memory tokenContracts)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory balances = new uint256[](tokenContracts.length);
        for (uint256 i = 0; i < tokenContracts.length; i++) {
            // Assume all token contracts have a function called "balanceOf"
            // that returns the balance of a given address.
            balances[i] = ERC20(tokenContracts[i]).balanceOf(wallet);
        }
        return balances;
    }
}
