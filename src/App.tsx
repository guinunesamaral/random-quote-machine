import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./App.css";

/**
 * TODO: Add Twitter integration
 * */
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

  const formatTwitterText = () => {
    return `"${quote}"%0A%0A${author}`;
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
    <div id="quote-box">
      <a
        id="tweet-quote"
        href={`https://twitter.com/intent/tweet?text=${formatTwitterText()}`}
        data-size="large"
        target="_blank"
        rel="noreferrer"
      >
        <div style={{ display: "hidden" }} />
      </a>
      <CSSTransition
        in={showContent}
        timeout={1000}
        classNames="content"
        unmountOnExit
      >
        <div className="content">
          <q id="text">{quote}</q>
          <p id="author">{author}</p>
        </div>
      </CSSTransition>
      <button id="new-quote" onClick={handleClick}>
        New quote
      </button>
    </div>
  );
}

export default App;
