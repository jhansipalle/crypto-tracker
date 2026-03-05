import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  const API =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

  // FETCH USING .THEN
  const fetchDataThen = () => {
    fetch(API)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setFilteredData(result);
      })
      .catch((err) => console.log(err));
  };

  // FETCH USING ASYNC AWAIT
  const fetchDataAsync = async () => {
    try {
      const res = await fetch(API);
      const result = await res.json();
      setData(result);
      setFilteredData(result);
    } catch (err) {
      console.log(err);
    }
  };

useEffect(() => {
  fetchDataThen();
}, []);

  // SEARCH
  const handleSearch = () => {
    const filtered = data.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // SORT MARKET CAP
  const sortMarketCap = () => {
    const sorted = [...filteredData].sort(
      (a, b) => b.market_cap - a.market_cap
    );
    setFilteredData(sorted);
  };

  // SORT % CHANGE
  const sortPercentage = () => {
    const sorted = [...filteredData].sort(
      (a, b) =>
        b.price_change_percentage_24h -
        a.price_change_percentage_24h
    );
    setFilteredData(sorted);
  };

  return (
    <div className="container">
      <div className="controls">
        <input
          type="text"
          placeholder="Search By Name or Symbol"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>

        <button onClick={sortMarketCap}>Sort By Market Cap</button>

        <button onClick={sortPercentage}>Sort By Percentage</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Total Volume</th>
            <th>% Change</th>
            <th>Market Cap</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((coin) => (
            <tr key={coin.id}>
              <td>
                <img src={coin.image} alt="" width="28" />
              </td>

              <td>{coin.name}</td>

              <td>{coin.symbol.toUpperCase()}</td>

              <td>${coin.current_price.toLocaleString()}</td>

              <td>${coin.total_volume.toLocaleString()}</td>

              <td
                className={
                  coin.price_change_percentage_24h > 0
                    ? "green"
                    : "red"
                }
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>

              <td>
                Mkt Cap : ${coin.market_cap.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;