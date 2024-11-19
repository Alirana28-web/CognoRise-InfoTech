const amountInput = document.getElementById("amount");
const fromCurrencySelect = document.getElementById("fromCurrency");
const toCurrencySelect = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const resultDisplay = document.getElementById("result");

// API URL for fetching exchange rates
const API_URL = "https://api.exchangerate-api.com/v4/latest/USD";
console.log(API_URL)
async function fetchCurrencies() {
    const response = await fetch(API_URL);
    const data = await response.json();
    const currencies = Object.keys(data.rates);

    // Populate the dropdowns
    currencies.forEach(currency => {
        const optionFrom = document.createElement("option");
        optionFrom.value = currency;
        optionFrom.textContent = currency;
        fromCurrencySelect.appendChild(optionFrom);

        const optionTo = document.createElement("option");
        optionTo.value = currency;
        optionTo.textContent = currency;
        toCurrencySelect.appendChild(optionTo);
    });
}

async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (isNaN(amount) || amount <= 0) {
        resultDisplay.textContent = "Please enter a valid amount.";
        return;
    }

    try {
        const response = await fetch(`${API_URL}`);
        const data = await response.json();
        const fromRate = data.rates[fromCurrency];
        const toRate = data.rates[toCurrency];

        const convertedAmount = (amount / fromRate) * toRate;
        resultDisplay.textContent = `Converted Amount: ${convertedAmount.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        resultDisplay.textContent = "Error fetching exchange rates.";
    }
}

convertBtn.addEventListener("click", convertCurrency);

fetchCurrencies();
