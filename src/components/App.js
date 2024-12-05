import React, { useEffect, useState } from "react";
import "./../styles/App.css";
import axios from "axios";

const App = () => {
  const [searchItem, setSeachItem] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(false);

  function handleApi() {
    axios
      .get("http://www.omdbapi.com", {
        params: {
          apikey: "99eb9fd1",
          s: userInput,
        },
      })
      .then((response) => {
        if (response.data.Search && response.data.Search.length > 0) {
          setSeachItem(response.data.Search);
        } else {
          setSeachItem([]);
          setError(true);
        }
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (userInput) {
      handleApi();
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Search Movie</p>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value.toLowerCase())}
        />
        <button>Search</button>
      </form>
      <div>
        {searchItem.length > 0 ? (
          <ul>
            {searchItem.map((item) => (
              <div key={item.imdbID}>
                <li>
                  {item.Title} {item.Year}
                </li>
                <div className="img-box">
                  <img src={item.Poster} alt={item.Title} />
                </div>
              </div>
            ))}
          </ul>
        ) : (
          error && <p>Invalid movie name. Try again</p>
        )}
      </div>
    </div>
  );
};

export default App;
