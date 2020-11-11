import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Transition } from 'react-transition-group';
import axios from 'axios';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  transition: 1s;
  background-color: ${(props) => props.theme.main};
`;

const QuoteBox = styled.div`
  background: #fff;
  padding: 2em;
  width: 500px;
  border-radius: 3px;
`;

const QuoteText = styled.p`
  position: relative;

  &:before {
    position: absolute;
    top: -20px;
    left: -30px;
    content: '"';
    font-size: 5em;
  }
`;
const QuoteAuthor = styled.p`
  text-align: right;
`;
const ButtonBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  cursor: pointer;
  display: inline-block;
  border: none;
  width: 10em;
  height: auto;
  outline: none;
  transition: 1s;
  background: ${(props) => props.theme.main};
  color: #fff;
`;

const Icon = styled.a`
  transition: 1s;
  color: ${(props) => props.theme.main};
  display: inline-block;
  font-size: 3em;
`;

const colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#fb6964',
  '#342224',
  '#472e32',
  '#bdbb99',
  '#77b1a9',
  '#73a857',
];

const getRandomNumber = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min) + min);
};

function QuoteMachine() {
  const [color, setColor] = useState(colors[getRandomNumber(colors.length, 0)]);
  const [theme, setTheme] = useState({
    main: color,
  });
  const [randomQuote, setRandomQuote] = useState('');
  const [trigger, setTrigger] = useState(false);
  const [cache, setCache] = useState([]);

  useEffect(() => {
    const getQuote = async () => {
      if (!cache.length) {
        const response = await axios.get(
          'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
        );
        const newQuote =
          response.data.quotes[getRandomNumber(response.data.quotes.length)];
        setRandomQuote(newQuote);
        setCache(response.data.quotes);
      } else {
        const newQuote = cache[getRandomNumber(cache.length)];
        setRandomQuote(newQuote);
      }
    };
    getQuote();
    setTrigger(false);
  }, [trigger]);

  const getNewQuote = () => {
    setTrigger(true);
    setColor(colors[getRandomNumber(colors.length, 0)]);
    setTheme({
      main: color,
    });
  };

  const { quote, author } = randomQuote;
  return (
    <Transition in={theme} timeout={1000}>
      <ThemeProvider theme={theme}>
        <Wrapper>
          <QuoteBox id="quote-box">
            <blockquote>
              <QuoteText id="text">{quote}</QuoteText>
              <QuoteAuthor id="author">- {author}</QuoteAuthor>
            </blockquote>
            <ButtonBlock>
              <a href="twitter.com/intent/tweet" id="tweet-quote">
                <Icon as="i" className="fab fa-twitter-square"></Icon>
              </a>
              <Button
                onClick={() => getNewQuote()}
                id="new-quote"
                // className="btn btn-primary"
              >
                New Quote
              </Button>
            </ButtonBlock>
          </QuoteBox>
        </Wrapper>
      </ThemeProvider>
    </Transition>
  );
}

export default QuoteMachine;
