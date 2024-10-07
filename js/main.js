// Constants
const CONTRACT_ADDRESS = "0x1A8D3B3536695bcBA9Cf92f28382f1544f9f6352";
// 0xF9d95F0072388EBda1a039410C8bF521e9b0913b
const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "_tokenAddress", "type": "address" },
      {
        "internalType": "uint256",
        "name": "_presaleDurationInDays",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "referrer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "EarningsCollected",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "influencerAddress",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "uniqueName",
        "type": "string"
      }
    ],
    "name": "InfluencerAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "string",
        "name": "influencerName",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "InfluencerEarned",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tokensSold",
        "type": "uint256"
      }
    ],
    "name": "PresaleEnded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "referrer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "ReferralEarned",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "referrer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "influencerName",
        "type": "string"
      }
    ],
    "name": "TokensPurchased",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "INFLUENCER_PERCENT",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MIN_PURCHASE",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "PRESALE_SUPPLY",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "REFERRAL_PERCENT",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "TOKENS_PER_ETH",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_influencerAddress",
        "type": "address"
      },
      { "internalType": "string", "name": "_uniqueName", "type": "string" }
    ],
    "name": "addInfluencer",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_referrer", "type": "address" },
      { "internalType": "string", "name": "_influencerName", "type": "string" }
    ],
    "name": "buyTokens",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_ethAmount", "type": "uint256" }
    ],
    "name": "calculateTokenAmount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimReferralEarnings",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "endPresale",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_uniqueName", "type": "string" }
    ],
    "name": "getInfluencerAddress",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_influencerAddress",
        "type": "address"
      }
    ],
    "name": "getInfluencerName",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_referrer", "type": "address" }
    ],
    "name": "getTotalEarnings",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_referrer", "type": "address" }
    ],
    "name": "getTotalReferrals",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "influencerAddressToName",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "name": "influencers",
    "outputs": [
      { "internalType": "address", "name": "addr", "type": "address" },
      { "internalType": "string", "name": "uniqueName", "type": "string" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "presaleEndTime",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "presaleEnded",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "referralEarnings",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "spaghettiToken",
    "outputs": [
      { "internalType": "contract IERC20", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "tokensSold",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "totalReferrals",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "newOwner", "type": "address" }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawETH",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawUnsoldTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  { "stateMutability": "payable", "type": "receive" }
]


// Add these new constants
const SPG_TOKEN_ADDRESS = "0x49fb10526247d4aB400c92E51E1b1F0ca753F730";
const SPG_TOKEN_ABI = [
  // Including only the necessary functions from the SPG token contract ABI
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];

// Constants
// const CONTRACT_ADDRESS = "0x3675bE52bE4Dd5dd6c98D67a043Dc5986d1c06Ef";
// const CONTRACT_ABI = []; // Leave this empty as requested
// const SPG_TOKEN_ADDRESS = "0xBD84B55187Ff2b82cD2810c7298FfA8B28CB6Bb4";
// const SPG_TOKEN_ABI = []; // Leave this empty as requested

// State
let provider;
let signer;
let userAddress;
let contract;
let spgTokenContract;
let isInfluencer = false;
let influencerName = "";

// DOM Elements
const connectWalletBtn = document.getElementById("connectWalletBtn");
const headerConnectWalletBtn = document.getElementById(
  "headerConnectWalletBtn"
);
const spgBalanceElement = document.querySelector(".ace-balance");
const balanceElement = document.querySelector(".balance");
const referralInput = document.querySelector(".referral-input");
const purchaseInput = document.querySelector(".purchase-input");
const maxButton = document.querySelector(".max-button");
const buyButton = document.querySelector(".buy-button");
const copyButton = document.querySelector(".copy-button");
const amountToReceiveElement = document.querySelector(".amount-to-receive");
const totalReferralsElement = document.getElementById("totalReferrals");
const totalEarningsElement = document.getElementById("totalEarnings");
const collectEthButton = document.querySelector(".collect-eth-button");
const infoButton = document.querySelector(".info-button");

// Utility Functions
const showNotification = (message, type = "info") => {
  const notificationContainer = document.querySelector(
    ".notification-container"
  );
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notificationContainer.appendChild(notification);

  setTimeout(() => notification.classList.add("show"), 10);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notificationContainer.removeChild(notification), 300);
  }, 5000);
};

