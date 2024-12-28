import React, { useState, useEffect } from 'react';
import './QuoteBox.css';

const QuoteBox = () => {
  // States for Quote and Author
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  // API for quotes
  const QUOTE_API = 'https://type.fit/api/quotes';

  // Fetch random quote
  const fetchRandomQuote = async () => {
    try {
      const response = await fetch(QUOTE_API);
      const quotes = await response.json();
      const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomIndex];

      setQuote(randomQuote.text);
      setAuthor(randomQuote.author || 'Unknown');
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  // Fetch quote on load
  useEffect(() => {
    fetchRandomQuote();
  }, []);

  // Handle New Quote button
  const handleNewQuote = () => {
    fetchRandomQuote();
  };

  // Tweet URL
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `"${quote}" - ${author}`
  )}`;

  return (
    <div id="quote-box">
      <div id="text">"{quote}"</div>
      <div id="author">- {author}</div>
      <button id="new-quote" onClick={handleNewQuote}>
        New Quote
      </button>
      <a id="tweet-quote" href={tweetUrl} target="_blank" rel="noopener noreferrer">
        Tweet
      </a>
    </div>
  );
};

export default QuoteBox;
