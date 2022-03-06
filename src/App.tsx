import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./App.css";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [showContent, setShowContent] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = () => {
    fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
      headers: {
        "x-rapidapi-host": "quotes15.p.rapidapi.com",
        "x-rapidapi-key": "2a0f2122ccmsh4c64d2cef70c8c6p1f96acjsnbd8e67cb13d7",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res && res.originator) {
          setQuote(res.content);
          setAuthor(res.originator.name);
        }
      });
  };

  const handleClick = () => {
    if (!isFetching) {
      fetchQuote();
      setIsFetching(true);
      setShowContent(false);
      setTimeout(() => {
        setIsFetching(false);
        setShowContent(true);
      }, 1000);
    }
  };

  return (
    <div className="App">
      <button onClick={handleClick}>New quote</button>
      <CSSTransition
        in={showContent}
        timeout={1000}
        classNames="content"
        unmountOnExit
      >
        <div>
          <q>{quote}</q>
          <p>{author}</p>
        </div>
      </CSSTransition>
    </div>
  );
}

export default App;
