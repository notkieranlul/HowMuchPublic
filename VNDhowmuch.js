const fromSelect = document.querySelector('[name="from_currency"]');
const fromInput = document.getElementById('from_amount');
const toSelect = document.querySelector('[name="to_currency"]');
const toEl = document.querySelector('.to_amount');
const form = document.querySelector('.app form');
var mykey = config.MY_KEY;
const endpoint = 'https://api.exchangeratesapi.io/v1/latest?access_key=' + mykey;
const ratesByBase = {};

// sets the input currency to GBP
const currencies = {
  GBP: 'British Pound Sterling',
};

// sets the output currency to VND
const currencies1 = {
    VND: 'Vietnamese Dong',
  };

// mapping the currency codes with the currency names
function generateOptions(options) {
  return Object.entries(options)
    .map(
      ([currencyCode, currencyName]) =>
        `<option value="${currencyCode}">${currencyCode} - ${currencyName}</option>`
    )
    .join('');
}

// getting the exchange rates from the api with the base rate set as GBP
async function fetchRates(base = 'GBP') {
  const res = await fetch(`${endpoint}&base=${base}`);
  const rates = await res.json();
  return rates;
}

async function convert(amount, from, to) {
  // checking if the rates to convert from that currency have already been stored (FUTURE USE)
  if (!ratesByBase[from]) {
    console.log(
      `Oh no, we dont have ${from} to convert to ${to}. So gets go get it!`
    );
    const rates = await fetchRates(from);
    console.log(rates);
    // storing the rates for later use (FUTURE USE)
    ratesByBase[from] = rates;
  }
  // converting the GBP inputted into VND
  const rate = ratesByBase[from].rates[to];
  const convertedAmount = rate * amount;
  console.log(`${amount} ${from} is ${convertedAmount} in ${to}`);
  return convertedAmount;
}

// adding the currency to the amount in order to output the total
function formatCurrency(amount, currency) {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}
async function handleInput(e) {
  const rawAmount = await convert(
    fromInput.value,
    fromSelect.value,
    toSelect.value
  );
  toEl.textContent = formatCurrency(rawAmount, toSelect.value);
}

const optionsHTML = generateOptions(currencies);
// populate the options elements (already set to GBP be default)
fromSelect.innerHTML = optionsHTML;

const optionsHTML1 = generateOptions(currencies1);
// populate the options elements (already set to VND be default)
toSelect.innerHTML = optionsHTML1;

form.addEventListener('input', handleInput);