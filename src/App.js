import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [targetCoin, setTargetCoin] = useState("0");
  const [result, setResult] = useState("0");

  const onChange = (event) => {
    setTargetCoin(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const priceUSD = event.target[0].value;
    calculate(priceUSD);
  };

  const calculate = (priceUSD) => {
    setResult(priceUSD * targetCoin);
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=100")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setCoins(json);
        setLoading(false);
        setTargetCoin(json[0].quotes.USD.price);
      });
  }, []);

  return (
    <div>
      <h1>The Coins! ({coins.length})</h1>
      {loading ? <strong>Loading...</strong> : null}
      <select value={targetCoin} onChange={onChange}>
        {coins.map((coin, index) => (
          <option key={index} value={coin.quotes.USD.price}>
            {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
          </option>
        ))}
      </select>
      <form onSubmit={onSubmit}>
        <input type="number" step="any" placeholder="Write Coins"></input>
        <button>Change !!</button>
      </form>
      <h2>RESULT : {result} USD !!</h2>
    </div>
  );
}

export default App;
