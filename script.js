// Variables for html elements
const quoteContainer = document.getElementById('quote-container'); 
const quoteText = document.getElementById('quote'); 
const authorText = document.getElementById('author'); 
const twitterBtn = document.getElementById('twitter'); 
const newQuoteBtn = document.getElementById('new-quote'); 

// Get quote from API 
async function getQuote() {
    const proxyURL = 'https://cors-anywhere.herokuapp.com/'; 
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'; 
    try {
        const response = await fetch(proxyURL + apiURL); 
        const data = await response.json(); 
        // Reduce font-size for long quotes
        if (data.quoteText.length >= 120) {
            quoteText.classList.add('long-quote'); 
        } else {
            quoteText.classList.remove('long-quote'); 
        }
        quoteText.innerText = data.quoteText; 
        // If author is blank, add Unknown 
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown'; 
        } else {
            authorText.innerText = data.quoteAuthor;  
        }
        
    } catch (error) {
        getQuote(); 
    }
}; 

function tweet() {
    const quote = quoteText.innerText; 
    const author = authorText.innerText; 
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`; 
    // Open in a new tab 
    window.open(twitterURL, '_blank'); 
}

newQuoteBtn.addEventListener('click', (e) => {
    getQuote(); 
}); 

twitterBtn.addEventListener('click', (e) => {
    tweet(); 
})

getQuote(); 

