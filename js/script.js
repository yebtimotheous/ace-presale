const contractABI = [
  // Add your contract ABI here
];

let provider;
let signer;
let userAddress;
let contract;
const contractAddress = "0xYourContractAddressHere"; // Replace with actual contract address

function showNotification(message, type = "info") {
  const notificationContainer = document.querySelector(
    ".notification-container"
  );
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notificationContainer.appendChild(notification);

  notification.offsetHeight; // Trigger reflow to enable transition

  setTimeout(() => notification.classList.add("show"), 10);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notificationContainer.removeChild(notification), 300);
  }, 5000);
}

async function connectWallet() {
  if (window.ethereum) {
    try {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
      userAddress = await signer.getAddress();
      contract = new ethers.Contract(contractAddress, contractABI, signer);

      await updateBalance();
      await updateReferralEarnings();

      const walletButtonText = `${userAddress.substring(
        0,
        6
      )}...${userAddress.substring(userAddress.length - 4)}`;
      document.querySelector("#connectWalletBtn").textContent =
        walletButtonText;
      document.querySelector("#headerConnectWalletBtn").textContent =
        walletButtonText;

      generateReferralLink();
      enableInputsAndButtons();

      showNotification("Wallet connected successfully!", "success");
    } catch (error) {
      console.error("User rejected wallet connection:", error);
      showNotification("Failed to connect wallet. Please try again.", "error");
    }
  } else {
    showNotification("Please install MetaMask!", "error");
  }
}

async function updateBalance() {
  if (signer) {
    const balance = await provider.getBalance(userAddress);
    const ethBalance = ethers.utils.formatEther(balance);
    document.querySelector(".balance").textContent = `Balance: ${parseFloat(
      ethBalance
    ).toFixed(4)} ETH`;
  }
}

function generateReferralLink() {
  const baseUrl = window.location.origin + window.location.pathname;
  const referralLink = `${baseUrl}?ref=${userAddress}`;
  document.querySelector(".referral-input").value = referralLink;
}

function copyReferralLink() {
  const referralInput = document.querySelector(".referral-input");
  referralInput.select();
  document.execCommand("copy");
  showNotification("Referral link copied to clipboard!", "info");
}

async function updateReferralEarnings() {
  if (contract) {
    try {
      const totalReferrals = await contract.getTotalReferrals(userAddress);
      const totalEarnings = await contract.getTotalEarnings(userAddress);

      document.getElementById("totalReferrals").textContent =
        totalReferrals.toString();
      document.getElementById(
        "totalEarnings"
      ).textContent = `${ethers.utils.formatEther(totalEarnings)} ETH`;
    } catch (error) {
      console.error("Failed to fetch referral data:", error);
      showNotification("Failed to update referral data", "error");
    }
  }
}

function showInfoTooltip() {
  showNotification(
    "Earn ETH by referring new users to buy SPG tokens!",
    "info"
  );
}

async function collectEarnings() {
  if (!contract) {
    showNotification("Please connect your wallet first.", "error");
    return;
  }

  try {
    showNotification("Collecting earnings. Please wait...", "info");
    const tx = await contract.collectEarnings();
    await tx.wait();
    showNotification("Earnings collected successfully!", "success");
    await updateReferralEarnings();
    await updateBalance();
  } catch (error) {
    console.error("Failed to collect earnings:", error);
    showNotification("Failed to collect earnings. Please try again.", "error");
  }
}

async function updateAmountToReceive() {
  const amount = document.querySelector(".purchase-input").value;
  try {
    const sltAmount = await contract.calculateTokenAmount(
      ethers.utils.parseEther(amount)
    );
    document.querySelector(
      ".amount-to-receive"
    ).textContent = `You will receive: ${ethers.utils.formatUnits(
      sltAmount,
      18
    )} SPG`;
  } catch (error) {
    console.error("Failed to calculate token amount:", error);
    showNotification("Failed to calculate token amount", "error");
  }
}

