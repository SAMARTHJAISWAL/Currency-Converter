// Free, keyless exchange-rate API by fawazahmed0:
// https://github.com/fawazahmed0/exchange-api
// The primary URL is served by jsDelivr; the second is the project's documented fallback.
const API_URLS = [
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies",
  "https://latest.currency-api.pages.dev/v1/currencies",
];

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form .convert");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const swapBtn = document.querySelector(".swap");
const amountInput = document.querySelector(".amount input");
const msg = document.querySelector(".msg");

for (const select of dropdowns) {
  for (const currCode in countryList) {
    const newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = true;
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Fetch the rate table for `base`, trying each API URL in turn.
const fetchRates = async (base) => {
  let lastError;
  for (const url of API_URLS) {
    try {
      const response = await fetch(`${url}/${base}.json`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return data[base];
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
};

const updateExchangeRate = async () => {
  let amtVal = parseFloat(amountInput.value);
  if (Number.isNaN(amtVal) || amtVal <= 0) {
    amtVal = 1;
    amountInput.value = "1";
  }

  const from = fromCurr.value.toLowerCase();
  const to = toCurr.value.toLowerCase();
  msg.innerText = "Getting exchange rate...";

  try {
    const rates = await fetchRates(from);
    const rate = rates && rates[to];
    if (typeof rate !== "number") {
      msg.innerText = `No rate available for ${fromCurr.value} to ${toCurr.value}.`;
      return;
    }
    const finalAmount = (amtVal * rate).toLocaleString(undefined, {
      maximumFractionDigits: 4,
    });
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (err) {
    console.error(err);
    msg.innerText = "Could not fetch exchange rates. Please try again later.";
  }
};

const updateFlag = (element) => {
  const currCode = element.value;
  const countryCode = countryList[currCode];
  const img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
  img.alt = `Flag for ${currCode}`;
};

swapBtn.addEventListener("click", () => {
  [fromCurr.value, toCurr.value] = [toCurr.value, fromCurr.value];
  updateFlag(fromCurr);
  updateFlag(toCurr);
  updateExchangeRate();
});

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
