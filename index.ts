import fetch from 'node-fetch';



const app = async () => {
    const response = await fetch('https://api.coingecko.com/api/v3/exchange_rates');
const data = await response.json();

console.log(data);
}

app();

