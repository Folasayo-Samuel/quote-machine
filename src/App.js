// import { Link } from "react-router-dom";
import $ from "jquery";
import "./App.scss";

const styles = {
  fontWeight: "bolder",
};

const projectName = "random-quote-machine";
let quotesData;

const colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
];
let currentQuote = "",
  currentAuthor = "";

function getQuotes() {
  return $.ajax({
    headers: {
      Accept: "application/json",
    },
    url: "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json",
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === "string") {
        quotesData = JSON.parse(jsonQuotes);
        console.log("quotesData");
        console.log(quotesData);
      }
    },
  });
}

function getRandomQuote() {
  return quotesData.quotes[
    Math.floor(Math.random() * quotesData.quotes.length)
  ];
}

function getQuote() {
  let randomQuote = getRandomQuote();

  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;

  $("#tweet-quote").attr(
    "href",
    "https://www.twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
      encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
  );

  $("#tumblr-quote").attr(
    "href",
    "http://www.facebook.com/sharer.php?u=http%3A%2F%2Fquotemachine.com%2Fcontent+of+my+page" +
      encodeURIComponent(currentAuthor) +
      "&content=" +
      encodeURIComponent(currentQuote) +
      "&canonicalUrl=http://www.facebook.com/sharer.php?u=http%3A%2F%2Fquotemachine.com%2Fcontent+of+my+page"
  );

  $(".quote-text").animate({ opacity: 1 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $("#text").text(randomQuote.quote);
  });

  $(".quote-author").animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $("#author").html(randomQuote.author);
  });

  let color = Math.floor(Math.random() * colors.length);
  $("html body").animate(
    {
      backgroundColor: colors[color],
      color: colors[color],
    },
    1000
  );
  $(".button").animate(
    {
      backgroundColor: colors[color],
    },
    1000
  );
}

$(document).ready(function () {
  getQuotes().then(() => {
    getQuote();
  });

  $("#new-quote").on("click", getQuote);
});

function App() {
  return (
    <div id="wrapper" className="App">
      <div id="quote-box">
        <div className="quote-text">
          <i className="fa fa-quote-left"></i>
          <span id="text"></span>
        </div>
        <div className="quote-author">
          - <span id="author"></span>
        </div>
        <div className="buttons">
          <a
            className="button"
            id="tweet-quote"
            title="Tweet this quote!"
            target="top"
          >
            <i className="fa fa-twitter"></i>
          </a>
          <a
            className="button"
            id="tumblr-quote"
            title="Post this quote on tumblr!"
            target="_blank"
          >
            <i className="fa fa-facebook"></i>
          </a>
          <button className="button" id="new-quote" style={styles}>
            New quote
          </button>
        </div>
      </div>
      <div className="footer">by Folasayo Samuel</div>
    </div>
  );
}

export default App;
