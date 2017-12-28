
const raw_data = [{
    "id": "bitcoin",
    "name": "Bitcoin",
    "symbol": "BTC",
    "price_usd": ""
}, {
    "id": "ethereum",
    "name": "Ethereum",
    "symbol": "ETH",
    "price_usd": 345.99
}, {
    "id": "etc",
    "name": "Ethereum Classic",
    "symbol": "ETC",
    "price_usd": ""
}, {
    "id": "litecoin",
    "name": "Litecoin",
    "symbol": "LTC",
    "price_usd": ""
}]

const getRandomNumber = (min, max) => (Math.floor(Math.random() * (max - min + 1)) + min);

function getMarketData() {
    return {
        "data": raw_data.map((item) => {
            item = Object.assign({}, item);
            if (!item["price_usd"]) {
                item["price_usd"] = getRandomNumber(100, 1000000) / 100;
            }
            return item;
        })
    }
}

export { getMarketData };