async function setMaxAmount() {
  if (signer) {
    try {
      const balance = await provider.getBalance(userAddress);
      const ethBalance = ethers.utils.formatEther(balance);
      document.querySelector(".purchase-input").value = ethBalance;
      await updateAmountToReceive();
      showNotification("Maximum amount set", "info");
    } catch (error) {
      console.error("Failed to set max amount:", error);
      showNotification("Failed to set maximum amount", "error");
    }
  } else {
    showNotification("Please connect your wallet first.", "error");
  }
}

async function buyTokens() {
  if (!contract) {
    showNotification("Please connect your wallet first.", "error");
    return;
  }

  const amount = document.querySelector(".purchase-input").value;
  if (amount <= 0) {
    showNotification("Please enter a valid amount to purchase.", "error");
    return;
  }

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const referral = urlParams.get("ref") || ethers.constants.AddressZero;

    const tx = await contract.buyTokens(referral, {
      value: ethers.utils.parseEther(amount),
    });

    document.querySelector(".buy-button").disabled = true;
    document.querySelector(".buy-button").textContent = "Processing...";

    showNotification("Transaction submitted. Please wait...", "info");

    await tx.wait();

    showNotification(`You have purchased SPG tokens successfully!`, "success");
    await updateBalance();
    await updateReferralEarnings();
    document.querySelector(".purchase-input").value = "";
    await updateAmountToReceive();
  } catch (error) {
    console.error("Transaction failed:", error);
    showNotification("Transaction failed. Please try again.", "error");
  } finally {
    document.querySelector(".buy-button").disabled = false;
    document.querySelector(".buy-button").textContent = "Buy Now";
  }
}

function enableInputsAndButtons() {
  document.querySelector(".purchase-input").disabled = false;
  document.querySelector(".max-button").disabled = false;
  document.querySelector(".buy-button").disabled = false;
}

function disableInputsAndButtons() {
  document.querySelector(".purchase-input").disabled = true;
  document.querySelector(".max-button").disabled = true;
  document.querySelector(".buy-button").disabled = true;
}

function init() {
  disableInputsAndButtons();

  document
    .querySelector(".collect-eth-button")
    .addEventListener("click", collectEarnings);
  document
    .querySelector(".info-button")
    .addEventListener("click", showInfoTooltip);

  const urlParams = new URLSearchParams(window.location.search);
  const referral = urlParams.get("ref");
  if (referral) {
    document.querySelector(
      ".referral-input"
    ).value = `${window.location.origin}${window.location.pathname}?ref=${referral}`;
  }

  document
    .querySelector("#connectWalletBtn")
    .addEventListener("click", connectWallet);
  document
    .querySelector("#headerConnectWalletBtn")
    .addEventListener("click", connectWallet);
  document.querySelector(".buy-button").addEventListener("click", buyTokens);
  document
    .querySelector(".purchase-input")
    .addEventListener("input", updateAmountToReceive);
  document.querySelector(".max-button").addEventListener("click", setMaxAmount);
  document
    .querySelector(".copy-button")
    .addEventListener("click", copyReferralLink);

  if (window.ethereum) {
    window.ethereum.on("accountsChanged", handleAccountChange);
    window.ethereum.on("chainChanged", handleChainChange);
  }
}

function handleAccountChange(accounts) {
  if (accounts.length === 0) {
    disconnectWallet();
  } else {
    connectWallet();
  }
}

function disconnectWallet() {
  provider = null;
  signer = null;
  userAddress = null;
  contract = null;
  document.querySelector("#connectWalletBtn").textContent = "Connect Wallet";
  document.querySelector("#headerConnectWalletBtn").textContent =
    "Connect Wallet";
  document.querySelector(".balance").textContent = "Your Balance: 0.0000 ETH";
  document.querySelector(".referral-input").value = "";
  disableInputsAndButtons();
  showNotification("Wallet disconnected", "info");
}

function handleChainChange() {
  showNotification("Network changed. Reloading page...", "info");
  setTimeout(() => window.location.reload(), 2000);
}

init();
