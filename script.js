// Variables for html elements
const quoteContainer = document.getElementById('quote-container'); 
const quoteText = document.getElementById('quote'); 
const authorText = document.getElementById('author'); 
const twitterBtn = document.getElementById('twitter'); 
const newQuoteBtn = document.getElementById('new-quote'); 
const loader = document.getElementById('loader'); 


function showLoader() {
    loader.hidden = false; 
    quoteContainer.hidden = true; 
}

function hideLoader() {
    if (!loader.hidden) {
        quoteContainer.hidden = false; 
        loader.hidden = true; 
    }
}


// Get quote from API 
async function getQuote() {
    showLoader(); 
    const proxyURL = 'https://cors-anywhere.herokuapp.com/'; 
    const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'; 
    try {
        const response = await fetch(proxyURL + apiURL); 
        const data = await response.json(); 
    
        // If author is blank, add Unknown 
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown'; 
        } else {
            authorText.innerText = data.quoteAuthor;  
        }
        // Reduce font-size for long quotes
        if (data.quoteText.length >= 120) {
            quoteText.classList.add('long-quote'); 
        } else {
            quoteText.classList.remove('long-quote'); 
        }
        quoteText.innerText = data.quoteText; 
        // Stop loader, show quote: 
        hideLoader(); 
    
    } catch (error) {

        quoteText.innerText = 'Sorry, we encountered an error. Please refresh the page to try again.'
        
    }
}; 

// Tweet quote function 
function tweet() {
    const quote = quoteText.innerText; 
    const author = authorText.innerText; 
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`; 
    // Open in a new tab 
    window.open(twitterURL, '_blank'); 
}

// Event listeners 

newQuoteBtn.addEventListener('click', getQuote); 

twitterBtn.addEventListener('click', tweet); 

// Load quote on initial page load
getQuote(); 


