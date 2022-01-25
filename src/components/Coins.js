import { useEffect, useState } from "react";

function App() {
    const [loading, setLoding] = useState(true);
    const [coins, setCoins] = useState([]);
    const [myMoney, setMymoney] = useState(0);
    const [coinP, setCoinP] = useState(1);
    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers")
            .then((response) => response.json())
            .then((json) => {
                setCoins(json);
                setLoding(false);
            });
    }, []);

    const moneyChange = (event) => setMymoney(event.target.value);
    const onToCoinChange = (event) => setCoinP(event.target.value);
    console.log(myMoney, coinP);

    return (
        <div>
            <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>

            {loading ? (
                <strong>Loding...</strong>
            ) : (
                <div>
                    <label id="myMoney">My Money</label>
                    <input
                        value={myMoney}
                        onChange={moneyChange}
                        id="myMoney"
                        type="text"
                    />
                    <label id="toCoin">To Coin</label>
                    <input
                        value={myMoney / coinP}
                        id="toCoin"
                        type="text"
                        disabled="true"
                    />
                    <br />
                    <select onChange={onToCoinChange}>
                        <option key="default" value="1">코인을 선택하세요.</option>
                        {coins.map((coin) => (
                            <option key={coin.id} value={coin.quotes.USD.price}>
                                {coin.name}({coin.symbol}): ${coin.quotes.USD.price} USD
                            </option>
                        ))}
                    </select>
                </div>
            )}

        </div>
    );
}

export default App;
