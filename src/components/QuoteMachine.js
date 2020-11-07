import React, { useState, useEffect } from 'react';
import axios from 'axios';

function QuoteMachine() {
  const [theme, setTheme] = useState('theme1');
  const [randomQuote, setRandomQuote] = useState('');
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const getQuote = async () => {
      const response = await axios.get(
        'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
      );
      const newQuote =
        response.data.quotes[getRandomNumber(response.data.quotes.length)];
      setRandomQuote(newQuote);
    };
    getQuote();
    setTrigger(false);
  }, [trigger]);

  const getNewQuote = () => {
    setTrigger(true);
    switchTheme();
  };

  const getRandomNumber = (max, min = 0) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const switchTheme = () => {
    const themeCount = 12;
    const randomTheme = `theme${getRandomNumber(themeCount)}`;
    setTheme(randomTheme);
  };

  const { quote, author } = randomQuote;
  return (
    <div id="wrapper" className={theme}>
      <div id="quote-box">
        <blockquote>
          <p id="text">{quote}</p>
          <p id="author">- {author}</p>
        </blockquote>
        <a href="twitter.com/intent/tweet" id="tweet-quote">
          <i className="icon fab fa-twitter-square"></i>
        </a>
        <button
          onClick={() => getNewQuote()}
          id="new-quote"
          className="btn btn-primary"
        >
          New Quote
        </button>
      </div>
    </div>
  );
}

export default QuoteMachine;
