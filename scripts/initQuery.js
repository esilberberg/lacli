// Carries search terms from index.html within the URL to the library.html for initial search

const baseURL = window.location.origin;
const searchURL = `${baseURL}/lacli/library.html?`;

const indexSearchBtn = document.getElementById('index-search-btn');
const indexSearchInput = document.getElementById('index-search');

function initQuery() {
  const userInput = indexSearchInput.value;
  const searchParams = new URLSearchParams();
  searchParams.append('q', userInput);
  const queryString = searchParams.toString();
  window.location.href = searchURL + queryString;
}

// Search when search button is clicked
indexSearchBtn.addEventListener('click', initQuery);

// Search when enter key is pressed
indexSearchInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    initQuery();
  }
});
