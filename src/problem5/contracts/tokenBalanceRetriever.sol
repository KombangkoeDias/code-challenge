pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenBalanceRetriever {
    struct TokenBalance {
        address token;
        uint256 balance;
    }

    function getBalances(address wallet, address[] memory tokenContracts)
        public
        view
        returns (TokenBalance[] memory)
    {
        TokenBalance[] memory tokenBalances = new TokenBalance[](
            tokenContracts.length
        );
        for (uint256 i = 0; i < tokenContracts.length; i++) {
            tokenBalances[i].token = tokenContracts[i];
            tokenBalances[i].balance = ERC20(tokenBalances[i].token).balanceOf(
                wallet
            );
        }
        return tokenBalances;
    }
}
