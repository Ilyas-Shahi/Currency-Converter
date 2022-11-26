const fromName = document.querySelectorAll('.from-name');
const toName = document.querySelectorAll('.to-name');

const form = document.querySelector('form');
const amount = document.querySelector('#amount');
const from = document.querySelector('#from');
const swap = document.querySelector('#swap');
const to = document.querySelector('#to');
const totalAmount = document.querySelector('#total-amount');
const convertedAmount = document.querySelector('#converted-amount');
const exchange = document.querySelector('#exchange');
const exchangeRate = exchange.querySelector('.exchange-rate');
const fromShortName = exchange.querySelector('.from-short_name');
const toShortName = exchange.querySelector('.to-short_name');

const convertBtn = document.querySelector('.convert-btn');

runFunction();

convertBtn.addEventListener('click', runFunction);
amount.addEventListener('input', runFunction);
from.addEventListener('change', runFunction);
to.addEventListener('change', runFunction);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  runFunction();
});

swap.addEventListener('click', () => {
  let temp;
  temp = from.value;
  from.value = to.value;
  to.value = temp;
  runFunction();
});

function getCurrencyNames() {
  const fromLocale = Number().toLocaleString('en-US', {
    style: 'currency',
    currency: from.value,
    currencyDisplay: 'name',
  });
  const toLocale = Number().toLocaleString('en-US', {
    style: 'currency',
    currency: to.value,
    currencyDisplay: 'name',
  });

  const fromNames = fromLocale
    .split(' ')
    .filter((z) => z !== '0.00')
    .join(' ');
  const toNames = toLocale
    .split(' ')
    .filter((z) => z !== '0.00')
    .join(' ');

  console.log(fromNames);
  console.log(toNames);

  fromName.forEach((n) => {
    n.textContent = fromNames;
  });
  fromShortName.textContent = from.value;

  toName.forEach((n) => {
    n.textContent = toNames;
  });
  toShortName.textContent = to.value;
}

async function getExchangeRate() {
  if (amount.value <= 1) {
    exchange.style.display = 'none';
  } else {
    exchange.style.display = 'block';
  }

  async function fetchRate() {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${from.value}`
    );

    console.log(response);

    const data = await response.json();

    console.log(data);
    console.log();

    for (const symbol in data.rates) {
      if (symbol === to.value) {
        return data.rates[symbol];
      }
    }

    // return data.response[0].c;
  }

  const excRate = await fetchRate();

  console.log(excRate);

  totalAmount.textContent = amount.value;

  convertedAmount.textContent = Number(amount.value * excRate).toFixed(4);

  exchangeRate.textContent = excRate;
}

function runFunction() {
  getCurrencyNames();
  getExchangeRate();
}
