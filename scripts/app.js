// Define API endpoint and DOM elements
const apiEndpoint = 'https://script.google.com/macros/s/AKfycbwqOiChg2y2cgk46aFVZ0zFPtR0eiVeUNVQAqmksI31W7yQgXOW4_E4qAHvBbIor8bCJQ/exec';
const search = document.getElementById('library-search');
const librarySearchBtn = document.getElementById('library-search-btn');
const display = document.getElementById('display');
const loader = document.getElementById('loader');
const displaySearchSummary = document.getElementById('search-summary');
const randomBtn = document.getElementById('random-btn');
const exportBtn = document.getElementById('export-btn');
const loadMoreBtn = document.getElementById('loadMore');
let displayedCount = 0; // Track how many data objects are currently displayed
const itemsPerPage = 200; // Number of items to display per page

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
// This is where data is stored to avoid making API calls every search
let initialData = [];

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    initialData = data;
    filterData()  
  } catch (error) {
    alert('Error fetching data');
  }
}

fetchData(apiEndpoint);

let activeDataToDisplay = []

function filterData(searchQuery) {

    const urlSearchParams = new URLSearchParams(window.location.search);
    const urlSearchQuery= urlSearchParams.get('q');

    if (searchQuery) {
        const searchTerms = searchQuery.toLowerCase().split(/\s+/).map(term => removeDiacritics(term));

        const filteredData = initialData.filter(eventData => {
        return searchTerms.every(term => {
            return Object.values(eventData).some(value => {
            return value && removeDiacritics(value.toString().toLowerCase()).includes(term);
            });
        });
        });
        activeDataToDisplay = filteredData;
        displayData(filteredData, searchQuery, displayedCount, refresh=true);
    } else if (urlSearchQuery) {
        const searchTerms = urlSearchQuery.toLowerCase().split(/\s+/).map(term => removeDiacritics(term));
        const filteredData = initialData.filter(eventData => {
        return searchTerms.every(term => {
            return Object.values(eventData).some(value => {
            return value && removeDiacritics(value.toString().toLowerCase()).includes(term);
            });
        });
        });
        activeDataToDisplay = filteredData;
        displayData(filteredData, urlSearchQuery, displayedCount, refresh=true);

    } else {
        activeDataToDisplay = initialData;
        displayData(initialData, '', displayedCount, refresh=true);
    }
}

function runSearch() {
    displayedCount = 0;
    const searchQuery = search.value.trim();
    filterData(searchQuery);

    // Update URL with search query
    const newURL = new URL(window.location.href);
    newURL.searchParams.set('q', searchQuery);
    window.history.pushState(null, '', newURL);
};

// Event listeners for search bar
librarySearchBtn.addEventListener('click', runSearch);
search.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        runSearch();
    }
});

