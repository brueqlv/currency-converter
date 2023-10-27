var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from 'node-fetch';
import prompts from 'prompts';
const fetchExchangeRates = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch('https://api.coingecko.com/api/v3/exchange_rates');
    const data = (yield response.json());
    const exchangeRates = [];
    Object.entries(data.rates).forEach((exchangeRate) => {
        exchangeRates.push({
            symbol: exchangeRate[0],
            name: exchangeRate[1].name,
            value: exchangeRate[1].value
        });
    });
    return exchangeRates;
});
const app = () => __awaiter(void 0, void 0, void 0, function* () {
    const exchangeRates = yield fetchExchangeRates();
    //console.log(exchangeRates);
    const response = yield prompts([
        {
            type: 'select',
            name: 'fromCurrency',
            message: 'Select currency to convert from?',
            choices: exchangeRates.map((exchangeRate) => {
                return {
                    title: exchangeRate.name,
                    value: exchangeRate
                };
            })
        },
        {
            type: 'number',
            name: 'amount',
            message: 'How much?'
        },
        {
            type: 'select',
            name: 'toCurrency',
            message: 'Select currency to convert from?',
            choices: exchangeRates.map((exchangeRate) => {
                return {
                    title: exchangeRate.name,
                    value: exchangeRate
                };
            })
        }
    ]);
    const btcValue = response.amount / response.fromCurrency.value;
    const endCurrencyValue = response.toCurrency.value * btcValue;
    console.log(`From (${response.fromCurrency.symbol}) with amount of ${response.amount} we got ${btcValue} BTC that is equal tp ${response.toCurrency.symbol} / with amount: ${endCurrencyValue}`);
});
app();