const formatAddress = (address) =>
  `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;

const updateUIState = (isConnected) => {
  [purchaseInput, maxButton, buyButton].forEach(
    (el) => (el.disabled = !isConnected)
  );
  if (isConnected) {
    connectWalletBtn.textContent = formatAddress(userAddress);
    headerConnectWalletBtn.textContent = formatAddress(userAddress);
  } else {
    connectWalletBtn.textContent = "Connect Wallet";
    headerConnectWalletBtn.textContent = "Connect Wallet";
    balanceElement.textContent = "Your Balance: 0.0000 ETH";
    spgBalanceElement.textContent = "SPG Balance: 0.0000 SPG";
    referralInput.value = "";
    amountToReceiveElement.textContent = "You will receive: 0 SPG";
  }
};

// Core Functions
const connectWallet = async () => {
  if (window.ethereum) {
    try {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
      userAddress = await signer.getAddress();
      contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      spgTokenContract = new ethers.Contract(
        SPG_TOKEN_ADDRESS,
        SPG_TOKEN_ABI,
        signer
      );

      await updateBalance();
      await updateSPGBalance();
      await updateReferralEarnings();
      await checkInfluencerStatus();
      generateReferralLink();
      updateUIState(true);

      showNotification("Wallet connected successfully!", "success");
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      showNotification("Failed to connect wallet. Please try again.", "error");
    }
  } else {
    showNotification("Please install MetaMask!", "error");
  }
};

const updateBalance = async () => {
  if (signer) {
    const balance = await provider.getBalance(userAddress);
    const ethBalance = ethers.utils.formatEther(balance);
    balanceElement.textContent = `Balance: ${parseFloat(ethBalance).toFixed(
      4
    )} ETH`;
  }
};

const updateSPGBalance = async () => {
  if (spgTokenContract && userAddress) {
    try {
      const balance = await spgTokenContract.balanceOf(userAddress);
      const spgBalance = ethers.utils.formatUnits(balance, 18);
      spgBalanceElement.textContent = `ACE Balance: ${parseFloat(
        spgBalance
      ).toFixed(2)} ACE`;
    } catch (error) {
      console.error("Failed to fetch ACE balance:", error);
      showNotification("Failed to update ACE balance", "error");
    }
  }
};

const checkInfluencerStatus = async () => {
  if (contract && userAddress) {
    try {
      const name = await contract.getInfluencerName(userAddress);
      if (name !== "") {
        isInfluencer = true;
        influencerName = name;
      } else {
        isInfluencer = false;
        influencerName = "";
      }
    } catch (error) {
      console.error("Failed to check influencer status:", error);
      isInfluencer = false;
      influencerName = "";
    }
  }
};

const generateReferralLink = () => {
  const baseUrl = window.location.origin + window.location.pathname;
  if (isInfluencer) {
    referralInput.value = `${baseUrl}?ref=${influencerName}`;
  } else {
    referralInput.value = `${baseUrl}?ref=${userAddress}`;
  }
};

const copyReferralLink = () => {
  referralInput.select();
  document.execCommand("copy");
  showNotification("Referral link copied to clipboard!", "info");
};

const updateReferralEarnings = async () => {
  if (contract) {
    try {
      const [totalReferrals, totalEarnings] = await Promise.all([
        contract.getTotalReferrals(userAddress),
        contract.getTotalEarnings(userAddress),
      ]);

      totalReferralsElement.textContent = totalReferrals.toString();
      totalEarningsElement.textContent = `${ethers.utils.formatEther(
        totalEarnings
      )} ETH`;
    } catch (error) {
      console.error("Failed to fetch referral data:", error);
      showNotification("Failed to update referral data", "error");
    }
  }
};

const updateAmountToReceive = async () => {
  const amount = purchaseInput.value;
  if (amount && contract) {
    try {
      const sltAmount = await contract.calculateTokenAmount(
        ethers.utils.parseEther(amount)
      );
      amountToReceiveElement.textContent = `You will receive: ${ethers.utils.formatUnits(
        sltAmount,
        18
      )} ACE`;
    } catch (error) {
      console.error("Failed to calculate token amount:", error);
      showNotification("Failed to calculate token amount", "error");
    }
  } else {
    amountToReceiveElement.textContent = "You will receive: 0 ACE";
  }
};

const setMaxAmount = async () => {
  if (signer) {
    try {
      const balance = await provider.getBalance(userAddress);
      purchaseInput.value = ethers.utils.formatEther(balance);
      await updateAmountToReceive();
      showNotification("Maximum amount set", "info");
    } catch (error) {
      console.error("Failed to set max amount:", error);
      showNotification("Failed to set maximum amount", "error");
    }
  } else {
    showNotification("Please connect your wallet first.", "error");
  }
};

const buyTokens = async () => {
  if (!contract) {
    showNotification("Please connect your wallet first.", "error");
    return;
  }

  const amount = purchaseInput.value;
  if (amount <= 0) {
    showNotification("Please enter a valid amount to purchase.", "error");
    return;
  }

  try {
    const urlParams = new URLSearchParams(window.location.search);
    let referral = urlParams.get("ref") || ethers.constants.AddressZero;
    let isInfluencer = false;
    let influencerName = "";

    // Check if the referral is an influencer name or address
    if (referral.startsWith("0x")) {
      // It's an address, check if it's an influencer
      try {
        influencerName = await contract.getInfluencerName(referral);
        isInfluencer = influencerName !== "";
      } catch (error) {
        console.error("Failed to get influencer name:", error);
      }
    } else {
      // It's potentially an influencer name, get the corresponding address
      try {
        const influencerAddress = await contract.getInfluencerAddress(referral);
        if (influencerAddress !== ethers.constants.AddressZero) {
          isInfluencer = true;
          influencerName = referral;
          referral = influencerAddress;
        }
      } catch (error) {
        console.error("Failed to get influencer address:", error);
        // If failed to get influencer address, use zero address
        referral = ethers.constants.AddressZero;
      }
    }

    buyButton.disabled = true;
    buyButton.textContent = "Processing...";

    const tx = await contract.buyTokens(
      isInfluencer ? ethers.constants.AddressZero : referral,
      isInfluencer ? influencerName : "",
      { value: ethers.utils.parseEther(amount) }
    );
    showNotification("Transaction submitted. Please wait...", "info");

    await tx.wait();

    showNotification("You have purchased ACE tokens successfully!", "success");
    await updateBalance();
    await updateSPGBalance();
    await updateReferralEarnings();
    purchaseInput.value = "";
    await updateAmountToReceive();
  } catch (error) {
    console.error("Transaction failed:", error);
    showNotification("Transaction failed. Please try again.", "error");
  } finally {
    buyButton.disabled = false;
    buyButton.textContent = "Buy Now";
  }
};

const checkReferralType = async (referral) => {
  if (referral.startsWith("0x")) {
    try {
      const influencerName = await contract.getInfluencerName(referral);
      return {
        isInfluencer: influencerName !== "",
        name: influencerName,
        address: referral,
      };
    } catch (error) {
      console.error("Failed to get influencer name:", error);
      return { isInfluencer: false, name: "", address: referral };
    }
  } else {
    try {
      const influencerAddress = await contract.getInfluencerAddress(referral);
      if (influencerAddress !== ethers.constants.AddressZero) {
        return {
          isInfluencer: true,
          name: referral,
          address: influencerAddress,
        };
      }
    } catch (error) {
      console.error("Failed to get influencer address:", error);
    }
    return {
      isInfluencer: false,
      name: "",
      address: ethers.constants.AddressZero,
    };
  }
};

const collectEarnings = async () => {
  if (!contract) {
    showNotification("Please connect your wallet first.", "error");
    return;
  }

  try {
    showNotification("Collecting earnings. Please wait...", "info");
    const tx = await contract.claimReferralEarnings();
    await tx.wait();
    showNotification("Earnings collected successfully!", "success");
    await updateReferralEarnings();
    await updateBalance();
  } catch (error) {
    console.error("Failed to collect earnings:", error);
    showNotification("Failed to collect earnings. Please try again.", "error");
  }
};

const showInfoTooltip = () => {
  showNotification(
    "Earn ETH by referring new users to buy SPG tokens!",
    "info"
  );
};

// Event Handlers
const handleAccountChange = (accounts) => {
  if (accounts.length === 0) {
    updateUIState(false);
    showNotification("Wallet disconnected", "info");
  } else {
    connectWallet();
  }
};

const handleChainChange = () => {
  showNotification("Network changed. Reloading page...", "info");
  setTimeout(() => window.location.reload(), 2000);
};

// Initialization
const init = () => {
  updateUIState(false);
  // updateReferralTypeUI();

  connectWalletBtn.addEventListener("click", connectWallet);
  headerConnectWalletBtn.addEventListener("click", connectWallet);
  buyButton.addEventListener("click", buyTokens);
  purchaseInput.addEventListener("input", updateAmountToReceive);
  maxButton.addEventListener("click", setMaxAmount);
  copyButton.addEventListener("click", copyReferralLink);
  collectEthButton.addEventListener("click", collectEarnings);
  infoButton.addEventListener("click", showInfoTooltip);

  if (window.ethereum) {
    window.ethereum.on("accountsChanged", handleAccountChange);
    window.ethereum.on("chainChanged", handleChainChange);
  }

  const urlParams = new URLSearchParams(window.location.search);
  const referral = urlParams.get("ref");
  if (referral) {
    referralInput.value = `${window.location.origin}${window.location.pathname}?ref=${referral}`;
  }
};

// Start the application
init();