function displayData(data, searchQuery, count, refresh) {
    storeData(data);
    loader.style.display = 'none';

    const paginatedData = data.slice(count, count + itemsPerPage);
    let counter = count + 1;
    let dataDisplay = paginatedData.map((object)=>{
        let creatorsField = object.Creators ? `
        <div class="field">
        <p class="label">Creators:</p>
        <p class="value">${object.Creators}</p>
        </div>
    ` : '';
    
    return `
    <div class="resource">
        <div class="heading">
            <h2><a target="blank" href="${object.URL}"><span class="counter">${counter++}. </span>${object.Resource_Title}</a></h2>
            <p class="institution">${object.Institutional_Hosts}</p>
            <p><span class="inline-label">Broad Subject Areas: </span>${object.Broad_Subject_Areas}</p>
            <p><span class="inline-label">Countries: </span>${object.Countries}</p>
            <p><span class="inline-label">Resource Types: </span>${object.Resource_Types}</p>
        </div>
        <button aria-label="Expand Details" class="resource-accordion">Details <i class="fa-solid fa-caret-down"></i></button>
        <div class="resource-panel">
            <div class="field">
                <p class="label">Summary:</p>
                <p class="value">${object.Summary}</p>
            </div>
            <div class="field">
                <p class="label">Languages:</p>
                <p class="value">${object.Languages}</p>
            </div>
            <div class="field">
                <p class="label">Subjects in English:</p>
                <p class="value">${object.Subjects_in_English}</p>
            </div>
            <div class="field">
                <p class="label">Materias en Español:</p>
                <p class="value">${object.Materias_en_Espanol}</p>
            </div>
            <div class="field">
                <p class="label">Assuntos em Português:</p>
                <p class="value">${object.Assuntos_em_Portugues}</p
            </div>
            <div class="field">
                <p class="label">Specific Formats:</p>
                <p class="value">${object.Specific_Formats}</p>
            </div>
            <div class="field">
                <p class="label">Geographical Area:</p>
                <p class="value">${object.Geographical_Area}</p>
            </div>
            <div class="field">
                <p class="label">Time Coverage:</p>
                <p class="value">${object.Time_Coverage}</p>
            </div>
            ${creatorsField}
        </div>
    </div>
    `
    }).join('');

    // Print data to DOM
    if (refresh === true) {
        display.innerHTML = dataDisplay;
    }   else {
        display.innerHTML += dataDisplay;
    }

    if (displayedCount < activeDataToDisplay.length) {
        loadMoreBtn.style.display = 'block';
    } else {
        loadMoreBtn.style.display = 'none';
    }

    const storedLanguage = localStorage.getItem('lacliLanguagePreference');

    if (storedLanguage === 'en' || !storedLanguage){
        if (searchQuery === '') {
            displaySearchSummary.textContent = `Showing all ${data.length} records.`;
        } else {
            displaySearchSummary.textContent = `A search for \u{201C}${searchQuery}\u{201D} returned ${data.length} result${data.length !== 1 ? 's' : ''}.`;
        }
    }
    if (storedLanguage === 'es'){
        if (searchQuery === '') {
            displaySearchSummary.textContent = `Mostrando todos los  ${data.length}  resultados.`;
        } else {
            displaySearchSummary.textContent = `La búsqueda de \u{201C}${searchQuery}\u{201D} devolvió ${data.length} resultado${data.length !== 1 ? 's' : ''}.`;
        }
    }
    if (storedLanguage === 'pt'){
        if (searchQuery === '') {
            displaySearchSummary.textContent = `Exibindo todos ${data.length}  registros.`;
        } else {
            displaySearchSummary.textContent = `Sua pesquisa por \u{201C}${searchQuery}\u{201D} retornou ${data.length} resultado${data.length !== 1 ? 's' : ''}.`;
        }
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
};

// Load More button
loadMoreBtn.addEventListener('click', () => {
    // Check if there is more data to display
    if (displayedCount < activeDataToDisplay.length) {
        // Increment `displayedCount` by the number of itemsPerPage
        displayedCount += itemsPerPage;

        // Use the correct `refresh` value, which is `false` to append more data
        displayData(activeDataToDisplay, search.value, displayedCount, refresh=false);

        // Check if all objects are now displayed and hide the button
        if (displayedCount >= activeDataToDisplay.length) {
            loadMoreBtn.style.display = 'none';
        }
    }
});

// Get random resource
randomBtn.addEventListener('click', getRandomResource);

function getRandomResource() {
    const randomIndex = Math.floor(Math.random() * initialData.length);
    const randomResource = initialData[randomIndex]
    displayedCount = 0;
    displayData([randomResource], randomResource.Resource_Title, displayedCount, refresh=true);
    loadMoreBtn.style.display = 'none';

    const newURL = new URL(window.location.href);
    newURL.searchParams.set('q', randomResource.Resource_Title);
    window.history.pushState(null, '', newURL);
};

// JSON export
exportBtn.addEventListener('click', exportJSON);

function storeData(data) {
    const dataAsString = JSON.stringify(data);
    sessionStorage.setItem('data', dataAsString);
}

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