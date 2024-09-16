// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract AceTokenPresale is Ownable, ReentrancyGuard {
    IERC20 public spaghettiToken;
    uint256 public constant TOKENS_PER_ETH = 50000000; // 50,000,000 SPG per ETH
    uint256 public constant MIN_PURCHASE = 250000 * 10 ** 18; // 250,000 SPG minimum purchase
    uint256 public constant REFERRAL_PERCENT = 10; // 10% referral bonus in ETH
    uint256 public constant PRESALE_SUPPLY = 550000000 * 10 ** 18; // 550 million SPG for presale

    uint256 public tokensSold;
    uint256 public presaleEndTime;
    bool public presaleEnded;

    mapping(address => uint256) public referralEarnings;
    mapping(address => uint256) public totalReferrals;

    event TokensPurchased(
        address indexed buyer,
        uint256 amount,
        address referrer
    );
    event ReferralEarned(address indexed referrer, uint256 amount);
    event PresaleEnded(uint256 tokensSold);
    event EarningsCollected(address indexed referrer, uint256 amount);

    constructor(address _tokenAddress, uint256 _presaleDurationInDays) {
        spaghettiToken = IERC20(_tokenAddress);
        presaleEndTime = block.timestamp + (_presaleDurationInDays * 1 days);
    }

    function buyTokens(address _referrer) external payable nonReentrant {
        require(!presaleEnded, "Presale has ended");
        require(block.timestamp < presaleEndTime, "Presale period has expired");
        require(msg.value > 0, "Must send ETH to buy tokens");

        uint256 tokensToBuy = calculateTokenAmount(msg.value);
        require(
            tokensToBuy >= MIN_PURCHASE,
            "Must purchase at least minimum amount"
        );
        require(
            tokensSold + tokensToBuy <= PRESALE_SUPPLY,
            "Not enough tokens left in presale"
        );

        tokensSold += tokensToBuy;

        // Transfer tokens to buyer
        require(
            spaghettiToken.transfer(msg.sender, tokensToBuy),
            "Token transfer failed"
        );

        // Handle referral
        if (_referrer != address(0) && _referrer != msg.sender) {
            uint256 referralBonus = (msg.value * REFERRAL_PERCENT) / 100;
            referralEarnings[_referrer] += referralBonus;
            totalReferrals[_referrer]++;
            emit ReferralEarned(_referrer, referralBonus);
        }

        emit TokensPurchased(msg.sender, tokensToBuy, _referrer);

        // Check if presale should end
        if (tokensSold >= PRESALE_SUPPLY || block.timestamp >= presaleEndTime) {
            endPresale();
        }
    }

    function claimReferralEarnings() external nonReentrant {
        uint256 earnings = referralEarnings[msg.sender];
        require(earnings > 0, "No referral earnings to claim");

        referralEarnings[msg.sender] = 0;
        (bool sent, ) = msg.sender.call{value: earnings}("");
        require(sent, "Failed to send referral earnings");

        emit EarningsCollected(msg.sender, earnings);
    }

    function getTotalReferrals(
        address _referrer
    ) external view returns (uint256) {
        return totalReferrals[_referrer];
    }

    function getTotalEarnings(
        address _referrer
    ) external view returns (uint256) {
        return referralEarnings[_referrer];
    }

    function calculateTokenAmount(
        uint256 _ethAmount
    ) public pure returns (uint256) {
        return _ethAmount * TOKENS_PER_ETH;
    }

    function endPresale() public onlyOwner {
        require(!presaleEnded, "Presale already ended");
        presaleEnded = true;
        emit PresaleEnded(tokensSold);
    }

    function withdrawUnsoldTokens() external onlyOwner {
        require(presaleEnded, "Presale not yet ended");
        uint256 unsoldTokens = PRESALE_SUPPLY - tokensSold;
        require(
            spaghettiToken.transfer(owner(), unsoldTokens),
            "Transfer of unsold tokens failed"
        );
    }

    function withdrawETH() external onlyOwner {
        require(presaleEnded, "Presale not yet ended");
        uint256 balance = address(this).balance;
        (bool sent, ) = owner().call{value: balance}("");
        require(sent, "Failed to send ETH");
    }

    receive() external payable {
        revert("Use buyTokens function to purchase tokens");
    }
}
