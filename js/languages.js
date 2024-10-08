const translations = {
  en: {
    title: "Ace Token Presale",
    navbar: {
      stake: "Stake",
      games: "Games",
      trade: "Trade",
    },
    languages: {
      en: "English",
      ja: "Japanese",
      pt: "Portuguese",
      he: "Hebrew",
      ru: "Russian",
    },
    connectWallet: "Connect Wallet",
    buyAce: "BUY ACE",
    yourBalance: "Your Balance:",
    tokenInfo: {
      token: "Token:",
      tokenName: "Ace Token",
      price: "Price:",
      minPurchase: "Min Purchase:",
    },
    amountToPurchase: "Amount to Purchase",
    maxButton: "MAX",
    youWillReceive: "You will receive:",
    buyButton: "Buy ACE",
    aceBalance: "ACE Balance:",
    referralProgram: "Referral Program",
    referralInfo:
      "Refer others and earn 10% on their ETH. All influencers get unique links which attract as much as 30% ETH returns on all referrals.",
    totalReferrals: "Total Referrals:",
    totalEarnings: "Total Earnings:",
    collectEthButton: "Collect ETH",
  },
  ja: {
    title: "エーストークンプリセール",
    navbar: {
      stake: "ステーク",
      games: "ゲーム",
      trade: "取引",
    },
    languages: {
      en: "英語",
      ja: "日本語",
      pt: "ポルトガル語",
      he: "ヘブライ語",
      ru: "ロシア語",
    },
    connectWallet: "ウォレットを接続",
    buyAce: "ACEを購入",
    yourBalance: "あなたの残高：",
    tokenInfo: {
      token: "トークン：",
      tokenName: "エーストークン",
      price: "価格：",
      minPurchase: "最小購入額：",
    },
    amountToPurchase: "購入金額",
    maxButton: "最大",
    youWillReceive: "受け取る金額：",
    buyButton: "ACEを購入",
    aceBalance: "ACE残高：",
    referralProgram: "紹介プログラム",
    referralInfo:
      "他の人を紹介してETHの10%を獲得。インフルエンサーは全ての紹介で最大30%のETHリターンを獲得できるユニークなリンクを取得。",
    totalReferrals: "総紹介数：",
    totalEarnings: "総収益：",
    collectEthButton: "ETHを回収",
  },
  pt: {
    title: "Pré-venda do Token Ace",
    navbar: {
      stake: "Stake",
      games: "Jogos",
      trade: "Negociar",
    },
    languages: {
      en: "Inglês",
      ja: "Japonês",
      pt: "Português",
      he: "Hebraico",
      ru: "Russo",
    },
    connectWallet: "Conectar Carteira",
    buyAce: "COMPRAR ACE",
    yourBalance: "Seu Saldo:",
    tokenInfo: {
      token: "Token:",
      tokenName: "Token Ace",
      price: "Preço:",
      minPurchase: "Compra Mínima:",
    },
    amountToPurchase: "Quantidade para Comprar",
    maxButton: "MÁX",
    youWillReceive: "Você receberá:",
    buyButton: "Comprar ACE",
    aceBalance: "Saldo ACE:",
    referralProgram: "Programa de Indicação",
    referralInfo:
      "Indique outros e ganhe 10% em ETH. Todos os influenciadores recebem links únicos que atraem até 30% de retorno em ETH em todas as indicações.",
    totalReferrals: "Total de Indicações:",
    totalEarnings: "Ganhos Totais:",
    collectEthButton: "Coletar ETH",
  },
  he: {
    title: "מכירה מוקדמת של טוקן אייס",
    navbar: {
      stake: "הפקדה",
      games: "משחקים",
      trade: "מסחר",
    },
    languages: {
      en: "אנגלית",
      ja: "יפנית",
      pt: "פורטוגזית",
      he: "עברית",
      ru: "רוסית",
    },
    connectWallet: "חבר ארנק",
    buyAce: "קנה ACE",
    yourBalance: "היתרה שלך:",
    tokenInfo: {
      token: "טוקן:",
      tokenName: "טוקן אייס",
      price: "מחיר:",
      minPurchase: "רכישה מינימלית:",
    },
    amountToPurchase: "כמות לרכישה",
    maxButton: "מקסימום",
    youWillReceive: "תקבל:",
    buyButton: "קנה ACE",
    aceBalance: "יתרת ACE:",
    referralProgram: "תוכנית הפניה",
    referralInfo:
      "הפנה אחרים וקבל 10% מה-ETH שלהם. כל המשפיענים מקבלים קישורים ייחודיים המושכים עד 30% תשואה ב-ETH על כל ההפניות.",
    totalReferrals: "סך ההפניות:",
    totalEarnings: "סך הרווחים:",
    collectEthButton: "אסוף ETH",
  },
  ru: {
    title: "Предпродажа токенов Ace",
    navbar: {
      stake: "Стейкинг",
      games: "Игры",
      trade: "Торговля",
    },
    languages: {
      en: "Английский",
      ja: "Японский",
      pt: "Португальский",
      he: "Иврит",
      ru: "Русский",
    },
    connectWallet: "Подключить кошелек",
    buyAce: "КУПИТЬ ACE",
    yourBalance: "Ваш баланс:",
    tokenInfo: {
      token: "Токен:",
      tokenName: "Токен Ace",
      price: "Цена:",
      minPurchase: "Мин. покупка:",
    },
    amountToPurchase: "Сумма для покупки",
    maxButton: "МАКС",
    youWillReceive: "Вы получите:",
    buyButton: "Купить ACE",
    aceBalance: "Баланс ACE:",
    referralProgram: "Реферальная программа",
    referralInfo:
      "Приглашайте других и зарабатывайте 10% их ETH. Все инфлюенсеры получают уникальные ссылки, которые приносят до 30% возврата ETH со всех рефералов.",
    totalReferrals: "Всего рефералов:",
    totalEarnings: "Общий заработок:",
    collectEthButton: "Собрать ETH",
  },
};

