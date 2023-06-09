// Define API endpoint and DOM elements
const apiEndpoint = 'https://script.google.com/macros/s/AKfycbwd6T2yIHT0e0ifSgVrf5yAIB1A24ata21InKodZeLISG8IWf6jNLd59kNCk9AbPYGz/exec';
const search = document.getElementById('library-search');
const librarySearchBtn = document.getElementById('library-search-btn');
const display = document.getElementById('display');
const loader = document.getElementById('loader');
const displaySearchSummary = document.getElementById('search-summary');
const randomBtn = document.getElementById('random-btn');
const exportBtn = document.getElementById('export-btn');

// Get search terms from URL and display in search bar
const searchURL = window.location.href;
const searchParams = new URL(searchURL).searchParams;
const indexURLSearchTerms = new URLSearchParams(searchParams).values();
const indexSearchTermsArray = Array.from(indexURLSearchTerms); 
const indexSearchTerms = indexSearchTermsArray.join(' ');
search.value = indexSearchTerms;

// Removes diacritics from strings
function removeDiacritics(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Fetch data from Google Sheets API
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


function displayData(data, searchQuery) {
    storeData(data);
    // Generate HTML for filtered data and display on the page
    let counter = 1;
    let dataDisplay = data.map((object)=>{
        return `
        <div class="resource">
            <div class="heading">
                <h2><a target="blank" href="${object.URL}"><span class="counter">${counter++}. </span>${object.Resource_Title}</a></h2>
                <p class="institution">${object.Institutional_Host}</p>
                <p><span class="inline-label">Broad Subject Areas: </span>${object.Broad_Subject_Categories}</p>
                <p><span class="inline-label">Country: </span>${object.Country_Coverage}</p>
                <p><span class="inline-label">Resource Types: </span>${object.Resource_Type}</p>
            </div>
            <button aria-label="Expand Details" class="resource-accordion">Details <i class="fa-solid fa-caret-down"></i></button>
            <div class="resource-panel">
                <div class="field">
                    <p class="label">Summary:</p>
                    <p class="value">${object.Summary}</p>
                </div>
                <div class="field">
                    <p class="label">Languages:</p>
                    <p class="value">${object.Language}</p>
                </div>
                <div class="field">
                    <p class="label">Subjects in English:</p>
                    <p class="value">${object.Subjects_English}</p>
                </div>
                <div class="field">
                    <p class="label">Materias en Español:</p>
                    <p class="value">${object.Subjects_Spanish}</p>
                </div>
                <div class="field">
                    <p class="label">Assuntos em Português:</p>
                    <p class="value">${object.Subjects_Portuguese}</p
                </div>
                <div class="field">
                    <p class="label">Specific Formats:</p>
                    <p class="value">${object.Specific_Formats}</p>
                </div>
                <div class="field">
                    <p class="label">Geographical Area Coverage:</p>
                    <p class="value">${object.Geographical_Area_Coverage}</p>
                </div>
                <div class="field">
                    <p class="label">Time Coverage:</p>
                    <p class="value">${object.Time_Coverage}</p>
                </div>
            </div>
        </div>
        `
    }).join('');

    // Print data to HTML
    display.innerHTML = dataDisplay;

    if (searchQuery === '') {
        displaySearchSummary.textContent = `Showing all ${data.length} records.`;
    } else {
        displaySearchSummary.textContent = `A search for \u{201C}${searchQuery}\u{201D} returned ${data.length} result${data.length !== 1 ? 's' : ''}.`;
    }

    // Accordion for extended resource records display
    var acc = document.getElementsByClassName("resource-accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("resource-accordion-active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
        panel.style.display = "none";
        } else {
        panel.style.display = "block";
        }
    });
    }

    // Show display
    display.style.display = "block";
}


// Filter data based on search parameters
async function filterData(url, searchQuery, selectedField) {
    // Show loading animation
    loader.style.display = 'block';
    display.style.display = 'none';

    // Fetch data from API
    const payload = await fetchData(url);

    if (!searchQuery) {
        // If no search query provided, return all data
        loader.style.display = 'none';
        displayData(payload, '');
        return;
    }

    const searchTerms = searchQuery.toLowerCase().split(/\s+/).map(term => removeDiacritics(term));
    const filteredData = payload.filter(eventData => {
        if (!searchQuery) {
            return true;
        } else {
            if (selectedField === 'subject') {
                return searchTerms.every(term => {
                    return [
                        eventData.Subjects_English,
                        eventData.Subjects_Spanish,
                        eventData.Subjects_Portuguese,
                        eventData.Broad_Subject_Categories
                    ].some(value => {
                        return value && removeDiacritics(value.toString().toLowerCase()).includes(term);
                    });
                });
            } else if (selectedField === 'format') {
                return searchTerms.every(term => {
                    return [
                        eventData.Resource_Type,
                        eventData.Specific_Formats
                    ].some(value => {
                        return value && removeDiacritics(value.toString().toLowerCase()).includes(term);
                    });
                });
            } else {
                return searchTerms.every(term => {
                    return Object.values(eventData).some(value => {
                        return value && removeDiacritics(value.toString().toLowerCase()).includes(term);
                    });
                });
            }
        }
    });

    // Hide loader
    loader.style.display = 'none';

    // Display filtered data
    displayData(filteredData, searchQuery);
}




async function getRandomResource() {
    // Show loading animation
    loader.style.display = 'block';
    display.style.display = 'none';

    const data = await fetchData(apiEndpoint);
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomResource = data[randomIndex]
    displayData([randomResource], randomResource.Resource_Title)

    const newURL = new URL(window.location.href);
    newURL.searchParams.set('q', randomResource.Resource_Title);
    window.history.pushState(null, '', newURL);

    // Hide loader
    loader.style.display = 'none';
  }

// Add an event listener to the button element
randomBtn.addEventListener('click', async () => {
    // Call the getRandomItem function and log the result
    const randomItem = await getRandomResource();
  });


// Filter data based on search query from URL or search bar input
function runSearch(selectedField) {
    const searchQuery = search.value.trim();
    filterData(apiEndpoint, searchQuery, selectedField);

    // Update URL with search query
    const newURL = new URL(window.location.href);
    newURL.searchParams.set('q', searchQuery);
    window.history.pushState(null, '', newURL);
}


// Event listener for librarySearchBtn click
librarySearchBtn.addEventListener('click', () => {
    const selectedField = document.getElementById('field-selector').value;
    runSearch(selectedField);
});

// Event listener for search input keypress
search.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const selectedField = document.getElementById('field-selector').value;
        runSearch(selectedField);
    }
});


// Run initial search based on URL search terms
filterData(apiEndpoint, searchParams.get('q'));

// Export to a JSON file functionality
async function storeData(data) {
    const dataAsString = JSON.stringify(data);
    sessionStorage.setItem('data', dataAsString);
}

exportBtn.addEventListener('click', exportJSON);

function exportJSON() {
    const data = JSON.parse(sessionStorage.getItem('data'));
    const jsonData = JSON.stringify(data, null, 2);
  
    const file = new Blob([jsonData], {type: 'application/json'});
  
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = 'lacli-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  