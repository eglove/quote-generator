const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
	if(!loader.hidden) {
		quoteContainer.hidden = false;
		loader.hidden = true;
	}
}

async function getQuote() {
	showLoadingSpinner();
	const apiUrl = 'https://staging.quotable.io/random';

	try {
		const response = await fetch(apiUrl);
		const data = await response.json();

		if(data.author) {
			authorText.innerText = data.author;
		} else {
			authorText.innerText = 'Unknown';
		}

		// Reduce font size for long quotes
		if(data.length > 120) {
			quoteText.classList.add('long-quote');
		} else {
			quoteText.classList.remove('long-quote');
		}

		quoteText.innerText = data.content;

		removeLoadingSpinner();
	} catch (e) {
		authorText.innerText = '';
		quoteText.innerText = 'Error! Try Again!';
	}
}

function tweetQuote() {
	const quote = quoteText.innerText;
	const author = authorText.innerText;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
	window.open(twitterUrl, '_blank');
}

newQuoteButton.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);

getQuote();