function updateLanguage(lang) {
  const content = translations[lang];

  // Update page title
  document.title = content.title;

  // Update navbar items
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks[0].textContent = content.navbar.stake;
  navLinks[1].textContent = content.navbar.games;
  navLinks[2].textContent = content.navbar.trade;

  // Update language selector options
  const languageSelect = document.getElementById("languageSelect");
  for (let i = 0; i < languageSelect.options.length; i++) {
    const option = languageSelect.options[i];
    option.text = content.languages[option.value];
  }

  // Set the selected language
  languageSelect.value = lang;

  // Update connect wallet buttons
  document
    .querySelectorAll(
      ".connect-wallet, #connectWalletBtn, #headerConnectWalletBtn"
    )
    .forEach((el) => {
      el.textContent = content.connectWallet;
    });

  // Update "BUY ACE" text
  document.querySelector(".card-header h2").textContent = content.buyAce;

  // Update balance text
  document.querySelector(
    ".balance"
  ).textContent = `${content.yourBalance} 0.0000 ETH`;

  // Update token info
  const tokenInfo = document.querySelector(".token-details");
  tokenInfo.innerHTML = `
      <strong>${content.tokenInfo.token}</strong> ${content.tokenInfo.tokenName}<br>
      <strong>${content.tokenInfo.price}</strong> 250000 ACE = 0.005 ETH<br>
      <strong>${content.tokenInfo.minPurchase}</strong> 250000 ACE
    `;

  // Update input placeholder
  document.querySelector(".purchase-input").placeholder =
    content.amountToPurchase;

  // Update MAX button
  document.querySelector(".max-button").textContent = content.maxButton;

  // Update "You will receive" text
  document.querySelector(
    ".amount-to-receive"
  ).textContent = `${content.youWillReceive} 0 ACE`;

  // Update Buy button
  document.querySelector(".buy-button").textContent = content.buyButton;

  // Update ACE Balance text
  document.querySelector(
    ".ace-balance"
  ).textContent = `${content.aceBalance} 0.0000 ACE`;

  // Update Referral Program section
  document.querySelector(".earnings-title").textContent =
    content.referralProgram;
  document.querySelector(".info-tooltip").textContent = content.referralInfo;
  document.querySelector("#totalReferrals").previousElementSibling.textContent =
    content.totalReferrals;
  document.querySelector("#totalEarnings").previousElementSibling.textContent =
    content.totalEarnings;
  document.querySelector(".collect-eth-button").textContent =
    content.collectEthButton;
}

// Initial language setup
document.addEventListener("DOMContentLoaded", function () {
  const userLang = navigator.language || navigator.userLanguage;
  const defaultLang = userLang.split("-")[0]; // This gets the primary language code
  if (translations[defaultLang]) {
    updateLanguage(defaultLang);
  } else {
    updateLanguage("en"); // Fallback to English if user's language is not supported
  }
});

// Add event listener to language selector
document
  .getElementById("languageSelect")
  .addEventListener("change", function () {
    updateLanguage(this.value);
  });
